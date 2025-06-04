
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { blogService, BlogPost } from "@/services/blogService";
import BlogPostForm from "@/components/BlogPostForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    setIsLoading(true);
    try {
      const data = await blogService.getAllPosts();
      setBlogPosts(data);
    } catch (error) {
      toast({
        title: "Error fetching blog posts",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePost = () => {
    setIsCreateModalOpen(true);
  };

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Extract unique categories from blog posts
  const categories = ["All", ...Array.from(new Set(blogPosts.map(post => post.category)))];

  return (
    <div className="min-h-screen bg-charcoal text-platinum">
      <Navbar />
      
      <div className="pt-24 pb-16 bg-softdark">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div>
              <h1 className="text-5xl font-bold mb-6 text-center md:text-left">WealthyFIRE Blog</h1>
              <p className="text-xl text-platinum/70 text-center md:text-left max-w-3xl">
                Insights and strategies for building wealth and achieving financial independence.
              </p>
            </div>
            {user && (
              <Button onClick={handleCreatePost} className="gold-button mt-4 md:mt-0">
                Create New Post
              </Button>
            )}
          </div>
          
          <div className="mt-10 flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
              {categories.map(category => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    selectedCategory === category 
                      ? "bg-gold-gradient text-charcoal font-semibold neon-glow" 
                      : "text-platinum/70 hover:text-neonYellow hover:drop-shadow-[0_0_8px_rgba(255,255,0,0.7)] bg-charcoal/50"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="w-full md:w-auto">
              <Input
                type="text"
                placeholder="Search articles..."
                className="input-dark w-full md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="py-16 bg-charcoal">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-pulse text-goldLight text-xl">Loading blog posts...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.length > 0 ? (
                filteredPosts.map(post => (
                  <div key={post.id} className="blog-card">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={post.image_url} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute inset-0 blog-gradient-overlay flex items-end p-6">
                        <div>
                          <span className="px-3 py-1 bg-neonYellow text-charcoal rounded-full text-xs font-semibold neon-glow">
                            {post.category}
                          </span>
                          <h3 className="text-xl font-bold mt-3 mb-2">{post.title}</h3>
                          <div className="flex items-center text-platinum/70 text-sm">
                            <span>{format(new Date(post.created_at), 'MMM d, yyyy')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-platinum/70 mb-4">{post.excerpt}</p>
                      <a 
                        href={`#/blog/${post.id}`}
                        className="inline-flex items-center text-neonYellow hover:text-neonYellow transition-colors drop-shadow-[0_0_5px_rgba(255,255,0,0.7)]"
                      >
                        Read More
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <h3 className="text-2xl font-bold mb-2">No articles found</h3>
                  <p className="text-platinum/70">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="bg-softdark border-platinum/20 max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-platinum text-xl">Create New Blog Post</DialogTitle>
          </DialogHeader>
          <BlogPostForm 
            onSuccess={() => {
              setIsCreateModalOpen(false);
              fetchBlogPosts();
            }} 
          />
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Blog;
