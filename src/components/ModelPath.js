import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Path() {
  const { courseName, level } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [learningPath, setLearningPath] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const retrievedScore = queryParams.get("score");
    setScore(retrievedScore);

    const fetchLearningPath = async () => {
      setIsLoading(true);

      try {
        const cachedPath = localStorage.getItem(`learningPath_${courseName}_${level}`);
        if (cachedPath) {
          const parsedPath = JSON.parse(cachedPath);
          console.log("Using cached learning path:", parsedPath);
          setLearningPath(parsedPath);
          setIsLoading(false);
          return;
        }

        const requestData = { input: `Course: ${courseName}, Level: ${level}` };
        console.log("Requesting learning path with:", requestData);

        const response = await fetch("http://localhost:4000/api/path/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch learning path");
        }

        const data = await response.json();
        console.log("Backend response:", data);

        // Split the first element of the array (comma-separated string)
        const path =
          Array.isArray(data) && typeof data[0] === "string"
            ? data[0].split(",").map((step) => step.trim())
            : [];

        console.log("Parsed learning path:", path);

        if (path.length > 0) {
          setLearningPath(path);
          localStorage.setItem(`learningPath_${courseName}_${level}`, JSON.stringify(path));
        } else {
          console.warn("Empty learning path received");
          setLearningPath([]);
        }
      } catch (error) {
        console.error("Error fetching learning path:", error.message);
        setLearningPath([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (courseName && level) {
      fetchLearningPath();
    }
  }, [courseName, level, location.search]);

  const renderFlowChart = () => {
    return learningPath.map((step, index) => (
      <div key={index} className="flowchart-step mb-3 text-center">
        <div className="flowchart-box p-3 bg-primary text-white rounded">{step}</div>
        {index < learningPath.length - 1 && (
          <div className="flowchart-arrow my-2">
            <span style={{ fontSize: "24px", color: "#6a11cb" }}>↓</span>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div
      className="path-wrapper"
      style={{
        background: "linear-gradient(to bottom, #6a11cb, #2575fc)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
      }}
    >
      <div
        className="path-container p-4"
        style={{
          background: "#fff",
          borderRadius: "20px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          color: "#333",
          maxWidth: "800px",
          width: "100%",
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "#6a11cb" }}>
          Learning Path for {courseName}
        </h2>
        <h4 className="text-center">
          Level: {level && level.charAt(0).toUpperCase() + level.slice(1)}
        </h4>
        {score && (
          <div className="text-center alert alert-info">
            Your Score: {score} / {learningPath.length}
          </div>
        )}

        {isLoading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status"></div>
          </div>
        ) : (
          <div className="flowchart-container d-flex flex-column align-items-center">
            {learningPath.length > 0 ? renderFlowChart() : <p>No learning path available</p>}
          </div>
        )}

        {learningPath.length > 0 && (
          <div className="text-center mt-4">
            <button className="btn btn-secondary" onClick={() => navigate("/dashboard")}>
              Start Learning
            </button>
          </div>
        )}
      </div>
      {/* Inline styles */}
      <style>{`
        .flowchart-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .flowchart-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
        }

        .flowchart-box {
          width: 250px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #6a11cb;
          color: white;
          border-radius: 8px;
          font-size: 16px;
          font-weight: bold;
          text-align: center;
        }

        .flowchart-arrow {
          font-size: 24px;
          color: #6a11cb;
          margin: 10px 0;
        }
      `}</style>
    </div>
  );
}

export default Path;
