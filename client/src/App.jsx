import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [result, setResult] = useState(null);

  const checkPassword = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/password/check",
      { password }
    );
    setResult(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
      <div className="bg-gray-800 p-6 rounded-lg w-96">
        <h1 className="text-xl font-bold mb-4">
          Password Security Checker
        </h1>

        <p className="text-sm text-slate-400 text-center mb-6">
        Analyze password strength and breach exposure
        </p>

        <input
          type="password"
          placeholder="Enter password"
          className="w-full p-2 rounded text-white"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={checkPassword}
          className="w-full bg-blue-600 mt-4 p-2 rounded"
        >
          Analyze
        </button>

        {result && (
          <div className="mt-4">
            <p>Strength Rating: {result.score}/4</p>

            <p className="mt-2">
              Leaked:
              {result.leaked ? (
                <span className="text-red-400"> YES ❌</span>
              ) : (
                <span className="text-green-400"> NO ✅</span>
              )}
            </p>

            <ul className="mt-2 text-sm text-yellow-300">
              {result.suggestions.map((s, i) => (
                <li key={i}>• {s}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
