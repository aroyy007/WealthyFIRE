
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "WealthyFIRE transformed how I track my finances. I'm now on track to retire 5 years earlier than planned!",
    author: "Sarah Johnson",
    role: "Software Engineer",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b1b7?w=64&h=64&fit=crop&crop=face"
  },
  {
    id: 2,
    quote: "The dashboard makes complex financial planning simple. I finally understand where my money goes and how to optimize it.",
    author: "Michael Chen",
    role: "Marketing Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
  },
  {
    id: 3,
    quote: "Amazing insights and beautiful visualizations. This tool helped me increase my savings rate from 15% to 45%!",
    author: "Emma Davis",
    role: "Product Manager",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face"
  }
];

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-20 bg-softdark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-platinum/70 max-w-2xl mx-auto">
            Join thousands of users who have transformed their financial journey with WealthyFIRE.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-8">
                  <div className="bg-charcoal rounded-2xl p-8 border border-platinum/10 text-center hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all">
                    <blockquote className="text-xl mb-6 leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center justify-center gap-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-goldLight">{testimonial.author}</p>
                        <p className="text-sm text-platinum/70">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-goldLight text-charcoal rounded-full flex items-center justify-center hover:bg-goldDark transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-goldLight text-charcoal rounded-full flex items-center justify-center hover:bg-goldDark transition-colors"
          >
            <ChevronRight size={20} />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-goldLight' : 'bg-platinum/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
