import { useState } from "react";
import "./App.css";
import AxiosInstance from "./config/axiosInstance";

function App() {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [analytics, setAnalytics] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const [analyticsVisible, setAnalyticsVisible] = useState(false);
  const [showAnalyticsResult, setShowAnalyticsResult] = useState(false);

  async function handleGetShortenedUrl() {
    if (!url) {
      return;
    }
    try {
      const response = await AxiosInstance.post("/shorten", { url });
      setShortenedUrl(
        `${import.meta.env.VITE_BASE_URL}/redirect/${
          response.data?.data?.shortenedId
        }`
      );
      setUrl("");
      setCopySuccess("");
    } catch (error) {
      console.error("Error getting shortened URL:", error);
      setShortenedUrl("");
    }
  }

  async function handleGetAnalytics() {
    if (!shortenedUrl) {
      return;
    }
    const id = shortenedUrl.split("/")[shortenedUrl.split("/").length - 1];
    try {
      const response = await AxiosInstance.get(`/analytics/${id}`);
      setAnalytics(response.data.data.visitedCount);
      setShowAnalyticsResult(true);
    } catch (error) {
      console.error("Error getting analytics:", error);
      setAnalytics("");
    }
  }

  const handleAnalyticsVisible = () => {
    setAnalyticsVisible(!analyticsVisible);
    setShowAnalyticsResult(false);
    setAnalytics("");
    setShortenedUrl("");
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      handleGetShortenedUrl();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedUrl).then(
      () => {
        setCopySuccess("Copied to clipboard!");
        setShortenedUrl("");
        setTimeout(() => setCopySuccess(""), 2000);
      },
      (error) => {
        console.error("Failed to copy:", error);
      }
    );
  };

  return (
    <div className="container">
      <header className="header">
        <h1>URL Shortener</h1>
      </header>
      <main className="main">
        <div className="url-input">
          <input
            type="text"
            placeholder={
              !analyticsVisible
                ? "Enter your URL here..."
                : "Enter your shortened URL here..."
            }
            value={!analyticsVisible ? url : shortenedUrl}
            onChange={
              !analyticsVisible
                ? (e) => setUrl(e.target.value)
                : (e) => setShortenedUrl(e.target.value)
            }
            onKeyUp={handleKeyUp}
          />
        </div>
        <div className={!analyticsVisible ? "shortened-url" : "hidden"}>
          <input
            type="text"
            placeholder="Your shortened URL will appear here..."
            value={shortenedUrl || ""}
            readOnly
          />
        </div>

        <div>
          {showAnalyticsResult && (
            <div className="analytics">
              <p>Your link has been visited {analytics} times</p>
            </div>
          )}
        </div>

        {shortenedUrl && !analyticsVisible && (
          <button className="copy-button" onClick={handleCopy}>
            Copy
          </button>
        )}
        {copySuccess && <p className="copy-success">{copySuccess}</p>}
        <div className="button-group">
          <button
            className="get-button"
            onClick={
              !analyticsVisible ? handleGetShortenedUrl : handleGetAnalytics
            }
          >
            {!analyticsVisible ? "Get Shortened URL" : "Get Analytics"}
          </button>
          <div className="analytics-button">
            <button onClick={handleAnalyticsVisible}>
              {!analyticsVisible ? "Analytics section" : "Main section"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
