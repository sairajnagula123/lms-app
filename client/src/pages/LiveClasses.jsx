import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

    {classes.map((item) => (
      <div className="live-card" key={item._id}>
        <h2>{item.title}</h2>

        <p>{item.description}</p>

        <p>
          <strong>Date:</strong> {item.date}
        </p>

        <p>
          <strong>Time:</strong> {item.time}
        </p>

        <a
          href={`/liveclassroom/${item.roomId}`}
          target="_blank"
          rel="noreferrer"
        >
            <Link to={`/liveclassroom/${item.roomId}`}>
                <button className="join-btn">
                    Join Class
                </button>
            </Link>
        </a>
      </div>
    ))}
  </div>
);
};

export default LiveClasses;