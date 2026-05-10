from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load trained model
model = joblib.load("crypto_fraud_model.pkl")

@app.route("/")
def home():
    return {
        "name": "Rug Pull Detector API",
        "description": "ML-based scam detection for DeFi tokens on Ethereum and BSC",
        "status": "online",
    }

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    features = [[
        data["Avg min between sent tnx"],
        data["Avg min between received tnx"],
        data["Sent tnx"],
        data["Received Tnx"],
        data["Unique Received From Addresses"],
        data["Unique Sent To Addresses"],
        data["avg val received"],
        data["avg val sent"],
        data["total Ether received"],
        data["total ether balance"]
    ]]

    prediction = model.predict(features)[0]

    confidence = np.max(model.predict_proba(features)) * 100

    return jsonify({
        "prediction": int(prediction),
        "confidence": round(confidence, 2)
    })

if __name__ == "__main__":
    app.run(debug=True)