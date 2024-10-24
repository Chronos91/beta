import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import ErrorPage from './ErrorPage';
import backgroundImage from './assets/images/background.png';

function App() {
  const [objectFitStyle, setObjectFitStyle] = useState('cover'); // State for image fit style
  const [objectPositionStyle, setObjectPositionStyle] = useState('center'); // State for image position style
  const location = useLocation(); // Get the current route location

  useEffect(() => {
    // Function to update background image styles based on screen size
    const updateStyles = () => {
      if (window.innerWidth <= 768) {
        setObjectFitStyle('contain'); // For small screens, use 'contain'
        setObjectPositionStyle('center'); // Center the image on small screens
      } else {
        setObjectFitStyle('contain'); // For larger screens, also use 'contain'
        setObjectPositionStyle('center'); // Keep the image centered
      }
    };

    updateStyles(); // Initial style update
    window.addEventListener('resize', updateStyles); // Listen for window resize events

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateStyles);
    };
  }, []);

  return (
    <div className="App" style={{ position: "relative", height: "100vh", width: "100%" }}>
      {/* Conditionally render background image only if it's not the error page */}
      {location.pathname !== '/error' && (
        <img
          src={backgroundImage} // Background image source
          alt="Background"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: objectFitStyle, // Apply fit style based on state
            objectPosition: objectPositionStyle, // Apply position style based on state
            filter: "blur(5px)", // Add a blur effect to the background
            zIndex: -1, // Ensure the background is behind other content
          }}
        />
      )}
      {/* Define routes for different components */}
      <Routes>
        <Route path="/" element={<Login style={{ marginTop: '100px' }} />} /> {/* Route for Login component */}
        <Route path="/error" element={<ErrorPage />} /> {/* Route for ErrorPage component */}
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
