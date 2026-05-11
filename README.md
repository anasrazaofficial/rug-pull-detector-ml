# Rug Pull Detector using Machine Learning

## Short Description

Rug Pull Detector using Machine Learning is a university-level ML project designed to detect suspicious cryptocurrency wallet behavior related to DeFi scam activity.  
The system analyzes Ethereum transaction-based features and predicts whether a wallet is **Legit** or **Fraud/Suspicious**, along with a confidence/risk score.

## Features

- Detects suspicious cryptocurrency wallet behavior using machine learning
- Predicts whether a wallet is **Legit** or **Fraud**
- Provides model confidence/risk score
- Uses Ethereum wallet transaction behavior features
- REST API built with Flask
- Interactive frontend built with React, Vite, and Tailwind CSS v4
- Sample testing data for quick model validation
- Responsive and user-friendly UI

## Tech Stack

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

## Project Folder Structure

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

## Prerequisites

Before running the project, make sure you have installed:

| Tool                            |      Compatible Version |         Recommended Version |
| ------------------------------- | ----------------------: | --------------------------: |
| **Python**                      |               `>= 3.11` |        `3.12.x` or `3.13.x` |
| **Node.js**                     |            `>= 22.12.0` |                  `24.x LTS` |
| **npm**                         |               `>= 10.x` | Latest bundled with Node.js |
| **Git**                         |               `>= 2.40` |               Latest stable |
| **pip**                         |               `>= 24.x` |                      Latest |
| **Virtual environment support** |                         |                             |

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/anasrazaofficial/rug-pull-detector-ml.git
cd rug-pull-detector-ml
```

---

### 2. Backend Setup

Create and activate a virtual environment.

| Operating System / Terminal | Create Virtual Environment | Activate Virtual Environment  | If Activation Is Blocked                                     |
| --------------------------- | -------------------------- | ----------------------------- | ------------------------------------------------------------ |
| **Windows PowerShell**      | `python -m venv venv`      | `.\venv\Scripts\Activate.ps1` | `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` |
| **Windows CMD**             | `python -m venv venv`      | `venv\Scripts\activate`       | Not usually required                                         |
| **macOS / Linux**           | `python3 -m venv venv`     | `source venv/bin/activate`    | Not usually required                                         |

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

### 3. Frontend Setup

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

## API Endpoints

> Note: The prediction endpoint uses `POST` because the model requires JSON input data.

### GET `/`

Returns a welcome message and available endpoints.

#### Example Request

```bash
curl http://127.0.0.1:5000/
```

#### Example Response

```json
{
  "description": "ML-based scam detection for DeFi tokens on Ethereum and BSC",
  "name": "Rug Pull Detector API",
  "status": "online"
}
```

### POST `/predict`

Analyzes wallet transaction behavior and returns prediction result.

#### Example Request

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

#### Example Response

```json
{
  "prediction": 1,
  "confidence": 93.45
}
```

## Machine Learning Model

### Model Used

The project uses a **Random Forest Classifier** for fraud detection.

Random Forest was selected because:

- It performs well on tabular datasets
- It handles non-linear relationships effectively
- It provides strong performance for classification problems
- It is suitable for fraud detection and behavioral analysis

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

## Model Output

The model predicts:

| Output | Meaning |
|---:|---|
| `0` | Legit wallet |
| `1` | Fraud / suspicious wallet |

The API also returns confidence, which shows how strongly the model supports its prediction.

## Dataset

The dataset used in this project is:

**[Ethereum Fraud Detection Dataset from Kaggle](https://www.kaggle.com/datasets/vagifa/ethereum-frauddetection-dataset)**

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

## Acknowledgements

This project was developed as part of an academic machine learning project at **Dawood University of Engineering and Technology, Karachi**, under the **Department of Computer Science, Faculty of Information and Computer Science**.
