export default function AmazonFooter() {
  const columns = [
    {
      title: "Get to Know Us",
      links: ["Careers", "Blog", "About Amazon", "Investor Relations", "Amazon Devices", "Amazon Science"],
    },
    {
      title: "Make Money with Us",
      links: [
        "Sell products on Amazon",
        "Sell on Amazon Business",
        "Sell apps on Amazon",
        "Become an Affiliate",
        "Advertise Your Products",
        "Self-Publish with Us",
      ],
    },
    {
      title: "Amazon Payment Products",
      links: [
        "Amazon Business Card",
        "Shop with Points",
        "Reload Your Balance",
        "Amazon Currency Converter",
        "Gift Cards",
        "Amazon.com Corporate Credit",
      ],
    },
    {
      title: "Let Us Help You",
      links: [
        "Amazon and COVID-19",
        "Your Account",
        "Your Orders",
        "Shipping Rates & Policies",
        "Returns & Replacements",
        "Manage Your Content",
      ],
    },
  ];

  return (
    <footer className="mt-8">
      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-full bg-[#37475a] hover:bg-[#485769] text-white text-sm py-3 transition-colors"
      >
        Back to top
      </button>

      {/* Main footer */}
      <div className="bg-[#232f3e] text-white">
        <div className="max-w-[1500px] mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="font-bold mb-3 text-base">{col.title}</h3>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-gray-300 hover:underline hover:text-white"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider with logo */}
        <div className="border-t border-gray-600">
          <div className="max-w-[1500px] mx-auto px-4 py-8 flex flex-col items-center gap-4">
            <a href="#" className="flex items-center">
              <span className="text-2xl font-bold text-white">amazon</span>
              <span className="text-2xl text-orange-400">.</span>
              <span className="text-xs text-gray-400 ml-0.5 mt-3">com</span>
            </a>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 justify-center">
              <a href="#" className="hover:underline flex items-center gap-1">
                🌐 English
              </a>
              <a href="#" className="hover:underline">
                $ USD - U.S. Dollar
              </a>
              <a href="#" className="hover:underline">
                🇺🇸 United States
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="bg-[#131a22] text-gray-400 text-xs">
        <div className="max-w-[1500px] mx-auto px-4 py-6 text-center">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-2">
            <a href="#" className="hover:underline">Conditions of Use</a>
            <a href="#" className="hover:underline">Privacy Notice</a>
            <a href="#" className="hover:underline">Your Ads Privacy Choices</a>
            <a href="#" className="hover:underline">Cookie Preferences</a>
          </div>
          <p>© 1996-2024, Amazon.com, Inc. or its affiliates</p>
        </div>
      </div>
    </footer>
  );
}