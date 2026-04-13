// src/pages/Home.jsx
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to LMS</h1>
        <p>Learn. Grow. Succeed. Choose from top-rated courses and start your journey today.</p>
        <a href="/signup" className="cta-button">Get Started</a>
      </div>
    </div>
  );
}

export default Home;
