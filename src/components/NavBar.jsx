
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Upload, BookOpen, Home } from "lucide-react";
import SearchBar from "./SearchBar";
import { cn } from "@/lib/utils";

const NavBar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-secondary/80";
  };

  return (
    <nav className="border-b sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span className="text-xl font-semibold">KnowShare</span>
          </Link>
        </div>

        <div className="hidden md:flex md:w-1/3 lg:w-1/2">
          <SearchBar />
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild className={cn(isActive("/"))}>
            <Link to="/" aria-label="Home">
              <Home className="h-5 w-5" />
            </Link>
          </Button>
          
          <Button variant="ghost" size="icon" asChild className={cn(isActive("/browse"))}>
            <Link to="/browse" aria-label="Browse">
              <Search className="h-5 w-5" />
            </Link>
          </Button>
          
          <Button asChild className={cn(isActive("/upload"))}>
            <Link to="/upload" className="flex items-center space-x-1">
              <Upload className="h-4 w-4 mr-1" />
              <span>Upload</span>
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
