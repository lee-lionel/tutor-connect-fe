import React from 'react';
import './Home.css'; // Import your CSS file for styling

const Home = () => {
  return (
    <div className="content-container home">
      <header className="home-hero">
        <p className="home-eyebrow">Tutors Connect</p>
        <h1 className="home-title">Connecting parents with prospective tutors</h1>
        <p className="home-lede">
          Tutors Connect is an application designed to connect parents with qualified
          tutors, providing benefits for both parties.
        </p>
      </header>

      <section className="home-section">
        <h2 className="home-section-title">For Parents</h2>
        <ul className="home-features">
          <li className="home-feature">
            <strong>Find Qualified Tutors</strong>
            Browse detailed profiles of tutors based on subjects and expertise
          </li>
          <li className="home-feature">
            <strong>Personalised Matches</strong>
            Use advanced filters to find tutors that meet your child's specific needs
          </li>
        </ul>
      </section>

      <section className="home-section">
        <h2 className="home-section-title">For Tutors</h2>
        <ul className="home-features">
          <li className="home-feature">
            <strong>Expand Reach</strong>
            Showcase your skills to a broader audience of parents seeking tutors
          </li>
          <li className="home-feature">
            <strong>Build Reputation</strong>
            Gain credibility with reviews and ratings from parents
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
