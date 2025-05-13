
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "@/components/NavBar";
import ResourceCard from "@/components/ResourceCard";
import { mockResources, searchResources } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";

const Browse = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("q") || "";
  
  const [query, setQuery] = useState(initialQuery);
  const [resources, setResources] = useState(initialQuery ? searchResources(initialQuery) : mockResources);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Get unique tags from all resources
  const allTags = Array.from(
    new Set(mockResources.flatMap(resource => resource.tags))
  ).sort();
  
  useEffect(() => {
    let filtered = initialQuery ? searchResources(initialQuery) : mockResources;
    
    // Apply tag filters
    if (selectedTags.length > 0) {
      filtered = filtered.filter(resource => 
        selectedTags.every(tag => resource.tags.includes(tag))
      );
    }
    
    setResources(filtered);
  }, [initialQuery, selectedTags]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchResults = searchResources(query);
    setResources(searchResults);
    
    // Update URL with search query
    const newParams = new URLSearchParams(location.search);
    if (query) {
      newParams.set("q", query);
    } else {
      newParams.delete("q");
    }
    
    const newSearch = newParams.toString();
    const newPath = location.pathname + (newSearch ? `?${newSearch}` : "");
    window.history.pushState({ path: newPath }, "", newPath);
  };
  
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto max-w-7xl py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar for filters */}
          <div className="w-full md:w-64 space-y-6">
            <div>
              <h3 className="font-medium mb-3">Search</h3>
              <form onSubmit={handleSearch} className="flex space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search resources..."
                    className="pl-9"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <Button type="submit" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Filter by Tags</h3>
              <div className="space-y-2">
                {allTags.map(tag => (
                  <Badge 
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="mr-2 mb-2 cursor-pointer"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                    {selectedTags.includes(tag) && (
                      <X className="ml-1 h-3 w-3" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">
                Browse Resources
                {initialQuery && (
                  <span className="text-base font-normal ml-2 text-muted-foreground">
                    Results for "{initialQuery}"
                  </span>
                )}
              </h2>
              <span className="text-sm text-muted-foreground">
                {resources.length} resources found
              </span>
            </div>
            
            {resources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-muted rounded-lg">
                <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No resources found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Try changing your search query or filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6 px-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          KnowShare © {new Date().getFullYear()} - A knowledge management system
        </div>
      </footer>
    </div>
  );
};

export default Browse;
