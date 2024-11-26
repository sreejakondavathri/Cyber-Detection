import os
os.environ['NO_DOTENV'] = '1'
import json
import joblib
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS 

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})  # Adjust the origin to match your frontend's URL 

# Load the model, vectorizer, and label binarizer
# model = joblib.load("C:/Users/sreeja/OneDrive/Documents/ML_Model/xgboost_model.pkl")  # Adjust the path as needed
# vectorizer = joblib.load("C:/Users/sreeja/OneDrive/Documents/ML_Model/vectorizer.pkl")
# mlb = joblib.load("C:/Users/sreeja/OneDrive/Documents/ML_Model/mlb.pkl")
# Paths to the saved .pkl files
output_dir = "C:/Users/sreeja/OneDrive/Documents/ML_Model"  # Update with your directory
model_path = os.path.join(output_dir, "xgboost_model.pkl")
vectorizer_path = os.path.join(output_dir, "vectorizer.pkl")
mlb_path = os.path.join(output_dir, "mlb.pkl")

# Load the pre-trained model, vectorizer, and MultiLabelBinarizer
model = joblib.load(model_path)
vectorizer = joblib.load(vectorizer_path)
mlb = joblib.load(mlb_path)

def predict_word_mapping_single_entity(input_text, model, vectorizer, mlb):
   
    # Split the input text into words
    words = input_text.split()

    # Initialize the word-to-entity map
    word_entity_map = {}

    for word in words:
        # Preprocess each word (convert to vector)
        input_vector = vectorizer.transform([word]).toarray()

        # Predict probabilities for the word
        pred_probs = model.predict_proba(input_vector)

        # Get the entity with the highest probability
        max_prob_index = pred_probs.argmax(axis=1)[0]
        predicted_entity = mlb.classes_[max_prob_index]

        # Map the word to the most relevant entity
        word_entity_map[word] = predicted_entity

    return word_entity_map

@app.route('/api/classify', methods=['POST'])
def classify_text():
    data = request.get_json()
    text = data.get('text')

    if not text:
        return jsonify({'error': 'No text provided'}), 400

    # Predict the word-to-entity mapping
    word_to_entity_map = predict_word_mapping_single_entity(text, model, vectorizer, mlb)

    return jsonify({'word_entity_mapping': word_to_entity_map})

if __name__ == '__main__':
    app.run(debug=True, port=5001)