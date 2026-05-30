import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <>
      <main className="home-container">

        <section className="hero-section">

          {/* Badge */}
          <div className="hero-badge">
            ✨ Learn. Grow. Succeed.
          </div>

          {/* Heading */}
          <h1 className="hero-title">
            Welcome to <span>MyLMS</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle">
            Your all-in-one platform to learn new skills,
            track progress, and achieve your goals.
          </p>

          {/* Buttons */}
          <div className="hero-buttons">

            <Link to="/signup" className="primary-btn">
              Get Started →
            </Link>

            <Link to="/courses" className="secondary-btn">
              Browse Courses →
            </Link>

          </div>

          {/* Stats */}
          <div className="stats-container">

            <div className="stat-box">
              <div className="icon">📘</div>
              <div>
                <h2>100+</h2>
                <p>Courses</p>
              </div>
            </div>

            <div className="stat-box">
              <div className="icon">👨‍🎓</div>
              <div>
                <h2>10K+</h2>
                <p>Students</p>
              </div>
            </div>

            <div className="stat-box">
              <div className="icon">⭐</div>
              <div>
                <h2>4.8</h2>
                <p>Rating</p>
              </div>
            </div>

          </div>

        </section>
      </main>
    </>
  );
}

export default Home;