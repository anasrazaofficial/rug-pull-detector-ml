# Rug Pull Detector using Machine Learning

## What is this project?

This project is a **machine learning-based crypto fraud detector**. It analyzes Ethereum wallet transaction behavior and predicts whether a wallet looks **Legit** or **Fraud/Suspicious**.

The name of the project is **Rug Pull Detector**, but our current version mainly detects suspicious wallet behavior using the Ethereum Fraud Detection Dataset. This can be used as a basic foundation for future rug pull detection.

---

## What is a Rug Pull?

A **rug pull** is a crypto scam where the creator of a token or project suddenly takes away investors’ money and disappears.

Example:

1. A scammer creates a new crypto token.
2. People invest money in it.
3. The scammer removes the liquidity or transfers funds away.
4. The token price crashes.
5. Investors lose their money.

In simple words:

> A rug pull means the project owner suddenly “pulls the rug” and leaves investors with worthless tokens.

---

## Why are we using Machine Learning?

Manually checking crypto wallets is difficult because blockchain data contains thousands of transactions.

Machine learning helps by finding suspicious patterns automatically.

For example, fraud wallets may have:

* Very fast transaction activity
* Many incoming transactions
* Many outgoing transactions
* Very low final balance after receiving funds
* Unusual sending and receiving behavior

The model learns these patterns from previous fraud and legit wallet data.

---

## Dataset Used

We used the **Ethereum Fraud Detection Dataset from Kaggle**.

The dataset contains Ethereum wallet transaction records.

The target column is:

| Value | Meaning                   |
| ----- | ------------------------- |
| `0`   | Legit wallet              |
| `1`   | Fraud / suspicious wallet |

---

## Features Used in the Model

We used 10 important wallet behavior features:

| Feature                          | Simple Meaning                                       |
| -------------------------------- | ---------------------------------------------------- |
| `Avg min between sent tnx`       | Average time between sent transactions               |
| `Avg min between received tnx`   | Average time between received transactions           |
| `Sent tnx`                       | Total number of sent transactions                    |
| `Received Tnx`                   | Total number of received transactions                |
| `Unique Received From Addresses` | How many different wallets sent money to this wallet |
| `Unique Sent To Addresses`       | How many different wallets this wallet sent money to |
| `avg val received`               | Average Ether received per transaction               |
| `avg val sent`                   | Average Ether sent per transaction                   |
| `total ether received`           | Total Ether received by the wallet                   |
| `total ether balance`            | Final Ether balance left in the wallet               |

---

## Why did we choose these features?

We selected these features because they describe the main behavior of a crypto wallet:

### 1. Transaction Timing

Features like average time between sent and received transactions help detect unusual activity speed.

Fraud wallets may move funds quickly.

### 2. Transaction Count

Sent and received transaction counts show how active the wallet is.

A suspicious wallet may receive money from many users and then send it away.

### 3. Wallet Connections

Unique sent and received addresses show how many different wallets are connected.

Fraud wallets may interact with many addresses to collect or move funds.

### 4. Ether Amounts

Average and total Ether values show how much money the wallet handles.

Fraud wallets may receive large amounts and then empty the balance.

### 5. Final Balance

A very low final balance after receiving funds can be suspicious because scammers often move funds away quickly.

---

## Model Used

We used:

> **Random Forest Classifier**

---

## Why Random Forest?

Random Forest is a good choice because:

* It works well with table-based datasets.
* It is easy to train and understand.
* It handles complex patterns better than simple models.
* It gives good accuracy for classification problems.
* It is suitable for fraud detection.
* It does not require deep learning or heavy setup.

In simple words:

> Random Forest makes multiple decision trees and combines their results to make a better prediction.

---

## What is SMOTE and why did we use it?

Our dataset had more legit wallets than fraud wallets.

This can make the model biased toward predicting “Legit” more often.

So we used **SMOTE**.

SMOTE creates synthetic fraud samples to balance the dataset.

Before SMOTE, the dataset ratio was approximately:

* Legit: 77.86%
* Fraud: 22.14%

After SMOTE, we balanced it closer to:

* Legit: 60%
* Fraud: 40%

This helps the model learn fraud patterns better.

---

## What does Confidence mean?

Confidence means how sure the model is about one prediction.

Example:

* Prediction: Fraud
* Confidence: 93%

This means the model strongly believes the wallet behavior looks like fraud.

Important:

> Confidence is not the same as accuracy.

Accuracy is the model’s performance on the full test dataset. Confidence is only for one prediction.

---

## Backend and Frontend

### Model Training

1. A trained model is already included
2. If want to retrain then open `train-model.ipynb`
3. Run all cells. It will train the model and export `crypto_fraud_model.pkl`

### Backend

We used **Flask** for the backend API.

The backend:

1. Loads the trained model.
2. Receives wallet data from frontend.
3. Sends the data to the model.
4. Returns prediction and confidence.

### Frontend

We used **React + Vite + Tailwind CSS**.

The frontend:

1. Shows the input form.
2. Lets the user select sample wallet data.
3. Sends data to Flask API.
4. Displays whether the wallet is Legit or Fraud.

---

## Basic Project Flow

```txt
Dataset
↓
Clean Data
↓
Select 10 Features
↓
Apply SMOTE
↓
Train Random Forest Model
↓
Save Model as .pkl
↓
Create Flask API
↓
Create React UI
↓
Show Prediction Result
```

---

## Important Limitation

Our current model does not directly check live token liquidity, sell tax, or smart contract code.

So it should be explained as:

> A wallet behavior-based crypto fraud detection system.

It can be improved later into a full rug pull detector by adding:

* Live blockchain APIs
* Liquidity lock checks
* Holder distribution analysis
* Smart contract analysis
* Token tax analysis

---

## Short Explanation for Presentation

This project detects suspicious Ethereum wallet behavior using machine learning. We trained a Random Forest model on a fraud detection dataset. The model uses 10 wallet transaction features such as sent transactions, received transactions, average Ether sent, total Ether received, and wallet balance. The system predicts whether a wallet is legit or suspicious and shows a confidence score through a React frontend connected with a Flask API.
