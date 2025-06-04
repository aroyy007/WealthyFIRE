
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-charcoal/90 backdrop-blur-md shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-3 px-4 md:py-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="gold-text-gradient text-xl md:text-2xl font-display font-bold">WealthyFIRE</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 lg:gap-8">
          <Link to="/" className="text-platinum hover:text-goldLight hover:drop-shadow-[0_0_8px_rgba(255,215,0,0.7)] transition-all">Home</Link>
          <Link to="/blog" className="text-platinum hover:text-goldLight hover:drop-shadow-[0_0_8px_rgba(255,215,0,0.7)] transition-all">Blog</Link>
          <Link to="/dashboard" className="text-platinum hover:text-goldLight hover:drop-shadow-[0_0_8px_rgba(255,215,0,0.7)] transition-all">Dashboard</Link>
          <Link to="/profile" className="text-platinum hover:text-goldLight hover:drop-shadow-[0_0_8px_rgba(255,215,0,0.7)] transition-all">Profile</Link>
          <Link to="/about" className="text-platinum hover:text-goldLight hover:drop-shadow-[0_0_8px_rgba(255,215,0,0.7)] transition-all">About</Link>
        </nav>
        
        {/* Desktop Auth & Profile */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login">
            <button className="gold-button neon-glow hover:scale-105 transition-transform text-sm px-4 py-2">Sign In</button>
          </Link>
          <ProfileDropdown />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-platinum hover:text-goldLight transition-colors p-2"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-charcoal/95 backdrop-blur-md border-t border-platinum/10">
          <nav className="container mx-auto px-4 py-6 space-y-4">
            <Link 
              to="/" 
              onClick={closeMobileMenu}
              className="block text-platinum hover:text-goldLight transition-colors py-2 text-lg"
            >
              Home
            </Link>
            <Link 
              to="/blog" 
              onClick={closeMobileMenu}
              className="block text-platinum hover:text-goldLight transition-colors py-2 text-lg"
            >
              Blog
            </Link>
            <Link 
              to="/dashboard" 
              onClick={closeMobileMenu}
              className="block text-platinum hover:text-goldLight transition-colors py-2 text-lg"
            >
              Dashboard
            </Link>
            <Link 
              to="/profile" 
              onClick={closeMobileMenu}
              className="block text-platinum hover:text-goldLight transition-colors py-2 text-lg"
            >
              Profile
            </Link>
            <Link 
              to="/about" 
              onClick={closeMobileMenu}
              className="block text-platinum hover:text-goldLight transition-colors py-2 text-lg"
            >
              About
            </Link>
            
            {/* Mobile Auth */}
            <div className="pt-4 border-t border-platinum/20 space-y-3">
              <Link to="/login" onClick={closeMobileMenu}>
                <button className="w-full gold-button text-base py-3">Sign In</button>
              </Link>
              <div className="flex justify-center">
                <ProfileDropdown />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
