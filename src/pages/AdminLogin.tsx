
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ParticlesBackground from '@/components/ParticlesBackground';

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  // Default admin credentials (in real world, this would be in a database)
  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "admin123";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Simple authentication check
    if (values.username === ADMIN_USERNAME && values.password === ADMIN_PASSWORD) {
      // Set admin session in localStorage
      localStorage.setItem("adminAuthenticated", "true");
      
      // Show success toast
      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard",
      });
      
      // Navigate to admin dashboard
      navigate("/admin/dashboard");
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-neurospark-dark flex items-center justify-center">
      <ParticlesBackground />
      
      <div className="glass-card w-full max-w-md p-8 rounded-xl">
        <div className="mb-6 text-center">
          <a href="/" className="text-2xl font-poppins font-bold mb-1">
            <span className="gradient-text">Neuro</span>
            <span className="text-white">Spark</span>
          </a>
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-white/70 text-sm mt-2">Sign in to manage your portfolio content</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="admin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••" 
                        {...field} 
                      />
                    </FormControl>
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <button 
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2 py-2"
            >
              <LogIn size={18} />
              Sign In
            </button>
          </form>
        </Form>
        
        <div className="mt-4 text-center">
          <a href="/" className="text-sm text-neurospark-purple hover:text-neurospark-purple-light">
            Back to Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
