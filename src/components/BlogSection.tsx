
import { Link } from "react-router-dom";

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "10 Strategies for Early Retirement That Actually Work",
    excerpt: "Learn the proven investment strategies that can accelerate your path to financial independence.",
    image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=1000",
    category: "Investing",
    readTime: "8 min read"
  },
  {
    id: 2,
    title: "Luxury Living on a FIRE Budget: The Art of Strategic Spending",
    excerpt: "Discover how to enjoy premium experiences while still maintaining your savings rate.",
    image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=1000",
    category: "Lifestyle",
    readTime: "6 min read"
  },
  {
    id: 3,
    title: "Real Estate vs. Index Funds: What the Data Really Shows",
    excerpt: "A data-driven analysis comparing two of the most popular wealth-building vehicles.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000",
    category: "Analysis",
    readTime: "12 min read"
  }
];

const BlogCard = ({ post }) => {
  return (
    <div className="blog-card">
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 blog-gradient-overlay flex items-end p-4 md:p-6">
          <div>
            <span className="px-2 py-1 md:px-3 md:py-1 bg-goldLight text-charcoal rounded-full text-xs font-semibold">
              {post.category}
            </span>
            <h3 className="text-lg md:text-xl font-bold mt-2 md:mt-3 mb-1 md:mb-2 leading-tight">{post.title}</h3>
            <p className="text-platinum/70 text-xs md:text-sm">{post.readTime}</p>
          </div>
        </div>
      </div>
      <div className="p-4 md:p-6">
        <p className="text-platinum/70 mb-3 md:mb-4 text-sm md:text-base leading-relaxed">{post.excerpt}</p>
        <Link 
          to={`/blog/${post.id}`}
          className="inline-flex items-center text-emerald hover:text-goldLight transition-colors text-sm md:text-base"
        >
          Read More
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

const BlogSection = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-softdark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Latest Insights</h2>
          <p className="text-platinum/70 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Exclusive content on wealth building, investment strategies, and achieving financial independence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {blogPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        
        <div className="mt-10 md:mt-12 text-center">
          <Link to="/blog" className="gold-button inline-block text-base md:text-lg px-6 md:px-8 py-3">
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
