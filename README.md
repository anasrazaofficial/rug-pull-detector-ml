# Rug Pull Detector using Machine Learning

**Dawood University of Engineering and Technology, Karachi**  
**Department of Computer Science**  
**Faculty of Information and Computer Science**  
**Course:** Machine Learning

---

## 📌 Short Description

Rug Pull Detector using Machine Learning is a university-level ML project designed to detect suspicious cryptocurrency wallet behavior related to DeFi scam activity.  
The system analyzes Ethereum transaction-based features and predicts whether a wallet is **Legit** or **Fraud/Suspicious**, along with a confidence/risk score.

---

## ✨ Features

- Detects suspicious cryptocurrency wallet behavior using machine learning
- Predicts whether a wallet is **Legit** or **Fraud**
- Provides model confidence/risk score
- Uses Ethereum wallet transaction behavior features
- REST API built with Flask
- Interactive frontend built with React, Vite, and Tailwind CSS v4
- Sample testing data for quick model validation
- Responsive and user-friendly UI
- Supports future extension for:
  - Sell tax analysis
  - Liquidity lock check
  - Holder distribution analysis
  - Smart contract flag detection
  - Token-level risk scoring from `0.0` to `1.0`

---

## 🧰 Tech Stack

### Machine Learning / Backend

- Python
- Flask
- Scikit-learn
- Pandas
- NumPy
- Joblib
- Imbalanced-learn / SMOTE

### Frontend

- React
- Vite
- Tailwind CSS v4
- JavaScript

### Model

- Random Forest Classifier

---

## 📁 Project Folder Structure

```txt
rug-pull-detector-ml/
│
├── client/                         # React + Vite frontend app
│   ├── components/
│   │   └── CryptoFraudDetector.jsx
│   │
│   ├── data/
│   │   └── sample-testing-data.js
│   │
│   ├── src/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .gitignore
│   ├── package.json
│   ├── vite.config.js
│   └── ...other Vite / ESLint files
│
├── .gitignore
├── app.py                          # Flask backend API
├── crypto_fraud_model.pkl          # Trained ML model
├── ethereum_fraud_dataset.csv      # Dataset
├── README.md
├── requirements.txt
└── train-model.ipynb               # Model training notebook
```

---

## ✅ Prerequisites

Before running the project, make sure you have installed:

- Python 3.10 or above
- Node.js 18 or above
- npm
- Git
- pip
- Virtual environment support

---

## ⚙️ Installation and Setup

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/rug-pull-detector-ml.git
cd rug-pull-detector-ml
```

---

## 2. Backend Setup

Create and activate a virtual environment.

### Windows PowerShell

```bash
python -m venv venv
.\venv\Scripts\Activate.ps1
```

If PowerShell blocks script execution, run:

```bash
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Then activate again:

```bash
.\venv\Scripts\Activate.ps1
```

### Windows CMD

```bash
python -m venv venv
venv\Scripts\activate
```

### macOS / Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

Install backend dependencies:

```bash
pip install -r requirements.txt
```

Run the Flask backend:

```bash
python app.py
```

The backend will start at:

```txt
http://127.0.0.1:5000
```

---

## 3. Frontend Setup

Move into the frontend folder:

```bash
cd client
```

Install frontend dependencies:

```bash
npm install
```

Run the React development server:

```bash
npm run dev
```

The frontend will start at:

```txt
http://localhost:5173
```

---

## 🔌 API Endpoints

> Note: The prediction endpoint uses `POST` because the model requires JSON input data.

---

## GET `/`

Returns a welcome message and available endpoints.

### Example Request

```bash
curl http://127.0.0.1:5000/
```

### Example Response

```json
{
  "message": "Rug Pull Detector ML API is running",
  "endpoints": {
    "predict": "/predict"
  }
}
```

---

## POST `/predict`

Analyzes wallet transaction behavior and returns prediction result.

### Example Request

```bash
curl -X POST http://127.0.0.1:5000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "Avg min between sent tnx": 1641.74,
    "Avg min between received tnx": 2103.12,
    "Sent tnx": 10,
    "Received Tnx": 148,
    "Unique Received From Addresses": 137,
    "Unique Sent To Addresses": 4,
    "avg val received": 1.429861,
    "avg val sent": 21.161505,
    "total ether received": 211.6193783,
    "total ether balance": 0.004326
  }'
```

### Example Response

```json
{
  "prediction": 1,
  "label": "Fraud",
  "confidence": 93.45,
  "probabilities": {
    "legit": 6.55,
    "fraud": 93.45
  }
}
```

---

## 🤖 Machine Learning Model

### Model Used

The project uses a **Random Forest Classifier** for fraud detection.

Random Forest was selected because:

- It performs well on tabular datasets
- It handles non-linear relationships effectively
- It provides strong performance for classification problems
- It is suitable for fraud detection and behavioral analysis

---

## Model Features / Variables Used

The model was trained using the following Ethereum wallet transaction features:

| No. | Feature Name | Description |
|---:|---|---|
| 1 | `Avg min between sent tnx` | Average time in minutes between outgoing transactions |
| 2 | `Avg min between received tnx` | Average time in minutes between incoming transactions |
| 3 | `Sent tnx` | Total number of sent transactions |
| 4 | `Received Tnx` | Total number of received transactions |
| 5 | `Unique Received From Addresses` | Number of unique wallet addresses that sent funds to this wallet |
| 6 | `Unique Sent To Addresses` | Number of unique wallet addresses this wallet sent funds to |
| 7 | `avg val received` | Average Ether received per transaction |
| 8 | `avg val sent` | Average Ether sent per transaction |
| 9 | `total ether received` | Total Ether received by the wallet |
| 10 | `total ether balance` | Final Ether balance of the wallet |

---

## Model Output

The model predicts:

| Output | Meaning |
|---:|---|
| `0` | Legit wallet |
| `1` | Fraud / suspicious wallet |

The API also returns confidence, which shows how strongly the model supports its prediction.

---

## Accuracy Metrics

| Metric | Value |
|---|---|
| Accuracy | Add your accuracy here |
| Precision | Add your precision here |
| Recall | Add your recall here |
| F1-Score | Add your F1-score here |

Example:

```txt
Accuracy: 93%
Precision: Add value
Recall: Add value
F1-Score: Add value
```

---

## 📊 Dataset

The dataset used in this project is:

**Ethereum Fraud Detection Dataset from Kaggle**

The dataset contains Ethereum wallet transaction behavior data with a target column named `FLAG`.

### Target Column

| Column | Meaning |
|---|---|
| `FLAG = 0` | Legit wallet |
| `FLAG = 1` | Fraud wallet |

### Data Preprocessing Steps

- Removed unnecessary identifier columns
- Selected 10 important transaction behavior features
- Filled missing values with `0`
- Removed rows where all selected feature values were `0`
- Applied SMOTE to reduce class imbalance
- Split data into training and testing sets
- Trained the Random Forest model
- Saved the trained model as `crypto_fraud_model.pkl`

---

## 🖼️ Screenshots

Add project screenshots here.

### Frontend UI

```txt
Add screenshot of the React dashboard here.
```

### Prediction Result

```txt
Add screenshot of fraud/legit prediction result here.
```

### Confusion Matrix

```txt
Add screenshot of confusion matrix here.
```

### Accuracy Output

```txt
Add screenshot of model accuracy and classification report here.
```

---

## 🙏 Acknowledgements

This project was developed as part of an academic machine learning project at **Dawood University of Engineering and Technology, Karachi**, under the **Department of Computer Science, Faculty of Information and Computer Science**.

Special thanks to the university faculty for providing guidance, academic support, and the opportunity to apply machine learning concepts to real-world cryptocurrency fraud detection problems.

---

## ⚠️ Disclaimer

This project is developed for educational and research purposes only.  
The predictions generated by the model should not be considered financial advice or a guaranteed fraud detection result. Cryptocurrency investments involve risk, and users should perform their own research before making decisions.
