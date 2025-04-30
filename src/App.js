import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';  // Import the header component
import Pokemon from './components/Pokemon';  // Import Pokemon component
import AboutMe from './components/AboutMe';  // Import AboutMe component
import './App.css';

const App = () => {
  return (
    <Router>
      <Header /> {/* This header will be on all pages */}
      <Routes>
        <Route path="/" element={<Pokemon />} /> {/* Home route for Pokémon */}
        <Route path="/about" element={<AboutMe />} /> {/* About page route */}
      </Routes>
    </Router>
  );
};

export default App;
