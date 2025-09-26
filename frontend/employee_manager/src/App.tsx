import './App.css'
import { useState } from 'react';
import axios from 'axios'




interface Result {
  id: string;
  status: "Granted" | "Denied";
  reason: string;
  name: string;
}



function App() {
  const [file, setFile] = useState<File | null>(null);
  const [results, setResults] = useState<Result[]>([]);

  const formData = new FormData();
  formData.append("file", file); 


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSimulate = async () => {
    if (!file) return;

    // const text = await file.text();
    // const employees: Employee[] = JSON.parse(text);

    try {
      const res = await axios.post("http://localhost:5000/api/access/simulate", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setResults(res.data);
    } catch (err) {
      console.error("Error sending file:", err);
    }
  };


  return (
    <div >
      <h1>Access Simulator</h1>
      <input type="file" accept=".json" onChange={handleFileChange} />
      <button onClick={handleSimulate} disabled={!file}>
        Simulate Access
      </button>

      {results.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2>Results</h2>
          <ul>
            {results.map((r, i) => (
              <li key={i}>
                <b>{r.id}</b> → {r.status} ({r.reason})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
export default App
