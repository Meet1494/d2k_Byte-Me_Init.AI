from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib
from geopy.distance import geodesic

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load datasets
users = pd.read_csv(r"C:\Users\Mahesh\OneDrive\Desktop\Hackathons\D2K\Dataset\users1.csv")
events = pd.read_csv(r"C:\Users\Mahesh\OneDrive\Desktop\Hackathons\D2K\Dataset\events.csv")
bookings = pd.read_csv(r"C:\Users\Mahesh\OneDrive\Desktop\Hackathons\D2K\Dataset\bookings.csv")

# Ensure correct column names
users.columns = users.columns.str.strip()
events.columns = events.columns.str.strip()
bookings.columns = bookings.columns.str.strip()

# Convert latitude & longitude to numeric
users['latitude'] = pd.to_numeric(users['latitude'], errors='coerce')
users['longitude'] = pd.to_numeric(users['longitude'], errors='coerce')
events['latitude'] = pd.to_numeric(events['latitude'], errors='coerce')
events['longitude'] = pd.to_numeric(events['longitude'], errors='coerce')

# Load pre-trained models using joblib
dbscan_model = joblib.load(r"C:\Users\Mahesh\OneDrive\Desktop\Hackathons\D2K\Models\dbscan_model.pkl")
louvain_communities = joblib.load(r"C:\Users\Mahesh\OneDrive\Desktop\Hackathons\D2K\Models\louvain_communities.pkl")
social_graph = joblib.load(r"C:\Users\Mahesh\OneDrive\Desktop\Hackathons\D2K\Models\social_graph.pkl")
svd_model = joblib.load(r"C:\Users\Mahesh\OneDrive\Desktop\Hackathons\D2K\Models\svd_event_recommender.pkl")

def get_recommendations(user_id, top_n=10):
    """Generate event recommendations based on:
        1️⃣ Nearby Events (DBSCAN Clustering)
        2️⃣ Hot Events (Trending Events)
        3️⃣ You Might Like (SVD + Social Connections)
    """
    
    # Validate user existence
    if user_id not in users['user_id'].values:
        return {"error": f"User {user_id} not found."}

    # Get user details
    user_info = users.loc[users['user_id'] == user_id].iloc[0]
    user_location = (user_info['latitude'], user_info['longitude'])

    # ----------------------
    # 1️⃣ Nearby Events (DBSCAN Clustering)
    # ----------------------
    # Calculate distance from user location to each event
    events['distance'] = events.apply(
        lambda row: geodesic(user_location, (row['latitude'], row['longitude'])).km 
        if pd.notna(row['latitude']) and pd.notna(row['longitude']) 
        else np.inf, axis=1)
    
    # Filter events within 25 km
    nearby_events = events[events['distance'] <= 25]

    # Use DBSCAN to cluster nearby events
    if not nearby_events.empty:
        coords = nearby_events[['latitude', 'longitude']].values
        nearby_events['cluster'] = dbscan_model.fit_predict(coords)
        
        # Recommend events from the largest cluster
        largest_cluster = nearby_events['cluster'].mode()[0]
        nearby_recommendations = nearby_events[nearby_events['cluster'] == largest_cluster].head(top_n)
    else:
        nearby_recommendations = pd.DataFrame()  # No nearby events

    # ----------------------
    # 2️⃣ Hot Events (Trending Events)
    # ----------------------
    # Get top N events based on popularity score
    hot_recommendations = events.sort_values(by='popularity_score', ascending=False).head(top_n)

    # ----------------------
    # 3️⃣ You Might Like (SVD + Social Connections)
    # ----------------------
    # Get SVD predictions for the user
    event_ids = events['event_id'].unique()
    svd_predictions = [svd_model.predict(user_id, event_id) for event_id in event_ids]
    svd_scores = np.array([pred.est for pred in svd_predictions])

    # Get social connections (friends' events)
    if user_id in social_graph:
        friends = social_graph[user_id]
        friends_events = bookings[bookings['user_id'].isin(friends)]['event_id'].unique()
        social_scores = np.array([1 if event_id in friends_events else 0 for event_id in event_ids])
    else:
        social_scores = np.zeros(len(event_ids))

    # Combine SVD and social scores
    hybrid_scores = 0.7 * svd_scores + 0.3 * social_scores  # Adjust weights as needed

    # Get top N event IDs
    top_event_ids = np.argsort(-hybrid_scores)[:top_n]
    you_might_like_recommendations = events[events['event_id'].isin(event_ids[top_event_ids])].head(top_n)

    # ----------------------
    # Return Recommendations
    # ----------------------
    return {
        "nearby_events": nearby_recommendations[['event_name', 'event_type', 'city', 'price', 'distance']].to_dict(orient="records"),
        "hot_events": hot_recommendations[['event_name', 'event_type', 'city', 'price', 'popularity_score']].to_dict(orient="records"),
        "you_might_like": you_might_like_recommendations[['event_name', 'event_type', 'city', 'price']].to_dict(orient="records")
    }

@app.route('/api/recommendations/<int:user_id>', methods=['GET'])
def recommend(user_id):
    """API endpoint to get event recommendations for a user."""
    recommendations = get_recommendations(user_id)

    if "error" in recommendations:
        return jsonify(recommendations), 404

    return jsonify(recommendations), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)