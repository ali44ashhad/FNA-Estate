// import React from 'react';
// import { Link } from 'react-router-dom';

// export const HeroSection = () => {
//   return (
//     <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-32 overflow-hidden">
//       {/* Animated background elements */}
//       <div className="absolute top-0 right-0 -mr-40 -mt-40 w-80 h-80 bg-white opacity-10 rounded-full animate-pulse"></div>
//       <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-80 h-80 bg-white opacity-10 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      
//       <div className="max-w-6xl mx-auto px-4 relative z-10">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//           {/* Left Content */}
//           <div className="animate-fadeInLeft">
//             <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
//               Find Your Dream <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">Property</span>
//             </h1>
//             <p className="text-xl text-purple-100 mb-8 leading-relaxed">
//               Discover the perfect home from thousands of premium listings. Get expert guidance every step of the way.
//             </p>
//             <div className="flex gap-4">
//              <Link
//   to="/properties"
//   className="px-8 py-4 text-lg font-semibold rounded-full
//              bg-white text-purple-600
//              hover:bg-purple-50 hover:shadow-2xl
//              transform hover:scale-105 transition-all"
// >
//   ➤ Browse Properties
// </Link>

//               <Link to="/register" className="btn btn-outline-light px-8 py-4 text-lg font-semibold rounded-full border-2 border-white hover:bg-white hover:text-purple-600 transition-all">
//                 Join Now
//               </Link>
//             </div>
//           </div>
          
//           {/* Right Image/Illustration */}
//           <div className="animate-fadeInRight">
//             <div className="bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
//               <div className="aspect-square bg-gradient-to-br from-indigo-200 to-purple-200 rounded-xl flex items-center justify-center text-6xl">
//                 🏠
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Search Bar */}
// <div className="mt-16 bg-white text-gray-900 rounded-2xl shadow-2xl p-6 md:p-8">

//           <h3 className="text-gray-900 text-lg font-semibold mb-4">Quick Search</h3>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <input
//               type="text"
//               placeholder="City or Location"
//               className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//             <select className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500">
//               <option value="">Property Type</option>
//               <option value="Flat">Flat</option>
//               <option value="Villa">Villa</option>
//               <option value="Plot">Plot</option>
//               <option value="Commercial">Commercial</option>
//             </select>
//             <input
//               type="number"
//               placeholder="Max Price"
//               className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//             <button className="btn btn-primary bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg">
//               🔍 Search
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };


import React from 'react';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <section
      className="relative min-h-[90vh] flex items-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        {/* Hero Content */}
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Find Your Dream Property
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-10">
            Discover the perfect home from thousands of premium listings. Get expert guidance every step of the way.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/properties"
              className="px-8 py-4 bg-primary-600 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md transition"
            >
              Browse Properties
            </Link>

            <Link
              to="/register"
              className="px-8 py-4 border border-white text-white hover:bg-white hover:text-black font-semibold rounded-md transition"
            >
              Join Now
            </Link>
          </div>
        </div>

        {/* Search Bar (Houzez Style) */}
        <div className="mt-16 bg-white text-gray-900 rounded-md shadow-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Search Properties</h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <input
              type="text"
              placeholder="City or Location"
              className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
            />

            <select className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none">
              <option value="">Property Type</option>
              <option value="Flat">Flat</option>
              <option value="Villa">Villa</option>
              <option value="Plot">Plot</option>
              <option value="Commercial">Commercial</option>
            </select>

            <input
              type="number"
              placeholder="Max Price"
              className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
            />

            <select className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none">
              <option value="">Bedrooms</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>

            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md px-6 py-3 transition">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
