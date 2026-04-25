// src/pages/Home.jsx
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <main className="home-container">
      <section className="home-content">

        {/* Heading */}
        <h1 className="home-title">
          Welcome to <span className="highlight">MyLMS</span>
        </h1>

        {/* Tagline */}
        <p className="home-subtitle">
          Master in-demand skills and accelerate your career.
        </p>

        {/* Buttons */}
        <div className="cta-group">
          <Link to="/signup" className="cta-button">
            Get Started
          </Link>

          <Link to="/courses" className="cta-secondary">
            Browse Courses
          </Link>
        </div>

        {/* Stats Section (BIG upgrade 🔥) */}
        <div className="stats">
          <div className="stat">
            <h3>100+</h3>
            <p>Courses</p>
          </div>

          <div className="stat">
            <h3>10K+</h3>
            <p>Students</p>
          </div>

          <div className="stat">
            <h3>4.8⭐</h3>
            <p>Rating</p>
          </div>
        </div>

      </section>
    </main>
  );
}

export default Home;