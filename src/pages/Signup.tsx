
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      toast({
        title: "Terms agreement required",
        description: "Please agree to the terms and privacy policy",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await signUp(formData.email, formData.password, formData.fullName);
      
      if (error) {
        toast({
          title: "Signup failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account created",
          description: "Please check your email to confirm your account",
        });
        navigate("/login");
      }
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      toast({
        title: "Google sign-up failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTermsChange = (checked: boolean | "indeterminate") => {
    setAgreedToTerms(checked === true);
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center p-4 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-60 h-60 md:w-80 md:h-80 bg-goldLight/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-60 h-60 md:w-80 md:h-80 bg-goldLight/5 rounded-full blur-3xl"></div>
      </div>
      
      <Card className="w-full max-w-md bg-softdark border-platinum/20 relative z-10 mx-4">
        <CardHeader className="text-center space-y-3 md:space-y-4">
          <div className="mx-auto">
            <span className="gold-text-gradient text-2xl md:text-3xl font-display font-bold">WealthyFIRE</span>
          </div>
          <CardTitle className="text-xl md:text-2xl font-bold text-platinum">Create Account</CardTitle>
          <CardDescription className="text-platinum/70 text-sm md:text-base">
            Join WealthyFIRE and start your journey to financial independence
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4 md:space-y-6">
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-platinum text-sm md:text-base">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="input-dark"
                placeholder="Enter your full name"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-platinum text-sm md:text-base">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="input-dark"
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-platinum text-sm md:text-base">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="input-dark pr-12"
                  placeholder="Create a password"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-platinum/50 hover:text-platinum transition-colors touch-target"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 py-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={handleTermsChange}
                className="border-platinum/20 data-[state=checked]:bg-goldLight data-[state=checked]:border-goldLight mt-1 flex-shrink-0"
                disabled={isLoading}
              />
              <Label htmlFor="terms" className="text-sm text-platinum/70 leading-relaxed">
                I agree to the{" "}
                <Link to="/terms" className="text-goldLight hover:text-goldDark underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-goldLight hover:text-goldDark underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>
            
            <Button type="submit" className="w-full gold-button" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-platinum/20" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-softdark px-2 text-platinum/50">Or continue with</span>
            </div>
          </div>
          
          <Button
            onClick={handleGoogleSignUp}
            variant="outline"
            className="w-full bg-white text-black border-white hover:bg-gray-100 transition-colors min-h-[48px]"
            disabled={isLoading}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-sm md:text-base">Sign up with Google</span>
          </Button>
          
          <div className="text-center">
            <div className="text-platinum/70 text-sm py-2">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="text-goldLight hover:text-goldDark transition-colors font-medium"
              >
                Sign in
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
