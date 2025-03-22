from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import numpy as np
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

def get_recommendations(user_id, top_n=10):
    """Generate event recommendations based on:
       1. Nearby Events
       2. Popular Events
       3. Randomly Selected Events (You Might Like)
    """
    
    # Validate user existence
    if user_id not in users['user_id'].values:
        return {"error": f"User {user_id} not found."}

    # Get user details
    user_info = users.loc[users['user_id'] == user_id].iloc[0]
    user_location = (user_info['latitude'], user_info['longitude'])
    
    # 1. Nearby Events - Events within 25 km, sorted by distance
    events['distance'] = events.apply(
        lambda row: geodesic(user_location, (row['latitude'], row['longitude'])).km 
        if pd.notna(row['latitude']) and pd.notna(row['longitude']) 
        else np.inf, axis=1)
    
    nearby_events = events.loc[events['distance'] <= 25].sort_values(by='distance').head(top_n)

    # 2. Popular Events - Sorted by popularity score
    popular_events = events.sort_values(by='popularity_score', ascending=False).head(top_n)

    # 3. You Might Like - Random selection
    you_might_like = events.sample(n=top_n, random_state=42)

    return {
        "nearby_events": nearby_events[['event_name', 'event_type', 'city', 'price', 'distance']].to_dict(orient="records"),
        "popular_events": popular_events[['event_name', 'event_type', 'city', 'price', 'popularity_score']].to_dict(orient="records"),
        "you_might_like": you_might_like[['event_name', 'event_type', 'city', 'price']].to_dict(orient="records")
    }

@app.route('/api/data/<int:user_id>', methods=['GET'])
def recommend(user_id):
    """API endpoint to get event recommendations for a user."""
    recommendations = get_recommendations(user_id)

    if "error" in recommendations:
        return jsonify(recommendations), 404

    return jsonify(recommendations), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
