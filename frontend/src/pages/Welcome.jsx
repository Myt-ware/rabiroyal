import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('hasVisited')) {
      navigate('/home', { replace: true });
    }
  }, [navigate]);

  const handleEnter = (e) => {
    e.preventDefault();
    setIsTransitioning(true);
    localStorage.setItem('hasVisited', 'true');
    
    setTimeout(() => {
      navigate('/home');
    }, 800); // Wait for transition to cover screen before redirecting
  };

  return (
    <div className="welcome-container">
      {/* Glowing Background */}
      <div className="glow-bg"></div>

      {/* Content */}
      <div className="content-wrapper">
        <img src="/RabiRoyal.png" alt="Raabi Perfumes" className="welcome-logo" />
        
        <div className="welcome-text">Welcome to</div>
        <h1 className="welcome-title">The Art of Perfumery</h1>
        
        <a href="/home" className="enter-btn" onClick={handleEnter}>Enter Boutique</a>
      </div>

      {/* Transition Overlay */}
      <div className={`page-transition ${isTransitioning ? 'active' : ''}`} id="transitionOverlay"></div>
    </div>
  );
};

export default Welcome;
