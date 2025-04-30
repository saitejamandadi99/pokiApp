import { Link } from 'react-router-dom';
import './index.css';

const AboutMe = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Pokémon Explorer</h1>
        <p>This app allows you to explore a variety of Pokémon data!</p>
        <p>Search Pokémon by name, type, and see their images and stats.</p>
      </header>

      <section className="about-details">
        <h2>Features</h2>
        <ul>
          <li>Search Pokémon by Name</li>
          <li>Filter Pokémon by Type</li>
          <li>View Pokémon Details</li>
          <li>Responsive Design for all devices</li>
        </ul>
      </section>

      <section className="about-contact">
        <h2>Contact Us</h2>
        <p>If you have any questions or suggestions, feel free to reach out!</p>
        <p>Email: <a href="mailto:support@pokemonexplorer.com">support@pokemonexplorer.com</a></p>
      </section>

      <footer className="about-footer">
        <Link to="/" className="back-to-home-link">Back to Home</Link>
      </footer>
    </div>
  );
};

export default AboutMe;
