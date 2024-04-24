/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import heroSvg from "@/assets/hero_svg.svg";
import { authFetchData } from "@/lib/ApiFunctions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      const isAuthenticated = authFetchData("auth/fetchuser");
      if (isAuthenticated) {
        navigate("/home");
      }
    }
  }, [localStorage.getItem("accessToken")]);

  return (
    <div id="index-page" className="min-h-screen relative">
      <span className="size-6 bg-white absolute blur-xl left-12 top-12"></span>
      <span className="size-6 bg-white absolute blur-xl right-12 bottom-12"></span>
      <header className="flex justify-between items-center sm:px-4 md:px-8 px-3 py-4 font-mono backdrop-blur-sm  border-b border-b-gray-50">
        <div className="logo">
          <p className="font-jost text-2xl font-semibold tracking-tighter cursor-pointer select-none">
            Besharam Chat
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="size-7">
            <Button variant="ghost" size="icon" className="sm:hidden">
              <HamburgerMenuIcon className="siz-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link className="font-semibold" to="/signup">
                Signup
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="font-semibold" to="/login">
                Login
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <nav className="hidden sm:block">
          <ul className="flex gap-3 items-center">
            <li>
              <Button asChild>
                <Link className="font-semibold text-primary" to="/signup">
                  Signup
                </Link>
              </Button>
            </li>
            <li>
              <Button variant="outline" asChild>
                <Link className="font-semibold" to="/login">
                  Login
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      </header>
      <div id="hero" className="grid place-content-center md:mt-28">
        <div className="flex flex-col items-center md:flex-row-reverse md:justify-between">
          <div className="grid place-items-center px-6 py-8">
            <div id="hero-img" className="sm:w-3/5 w-2/3 mx-auto">
              <img src={heroSvg} className="" alt="Hero SVG" loading="lazy" />
            </div>
          </div>
          <div className="grid place-items-center">
            <div
              id="hero-info"
              className="text-center px-7  md:text-start sm:w-5/6 "
            >
              <h1 className="font-jost font-extrabold text-xl  md:text-4xl">
                Welcome to Besharam Chat,
                <br /> where you can connect with your relatives hassle-free.
              </h1>
              <blockquote className="mt-1 italic text-sm">
                Our user-friendly platform ensures seamless communication. Say
                goodbye to complexity and hello to effortless connection. Join
                us today for a simplified way to stay in touch with your loved
                ones.
              </blockquote>
              <Button asChild className="mt-4 mb-8 md:mb-0">
                <Link className="font-medium" to="/signup">
                  Get started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
