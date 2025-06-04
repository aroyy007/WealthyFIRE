
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Calendar, DollarSign, LogOut, Eye, EyeOff } from "lucide-react";
import Navbar from "../components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { transactionService } from "@/services/transactionService";
import { blogService } from "@/services/blogService";

const Profile = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        // Fetch user transactions
        const userTransactions = await transactionService.getUserTransactions(user.id);
        setTransactions(userTransactions);
        
        // Fetch user blog posts
        const userBlogPosts = await blogService.getUserPosts(user.id);
        setBlogPosts(userBlogPosts);
      } catch (error) {
        toast({
          title: "Error fetching data",
          description: error instanceof Error ? error.message : "An unexpected error occurred",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [user, toast]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/");
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    // This would typically call a password change function from your auth service
    toast({
      title: "Feature coming soon",
      description: "Password change functionality will be available soon",
    });
  };

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    // This would typically call an email change function from your auth service
    toast({
      title: "Feature coming soon",
      description: "Email change functionality will be available soon",
    });
  };

  const handleDeleteTransaction = async (id: number) => {
    if (!user) return;
    
    try {
      await transactionService.deleteTransaction(id, user.id);
      setTransactions(transactions.filter(t => t.id !== id));
      toast({
        title: "Transaction deleted",
        description: "The transaction has been successfully removed",
      });
    } catch (error) {
      toast({
        title: "Delete failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleDeleteBlogPost = async (id: number) => {
    if (!user) return;
    
    try {
      await blogService.deletePost(id, user.id);
      setBlogPosts(blogPosts.filter(p => p.id !== id));
      toast({
        title: "Blog post deleted",
        description: "The blog post has been successfully removed",
      });
    } catch (error) {
      toast({
        title: "Delete failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-charcoal text-platinum">
        <Navbar />
        <div className="container mx-auto px-4 py-8 pt-24">
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-goldLight text-xl">Loading profile data...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal text-platinum">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="bg-softdark border-platinum/20 mb-8">
            <CardHeader>
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={user?.user_metadata?.avatar_url || ""} />
                  <AvatarFallback className="bg-goldLight text-charcoal text-2xl font-bold">
                    {user?.user_metadata?.full_name?.split(' ').map(n => n[0]).join('') || user?.email?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl text-platinum">{user?.user_metadata?.full_name || "User"}</CardTitle>
                  <CardDescription className="text-platinum/70 text-lg">{user?.email}</CardDescription>
                  <Badge className="mt-2 bg-goldLight/10 text-goldLight border-goldLight/20">
                    Member
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Profile Tabs */}
          <Tabs defaultValue="transactions" className="space-y-6">
            <TabsList className="bg-softdark border border-platinum/20">
              <TabsTrigger value="transactions" className="data-[state=active]:bg-goldLight data-[state=active]:text-charcoal">
                My Transactions
              </TabsTrigger>
              <TabsTrigger value="blog-posts" className="data-[state=active]:bg-goldLight data-[state=active]:text-charcoal">
                My Blog Posts
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-goldLight data-[state=active]:text-charcoal">
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Transactions Tab */}
            <TabsContent value="transactions">
              <Card className="bg-softdark border-platinum/20">
                <CardHeader>
                  <CardTitle className="text-platinum">My Transactions</CardTitle>
                  <CardDescription className="text-platinum/70">
                    All your financial transactions in one place
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {transactions.length > 0 ? (
                    <div className="space-y-4">
                      {transactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-4 bg-charcoal rounded-xl border border-platinum/10">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              transaction.amount > 0 ? 'bg-emerald/20 text-emerald' : 'bg-red-500/20 text-red-400'
                            }`}>
                              <DollarSign size={16} />
                            </div>
                            <div>
                              <p className="font-medium text-platinum">{transaction.description}</p>
                              <p className="text-sm text-platinum/50">{new Date(transaction.created_at).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="text-right flex items-center gap-3">
                            <div>
                              <p className={`font-bold ${
                                transaction.amount > 0 ? 'text-emerald' : 'text-red-400'
                              }`}>
                                {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                              </p>
                              <Badge variant="outline" className="text-xs border-platinum/20 text-platinum/70">
                                {transaction.category}
                              </Badge>
                            </div>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="text-red-400 hover:text-red-300"
                              onClick={() => handleDeleteTransaction(transaction.id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-platinum/70">You haven't added any transactions yet.</p>
                      <Button 
                        className="mt-4 gold-button"
                        onClick={() => navigate('/dashboard')}
                      >
                        Go to Dashboard
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Blog Posts Tab */}
            <TabsContent value="blog-posts">
              <Card className="bg-softdark border-platinum/20">
                <CardHeader>
                  <CardTitle className="text-platinum">My Blog Posts</CardTitle>
                  <CardDescription className="text-platinum/70">
                    Manage your published articles and drafts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {blogPosts.length > 0 ? (
                    <div className="space-y-4">
                      {blogPosts.map((post) => (
                        <div key={post.id} className="flex items-center justify-between p-4 bg-charcoal rounded-xl border border-platinum/10">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-goldLight/20 text-goldLight flex items-center justify-center">
                              <Calendar size={16} />
                            </div>
                            <div>
                              <p className="font-medium text-platinum">{post.title}</p>
                              <p className="text-sm text-platinum/50">{new Date(post.created_at).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge 
                              className="bg-emerald text-white"
                            >
                              Published
                            </Badge>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="text-platinum/70 hover:text-platinum"
                              onClick={() => navigate(`/blog/edit/${post.id}`)}
                            >
                              <Edit size={16} />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="text-red-400 hover:text-red-300"
                              onClick={() => handleDeleteBlogPost(post.id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-platinum/70">You haven't created any blog posts yet.</p>
                      <Button 
                        className="mt-4 gold-button"
                        onClick={() => navigate('/blog')}
                      >
                        Go to Blog
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <div className="space-y-6">
                {/* Email Settings */}
                <Card className="bg-softdark border-platinum/20">
                  <CardHeader>
                    <CardTitle className="text-platinum">Email Settings</CardTitle>
                    <CardDescription className="text-platinum/70">
                      Update your email address
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleEmailChange} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-platinum">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue={user?.email || ""}
                          className="input-dark"
                        />
                      </div>
                      <Button type="submit" className="gold-button">
                        Update Email
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Password Settings */}
                <Card className="bg-softdark border-platinum/20">
                  <CardHeader>
                    <CardTitle className="text-platinum">Password Settings</CardTitle>
                    <CardDescription className="text-platinum/70">
                      Change your account password
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password" className="text-platinum">Current Password</Label>
                        <Input
                          id="current-password"
                          type="password"
                          className="input-dark"
                          placeholder="Enter current password"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password" className="text-platinum">New Password</Label>
                        <div className="relative">
                          <Input
                            id="new-password"
                            type={showNewPassword ? "text" : "password"}
                            className="input-dark pr-10"
                            placeholder="Enter new password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-platinum/50 hover:text-platinum transition-colors"
                          >
                            {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                      <Button type="submit" className="gold-button">
                        Update Password
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Logout Section */}
                <Card className="bg-softdark border-platinum/20">
                  <CardHeader>
                    <CardTitle className="text-platinum">Account Actions</CardTitle>
                    <CardDescription className="text-platinum/70">
                      Sign out of your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={handleLogout}
                      variant="destructive"
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
