// src/pages/Home.jsx
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <main className="home-container">
      <section className="home-content">
        <h1 className="home-title">Welcome to LMS</h1>

        <p className="home-subtitle">
          Learn. Succeed. Choose from top-rated courses and start your journey today.
        </p>

        <Link to="/signup" className="cta-button">
          Get Started
        </Link>
      </section>
    </main>
  );
}

export default Home;