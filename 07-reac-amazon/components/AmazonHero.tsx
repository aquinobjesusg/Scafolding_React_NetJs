export default function AmazonHero() {
  return (
    <section className="relative">
      {/* Hero banner */}
      <div
        className="h-[400px] bg-cover bg-center relative"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-100 via-transparent to-transparent" />
      </div>

      {/* Card row overlapping hero */}
      <div className="max-w-[1500px] mx-auto px-4 -mt-[200px] relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="bg-white p-5 rounded shadow-md">
            <h3 className="text-xl font-bold mb-3">Gaming accessories</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="bg-gray-100 aspect-square rounded overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=300&q=80"
                    alt="Headsets"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs mt-1 text-gray-700">Headsets</p>
              </div>
              <div>
                <div className="bg-gray-100 aspect-square rounded overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1629429407759-01cd3d7cfb38?w=300&q=80"
                    alt="Keyboards"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs mt-1 text-gray-700">Keyboards</p>
              </div>
              <div>
                <div className="bg-gray-100 aspect-square rounded overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&q=80"
                    alt="Mice"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs mt-1 text-gray-700">Mice</p>
              </div>
              <div>
                <div className="bg-gray-100 aspect-square rounded overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1593305841991-e47b4a22ba56?w=300&q=80"
                    alt="Chairs"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs mt-1 text-gray-700">Chairs</p>
              </div>
            </div>
            <a
              href="#"
              className="text-sm text-[#007185] hover:text-orange-600 hover:underline mt-3 inline-block"
            >
              See more
            </a>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-5 rounded shadow-md">
            <h3 className="text-xl font-bold mb-3">Shop deals in Fashion</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="bg-gray-100 aspect-square rounded overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300&q=80"
                    alt="Jeans"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs mt-1 text-gray-700">Jeans under $50</p>
              </div>
              <div>
                <div className="bg-gray-100 aspect-square rounded overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&q=80"
                    alt="Tops"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs mt-1 text-gray-700">Tops under $25</p>
              </div>
              <div>
                <div className="bg-gray-100 aspect-square rounded overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1542295669295-4a18be1b8f08?w=300&q=80"
                    alt="Dresses"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs mt-1 text-gray-700">Dresses under $30</p>
              </div>
              <div>
                <div className="bg-gray-100 aspect-square rounded overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&q=80"
                    alt="Shoes"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs mt-1 text-gray-700">Shoes under $50</p>
              </div>
            </div>
            <a
              href="#"
              className="text-sm text-[#007185] hover:text-orange-600 hover:underline mt-3 inline-block"
            >
              See all deals
            </a>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-5 rounded shadow-md">
            <h3 className="text-xl font-bold mb-3">Refresh your space</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="bg-gray-100 aspect-square rounded overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80"
                    alt="Dining"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs mt-1 text-gray-700">Dining</p>
              </div>
              <div>
                <div className="bg-gray-100 aspect-square rounded overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&q=80"
                    alt="Home"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs mt-1 text-gray-700">Home</p>
              </div>
              <div>
                <div className="bg-gray-100 aspect-square rounded overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=300&q=80"
                    alt="Kitchen"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs mt-1 text-gray-700">Kitchen</p>
              </div>
              <div>
                <div className="bg-gray-100 aspect-square rounded overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1583845112203-29329902332e?w=300&q=80"
                    alt="Health"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs mt-1 text-gray-700">Health and Beauty</p>
              </div>
            </div>
            <a
              href="#"
              className="text-sm text-[#007185] hover:text-orange-600 hover:underline mt-3 inline-block"
            >
              See more
            </a>
          </div>

          {/* Card 4 - Sign in */}
          <div className="bg-white p-5 rounded shadow-md flex flex-col">
            <h3 className="text-xl font-bold mb-1">Sign in for your best experience</h3>
            <button className="bg-[#ffd814] hover:bg-[#f7ca00] text-sm font-medium py-2 px-4 rounded-full mt-2 mb-3 transition-colors shadow-sm">
              Sign in securely
            </button>
            <div className="border-t pt-3 mt-auto">
              <h4 className="font-bold text-sm mb-2">Easy returns</h4>
              <p className="text-xs text-gray-600">
                You can return any item for free within 30 days of delivery. No
                questions asked.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}