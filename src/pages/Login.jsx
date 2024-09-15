import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Login() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();
  const dummyData = {
    email: "gidadolateef6@gmail.com",
    password: "123456",
  };

  function handleLogin(e) {
    e.preventDefault();
    if (
      loginData.email === dummyData.email &&
      loginData.password === dummyData.password
    ) {
      toast({
        title: "Login Successful",
        description: "You have successfully logged in!",
      });
      localStorage.setItem("loggedIn", "true");
      navigate("/");
    } else {
      setError("Invalid credentials. Please try again.");
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
      });
    }
  }

  function getLoginData(e) {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16">
        <h1 className="border-b font-bold border-gray-200 p-4 text-4xl text-gray-700">
          <a href="/" className="hover:text-gray-400">
            Gi<span className="text-primary font-serif">dad</span>o Food
          </a>
        </h1>
        <div className="mt-8 space-y-4">
          <h2 className="text-3xl font-semibold text-gray-800">Get Started</h2>
          <p className="text-gray-600">
            Welcome to Gidado - Let's create your account
          </p>
          <p className="text-lg font-medium text-primary">Please Sign In</p>
        </div>

        {/* Form */}
        <form className="mt-6 space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-600 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your email"
              onChange={getLoginData}
              value={loginData.email}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your password"
              onChange={getLoginData}
              value={loginData.password}
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full px-6 py-3 text-white bg-primary hover:bg-primary-dark rounded-md transition duration-200"
          >
            Sign In
          </button>
        </form>
      </div>

      {/* Right Section (Lottie Animation) */}
      <div className="hidden md:flex items-center justify-center bg-primary w-1/2 h-full"></div>
    </div>
  );
}
