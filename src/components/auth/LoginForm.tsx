import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { 
  Loader2, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff 
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { useNavigate, useLocation } from "react-router-dom";

interface LoginFormProps {
  schoolLogo: string;
}

export function LoginForm({ schoolLogo }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  
  // Email validation states
  const [emailError, setEmailError] = useState("");
  
  // Remember me state
  const [rememberMe, setRememberMe] = useState(false);
  
  // Password recovery dialog state
  const [showPasswordRecovery, setShowPasswordRecovery] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [isRecovering, setIsRecovering] = useState(false);
  
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  // Clear form data when component mounts or on logout for security
  useEffect(() => {
    const clearFormData = () => {
      setSignInData({
        email: "",
        password: "",
      });
      setRecoveryEmail("");
      setEmailError("");
      setShowPassword(false);
      setRememberMe(false);
    };

    // Clear on mount
    clearFormData();

    // Listen for logout event
    const handleClearFormData = () => clearFormData();
    window.addEventListener('clearFormData', handleClearFormData);

    return () => {
      window.removeEventListener('clearFormData', handleClearFormData);
    };
  }, []);
  
  // Email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Handle email changes with validation
  const handleEmailChange = (email: string) => {
    setSignInData({ ...signInData, email });
    if (email && !validateEmail(email)) {
      setEmailError("Please type a correct email address");
    } else {
      setEmailError("");
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInData.email || !signInData.password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    
    // Preserve non-auth data before clearing
    const cookieConsent = localStorage.getItem('cookieConsent');
    const redirectPath = localStorage.getItem('redirectAfterLogin');
    
    // Clear ALL auth-related localStorage to prevent session leakage
    const authKeys = ['adminToken', 'adminRole', 'adminName', 'adminVerified', 'adminId', 'adminEmail', 'adminPersonalEmail',
                      'teacherToken', 'teacherRole', 'teacherName', 'teacherId', 'teacherEmail', 'teacherVerified', 'teacherPersonalEmail',
                      'studentToken', 'studentRole', 'studentName', 'studentId', 'studentEmail', 'studentVerified', 'studentPersonalEmail', 'studentPhotoUrl'];
    authKeys.forEach(key => localStorage.removeItem(key));
    
    // Restore preserved data
    if (cookieConsent) localStorage.setItem('cookieConsent', cookieConsent);
    if (redirectPath) localStorage.setItem('redirectAfterLogin', redirectPath);
    
    try {
      // Use edge function for secure authentication
      const { data: loginResponse, error: loginError } = await supabase.functions.invoke('verify_flexible_login', {
        body: { 
          p_identifier: signInData.email, 
          p_password: signInData.password 
        }
      });

      if (loginError) {
        toast.error("Failed to connect to authentication service");
        setIsLoading(false);
        return;
      }

      if (!loginResponse.success) {
        toast.error(loginResponse.message || "Invalid email or password");
        setIsLoading(false);
        return;
      }

      // Store session info based on role
      const { role, name, email, token, is_verified, personal_email, photo_url, student_id, teacher_id } = loginResponse;
      const userId = student_id || teacher_id || email;
      
      if (role === 'admin') {
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminRole', role);
        localStorage.setItem('adminName', name);
        localStorage.setItem('adminVerified', String(is_verified));
        localStorage.setItem('adminId', userId);
        localStorage.setItem('adminEmail', email);
        if (personal_email) {
          localStorage.setItem('adminPersonalEmail', personal_email);
        }
      } else if (role === 'teacher') {
        localStorage.setItem('teacherToken', token);
        localStorage.setItem('teacherRole', role);
        localStorage.setItem('teacherName', name);
        localStorage.setItem('teacherId', userId);
        localStorage.setItem('teacherEmail', email);
        localStorage.setItem('teacherVerified', String(is_verified));
        if (personal_email) {
          localStorage.setItem('teacherPersonalEmail', personal_email);
        }
      } else if (role === 'student') {
        localStorage.setItem('studentToken', token);
        localStorage.setItem('studentRole', role);
        localStorage.setItem('studentName', name);
        localStorage.setItem('studentId', userId);
        localStorage.setItem('studentEmail', email);
        localStorage.setItem('studentVerified', String(is_verified));
        if (personal_email) {
          localStorage.setItem('studentPersonalEmail', personal_email);
        }
        if (photo_url) {
          localStorage.setItem('studentPhotoUrl', photo_url);
        }
      }
      
      // Trigger storage event for cross-tab sync and immediate state update
      window.dispatchEvent(new StorageEvent('storage', {
        key: `${role}Token`,
        newValue: token,
        url: window.location.href,
        storageArea: localStorage
      }));
      
      toast.success(`Welcome, ${name}!`);
      
      // Show loading indicator before navigation
      setIsNavigating(true);
      
      // Handle redirect with role validation
      const storedRedirect = localStorage.getItem('redirectAfterLogin');
      localStorage.removeItem('redirectAfterLogin');
      
      const isValidPathForRole = (path: string, userRole: string): boolean => {
        if (!path || path === '/' || path === '/login') return true;
        if (path.startsWith(`/${userRole}`)) return true;
        const allowedGeneralPaths = ['/profile', '/settings'];
        return allowedGeneralPaths.some(allowedPath => path.startsWith(allowedPath));
      };
      
      let targetPath = '/';
      
      if (storedRedirect && isValidPathForRole(storedRedirect, role)) {
        targetPath = storedRedirect;
      } else if (storedRedirect && !isValidPathForRole(storedRedirect, role)) {
        targetPath = `/${role}`;
      }
      
      // Navigate with slight delay for state updates
      setTimeout(() => {
        navigate(targetPath, { replace: true });
      }, 100);
      
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || "Failed to sign in");
      setIsNavigating(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordRecovery = async () => {
    if (!recoveryEmail) {
      toast.error("Please enter your email address");
      return;
    }
    
    if (!validateEmail(recoveryEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsRecovering(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(recoveryEmail, {
        redirectTo: `${window.location.origin}/`,
      });
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Password recovery email sent! Please check your inbox.");
        setShowPasswordRecovery(false);
        setRecoveryEmail("");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to send recovery email");
    } finally {
      setIsRecovering(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1">
        <div className="mb-4 flex justify-center">
          <img 
            src={schoolLogo} 
            alt="Glorious Kindergarten & Primary School" 
            className="h-24 w-24 object-contain"
          />
        </div>
        <CardTitle className="text-2xl font-bold text-center">
          Glorious Schools Portal
        </CardTitle>
        <CardDescription className="text-center">
          Sign in with your school credentials to access your dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signin-email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="signin-email"
                type="email"
                placeholder="Enter your email"
                value={signInData.email}
                onChange={(e) => handleEmailChange(e.target.value)}
                disabled={isLoading}
                className="pl-10"
                required
              />
            </div>
            {emailError && (
              <p className="text-xs text-destructive">{emailError}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="signin-password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="signin-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={signInData.password}
                onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                disabled={isLoading}
                className="pl-10 pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="remember-me" 
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <Label 
              htmlFor="remember-me" 
              className="text-sm font-normal cursor-pointer"
            >
              Remember Me
            </Label>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading || isNavigating}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : isNavigating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading dashboard...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
          
          <div className="flex items-center justify-center">
            <Dialog open={showPasswordRecovery} onOpenChange={setShowPasswordRecovery}>
              <DialogTrigger asChild>
                <Button variant="link" className="px-0 font-normal text-sm">
                  Forgot Password?
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reset Password</DialogTitle>
                  <DialogDescription>
                    Enter your email address and we'll send you a link to reset your password.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="recovery-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="recovery-email"
                        type="email"
                        placeholder="Enter your email address"
                        value={recoveryEmail}
                        onChange={(e) => setRecoveryEmail(e.target.value)}
                        disabled={isRecovering}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={handlePasswordRecovery} 
                    className="w-full"
                    disabled={isRecovering}
                  >
                    {isRecovering ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Recovery Email"
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}