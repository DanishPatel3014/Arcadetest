import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeaderRes() {
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "blogs", "team", "work", "contact"];
      let currentSection = "";

      sections.forEach((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "blogs", label: "Blogs" },
    { id: "team", label: "Team" },
    { id: "work", label: "Work" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-black bg-opacity-90 z-50">
      <div className="top-head h-3 bg-green-500"></div>
      <div className="container mx-auto max-w-screen-lg flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">LOGO</div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-white p-2 z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>

        {/* Backdrop (For Mobile) */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}

        {/* Navigation */}
        <nav
          className={`fixed top-0 right-0 h-full w-64 bg-black text-white shadow-lg transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform lg:static lg:translate-x-0 lg:w-auto lg:flex`}
        >
          <ul className="menu flex flex-col lg:flex-row gap-6 p-6 lg:p-0 lg:gap-8">
            {menuItems.map(({ id, label }) => (
              <li key={id}>
                <Link
                  href={`#${id}`}
                  className={`flex items-center gap-2 text-lg font-semibold uppercase transition-all duration-300 ${
                    activeSection === id ? "text-white" : "text-gray-400"
                  }`}
                  onClick={() => setIsMenuOpen(false)} // Close menu on click (Mobile)
                >
                  {/* Active Indicator */}
                  <span
                    className={`transition-all duration-300 w-5 ${
                      activeSection === id ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 73" fill="none">
                      <path
                        d="M26.9707 0.594299L26.9707 25.7614H49.8377L25.2021 72.1569L25.2021 51.9631H0.0493164L26.9707 0.594299Z"
                        fill="#B1FF00"
                      />
                    </svg>
                  </span>
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
