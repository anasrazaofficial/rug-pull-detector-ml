import { useState } from "react";
import sampleWallets from "../data/sample-testing-data";

const fields = [
    {
        label: "Average Time Between Sent Transactions",
        value: "Avg min between sent tnx",
        placeholder: "Example: 5",
        help: "Average minutes between outgoing transactions."
    },
    {
        label: "Average Time Between Received Transactions",
        value: "Avg min between received tnx",
        placeholder: "Example: 3",
        help: "Average minutes between incoming transactions."
    },
    {
        label: "Total Sent Transactions",
        value: "Sent tnx",
        placeholder: "Example: 120",
        help: "Total number of outgoing transactions."
    },
    {
        label: "Total Received Transactions",
        value: "Received Tnx",
        placeholder: "Example: 95",
        help: "Total number of incoming transactions."
    },
    {
        label: "Unique Wallets Received From",
        value: "Unique Received From Addresses",
        placeholder: "Example: 20",
        help: "Number of unique wallet addresses sending funds."
    },
    {
        label: "Unique Wallets Sent To",
        value: "Unique Sent To Addresses",
        placeholder: "Example: 15",
        help: "Number of unique wallet addresses receiving funds."
    },
    {
        label: "Average Ether Received",
        value: "avg val received",
        placeholder: "Example: 2.5",
        help: "Average ETH received per transaction."
    },
    {
        label: "Average Ether Sent",
        value: "avg val sent",
        placeholder: "Example: 1.8",
        help: "Average ETH sent per transaction."
    },
    {
        label: "Total Ether Received",
        value: "total Ether received",
        placeholder: "Example: 350",
        help: "Total ETH received by this wallet."
    },
    {
        label: "Current Ether Balance",
        value: "total ether balance",
        placeholder: "Example: 45",
        help: "Current ETH balance remaining in the wallet."
    }
];


export default function CryptoFraudDetector() {
    const [formData, setFormData] = useState(
        fields.reduce((acc, field) => ({ ...acc, [field.value]: "" }), {})
    );

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };

    const handleSampleSelect = (e) => {
        const selectedIndex = e.target.value;

        if (selectedIndex === "") return;

        const selectedWallet = sampleWallets[selectedIndex];

        setFormData(selectedWallet.data);
        setResult(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        const payload = {};
        fields.forEach((field) => {
            payload[field.value] = Number(formData[field.value]);
        });

        try {
            const response = await fetch("http://localhost:5000/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error(error);
            setResult({
                prediction: "Error",
                message: "Could not connect to backend API.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-950 text-white px-4 py-8">
            <section className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <p className="text-cyan-400 font-semibold mb-2">
                        Machine Learning Based Detection
                    </p>

                    <h1 className="text-3xl md:text-5xl font-bold mb-4">
                        Crypto Fraud / Rug Pull Detector
                    </h1>

                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Enter cryptocurrency wallet behavior metrics and let the trained ML
                        model classify whether the wallet is legit or suspicious.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    <form
                        onSubmit={handleSubmit}
                        className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl"
                    >
                        <h2 className="text-xl font-semibold mb-6">Wallet Features</h2>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="block text-sm text-slate-300 mb-2">
                                    Sample Data

                                    {/* Tooltip */}
                                    <span className="relative group inline-block ml-2">
                                        <span className="cursor-pointer text-slate-500 hover:text-cyan-400 text-xs border border-slate-600 hover:border-cyan-400 rounded-full w-4 h-4 inline-flex items-center justify-center transition-colors">
                                            ?
                                        </span>

                                        <span className="absolute left-1/2 -translate-x-1/2 bottom-6 w-72 bg-slate-800 text-slate-300 text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border border-slate-700 shadow-lg leading-relaxed">
                                            Select a preloaded wallet behavior sample to automatically fill the form with realistic transaction data.
                                            These samples contain both legitimate and suspicious wallet patterns for testing the machine learning model.
                                        </span>
                                    </span>
                                </label>

                                <select
                                    defaultValue=""
                                    onChange={handleSampleSelect}
                                    className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-white outline-none focus:border-cyan-400"
                                >
                                    <option value="" disabled>
                                        Select Sample Wallet
                                    </option>

                                    {sampleWallets.map((wallet, index) => (
                                        <option key={index} value={index}>
                                            Wallet #{index + 1} — {wallet.isLegit ? "Legit" : "Fraud"}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {fields.map((field) => (
                                <div key={field.value}>
                                    <label className="block text-sm text-slate-300 mb-2">
                                        {field.label}

                                        {/* Tooltip */}
                                        {field.help && (
                                            <span className="relative group inline-block ml-2">
                                                <span className="cursor-pointer text-slate-500 hover:text-cyan-400 text-xs border border-slate-600 hover:border-cyan-400 rounded-full w-4 h-4 inline-flex items-center justify-center transition-colors">
                                                    ?
                                                </span>
                                                <span className="absolute left-1/2 -translate-x-1/2 bottom-6 w-52 bg-slate-800 text-slate-300 text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border border-slate-700 shadow-lg">
                                                    {field.help}
                                                </span>
                                            </span>
                                        )}
                                    </label>

                                    <input
                                        type="number"
                                        step="any"
                                        value={formData[field.value]}
                                        onChange={(e) => handleChange(field.value, e.target.value)}
                                        required
                                        placeholder={field.placeholder}
                                        className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-white outline-none focus:border-cyan-400"
                                    />
                                </div>
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-6 w-full rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 transition disabled:opacity-60"
                        >
                            {loading ? "Analyzing..." : "Analyze Wallet"}
                        </button>
                    </form>

                    <aside className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                        <h2 className="text-xl font-semibold mb-4">Prediction Result</h2>

                        {!result && (
                            <div className="text-slate-400 text-sm">
                                Submit wallet feature values to see the prediction result here.
                            </div>
                        )}

                        {result && result.prediction !== "Error" && (
                            <div
                                className={`rounded-2xl p-5 border ${result.prediction === 1 || result.prediction === "Fraud"
                                    ? "bg-red-950/40 border-red-500"
                                    : "bg-emerald-950/40 border-emerald-500"
                                    }`}
                            >
                                <p className="text-sm text-slate-300 mb-2">Model Prediction</p>

                                <h3 className="text-3xl font-bold mb-3">
                                    {result.prediction === 1 || result.prediction === "Fraud"
                                        ? "Fraud / Rug Pull Risk"
                                        : "Legit Wallet"}
                                </h3>

                                {result.confidence && (
                                    <p className="text-slate-300">
                                        Confidence:{" "}
                                        <span className="font-semibold text-white">
                                            {result.confidence}%
                                        </span>
                                    </p>
                                )}
                            </div>
                        )}

                        {result?.prediction === "Error" && (
                            <div className="rounded-2xl p-5 bg-red-950/40 border border-red-500">
                                <h3 className="text-xl font-bold mb-2">Backend Error</h3>
                                <p className="text-slate-300">{result.message}</p>
                            </div>
                        )}

                        <div className="mt-6 text-sm text-slate-400 space-y-2">
                            <p>
                                <span className="text-white font-semibold">0</span> = Legit
                                wallet
                            </p>
                            <p>
                                <span className="text-white font-semibold">1</span> = Fraud /
                                suspicious wallet
                            </p>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
};