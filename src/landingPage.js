import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => (
    <Link to={'/'}>
  <div className="flex items-center gap-3">
    <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 8C0 3.58172 3.58172 0 8 0H32C36.4183 0 40 3.58172 40 8V32C40 36.4183 36.4183 40 32 40H8C3.58172 40 0 36.4183 0 32V8Z" fill="#4F46E5"/>
      <path d="M20 8L32 20L20 32L8 20L20 8Z" fill="#60A5FA"/>
    </svg>
    <span className="text-2xl font-bold text-gray-900">Kanun AI</span>
        </div>
    </Link>
);

const Button = ({ variant = 'primary', children, onClick }) => {
  const baseStyles = "px-6 py-3 rounded-lg font-medium transition-all duration-200 text-center";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl",
    secondary: "bg-white text-blue-500 border border-blue-100 hover:border-blue-200 hover:bg-blue-50"
  };
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
          {/* Navigation */}
          
          <nav className="container mx-auto px-6 py-6" >
                  <Logo />
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Get Legal Suggestions,{' '}
            <span className="block text-blue-500">Instantly</span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-lg">
            Our AI helps you review contracts, provides legal advice, and ensures 
            compliance with Nepali legal standards
          </p>
          
                  <div className="flex gap-4 mt-4">
                      <Link to={'/chat'}>
            <Button variant="primary" >
              Get Started
            </Button>
                      </Link>
            <Button variant="secondary">
              Learn more
            </Button>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative">
          <div className="relative w-full h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
            <div className="absolute inset-0
              mix-blend-overlay opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                  <svg 
                    className="w-8 h-8 text-blue-500" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z" 
                      fill="currentColor"
                    />
                    <path 
                      d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" 
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Circuit Pattern Overlay */}
            <div className="absolute inset-0">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `pulse 2s infinite ${Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add some basic animations
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.5); opacity: 1; }
    100% { transform: scale(1); opacity: 0.5; }
  }
`;
document.head.appendChild(style);

export default LandingPage;