import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen bg-gradient-to-br flex from-amber-900 via-amber-800 to-amber-900 overflow-hidden">
    {/* <section className="relative min-h-[80vh] sm:h-screen bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 overflow-hidden"> */}
{/* <section className="w-full h-full object-cover object-[top_center]"> */}
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/bg.jpg"
          alt="Gold Jewelry Model"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center h-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Exquisite<br />
              <span className="text-yellow-400">Gold Jewellery</span>
            </h1>
            <p className="text-xl text-white mb-8 leading-relaxed">
              Discover our collection of handcrafted gold jewellery, where timeless elegance meets modern sophistication.
            </p>
            <a href="#categories"> <button className="bg-white text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Shop Now
            </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;