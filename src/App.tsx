import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import IntroductionPage from './pages/IntroductionPage';
import PreCallPage from './pages/PreCallPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <img 
                  src="https://cdn.prod.website-files.com/66d8df543029dd65661ce227/66e987ef0f6d0151f4c8d610_loghana-p-500.png" 
                  alt="Hana Logo" 
                  className="h-16" // Increased to 1.5x (from h-16 to h-24)
                />
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/intro/:type" element={<IntroductionPage />} />
            <Route path="/pre-call/:type" element={<PreCallPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;