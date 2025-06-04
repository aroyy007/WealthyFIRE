
import { useState, useEffect } from "react";
import AnimatedCounter from "./AnimatedCounter";

const MetricBadge = ({ children, className = "", delay = 0 }) => {
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div 
      className={`metric-badge floating-badge ${className} ${
        show ? "opacity-100" : "opacity-0"
      }`}
      style={{ transition: "opacity 0.5s ease", transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-16 md:pt-20 flex flex-col items-center justify-center text-center px-4">
      {/* Background with blur effect for hero section only */}
      <div className="absolute inset-0 z-[-1]">
        <div className="absolute inset-0 bg-charcoal opacity-80"></div>
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/lovable-uploads/fcf20599-8b09-4b05-ba8d-1f96d128e533.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.08,
            filter: "blur(3px)"
          }}
        ></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-softdark to-transparent"></div>
      </div>
      
      {/* Floating metrics - hidden on mobile, visible on tablet+ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
        <MetricBadge className="absolute top-[20%] left-[10%]" delay={300}>
          <span className="text-emerald">+</span>
          <AnimatedCounter end={89} suffix="%" className="ml-1 font-bold" />
          <span className="ml-2 text-sm text-platinum/70">Retention</span>
        </MetricBadge>
        
        <MetricBadge className="absolute top-[35%] right-[15%]" delay={600}>
          <span className="text-goldLight">$</span>
          <AnimatedCounter end={152000} className="ml-1 font-bold" />
          <span className="ml-2 text-sm text-platinum/70">ARR</span>
        </MetricBadge>
        
        <MetricBadge className="absolute bottom-[25%] left-[20%]" delay={900}>
          <AnimatedCounter end={1247} className="font-bold" />
          <span className="ml-2 text-sm text-platinum/70">Premium Users</span>
        </MetricBadge>
      </div>
      
      {/* Hero content */}
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight">
          Achieve <span className="gold-text-gradient">Financial Freedom</span> Through Intelligent Investing
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-platinum/80 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed">
          Track expenses, analyze investments, and plan your path to early retirement with our premium dashboard.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          <button className="gold-button text-base md:text-lg w-full sm:w-auto min-h-[48px]">
            Track Free
          </button>
          <button className="border border-platinum/30 text-base md:text-lg py-3 px-6 rounded hover:border-goldLight transition-colors w-full sm:w-auto min-h-[48px]">
            View Dashboard
          </button>
        </div>
      </div>

      {/* Mobile metrics - shown only on mobile */}
      <div className="lg:hidden mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mx-auto px-4">
        <div className="metric-badge text-center">
          <div className="text-emerald text-xl font-bold">89%</div>
          <div className="text-sm text-platinum/70">Retention</div>
        </div>
        <div className="metric-badge text-center">
          <div className="text-goldLight text-xl font-bold">$152K</div>
          <div className="text-sm text-platinum/70">ARR</div>
        </div>
        <div className="metric-badge text-center">
          <div className="text-platinum text-xl font-bold">1,247</div>
          <div className="text-sm text-platinum/70">Premium Users</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
