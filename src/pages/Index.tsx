
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BlogSection from "../components/BlogSection";
import DashboardPreview from "../components/DashboardPreview";
import FeaturesSection from "../components/FeaturesSection";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen text-platinum">
      <Navbar />
      <Hero />
      <BlogSection />
      <DashboardPreview />
      <FeaturesSection />
      <TestimonialsCarousel />
      <Footer />
    </div>
  );
};

export default Index;
