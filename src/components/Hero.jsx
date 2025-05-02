import React from 'react';

const categories = [
  { label: "Womenswear", image: "https://images.meesho.com/images/marketing/1744634654837.webp", apiCategory: "women's clothing" },
  { label: "Menswear", image: "https://images.meesho.com/images/marketing/1744634780426.webp", apiCategory: "men's clothing" },
  { label: "Jewellery", image: "https://4.imimg.com/data4/LS/TV/MY-4509493/kundan-necklace-set.jpg", apiCategory: "jewelery" },
  { label: "Electronic Gadgets", image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg", apiCategory: "electronics" },
];

const Hero = ({ onCategoryClick, onShopNowClick }) => {
  return (
    <div className="w-full mb-8 px-2 sm:px-4">
      {/* Banner - Now visible on all screens */}
      <div className="relative w-full overflow-hidden rounded-lg shadow-xl mb-4">
        <img 
          src="https://images.meesho.com/images/marketing/1745922715675.webp" 
          alt="Sale Banner"
          className="w-full h-[180px] xs:h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] xl:h-[500px] object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-end pr-4 sm:pr-6 md:pr-8 lg:pr-20 xl:pr-28">
          <div className="flex flex-col items-end gap-2 sm:gap-3 md:gap-4 lg:gap-6 pb-2 sm:pb-4">
            <div className="text-white text-right">
              <div className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">Smart Shopping</div>
              <div className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mt-0 sm:mt-1 lg:mt-2">Trusted by Millions</div>
            </div>
            <button 
              type="button"
              onClick={onShopNowClick}
              className="bg-white text-pink-600 font-bold py-1 px-4 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl rounded-lg hover:bg-pink-50 transition-all duration-300 shadow-lg w-fit"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Feature Bar */}
      <div className="bg-pink-50 p-3 sm:p-4 flex flex-wrap justify-center gap-4 sm:gap-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-1 sm:gap-2 text-xs xs:text-sm sm:text-base">
          <span role="img" aria-label="return">📦</span> 7 Days Easy Return
        </div>
        <div className="flex items-center gap-1 sm:gap-2 text-xs xs:text-sm sm:text-base">
          <span role="img" aria-label="cod">💰</span> Cash on Delivery
        </div>
        <div className="flex items-center gap-1 sm:gap-2 text-xs xs:text-sm sm:text-base">
          <span role="img" aria-label="low-price">🏷️</span> Lowest Prices
        </div>
      </div>

      {/* Categories */}
      <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 xl:gap-8">
        {categories.map((cat, idx) => (
          <div 
            key={idx}
            className="flex flex-col items-center cursor-pointer group"
            onClick={() => onCategoryClick(cat.apiCategory)}
          >
            <div className="w-16 h-16 xs:w-18 xs:h-18 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-200">
              <img src={cat.image} alt={cat.label} className="w-full h-full object-contain p-1" />
            </div>
            <span className="text-center text-xs xs:text-xs sm:text-sm mt-1 sm:mt-2 group-hover:text-pink-600 transition-colors">{cat.label}</span>
          </div>
        ))}
      </div>
      
      {/* Products for you link */}
      <div className="mt-4 sm:mt-6 text-left px-2 sm:px-0 lg:pl-4 xl:pl-8">
        <div className="flex items-center gap-2">
          <span
            onClick={() => onCategoryClick("")}
            className="text-pink-600 text-base sm:text-lg md:text-xl lg:text-2xl font-semibold cursor-pointer hover:underline flex items-center"
          >
            🛍️ Products for you
          </span>
          <div className="flex-grow h-px bg-pink-300 ml-2 sm:ml-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;