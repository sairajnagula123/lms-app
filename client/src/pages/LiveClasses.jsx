import React, { useEffect, useState } from "react";
import "../styles/LiveClasses.css";
import axios from "axios";

const LiveClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await axios.get(
        "https://lms-app-cqbr.onrender.com/api/liveclasses"
      );

      setClasses(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="live-container">
      <h1 className="live-title">
        Live Classes
      </h1>

      {classes.length === 0 ? (
        <p>No live classes available</p>
      ) : (
        classes.map((item) => (
          <div
            className="live-card"
            key={item._id}
          >
            <h2>{item.title}</h2>

            <p>{item.description}</p>

            <p>
              <strong>Date:</strong>{" "}
              {item.date}
            </p>

            <p>
              <strong>Time:</strong>{" "}
              {item.time}
            </p>

            <a
              href={item.meetingLink}
              target="_blank"
              rel="noreferrer"
            >
              <button className="join-btn">
                Join Class
              </button>
            </a>
          </div>
        ))
      )}
    </div>
  );
};

export default LiveClasses;