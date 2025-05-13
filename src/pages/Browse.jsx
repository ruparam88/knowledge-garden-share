
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import NavBar from "@/components/NavBar";
import ResourceCard from "@/components/ResourceCard";
import { mockResources, searchResources } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

const Browse = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  
  const searchQuery = searchParams.get('q') || '';
  
  useEffect(() => {
    if (searchQuery) {
      setQuery(searchQuery);
      const foundResources = searchResources(searchQuery);
      setResults(foundResources);
    } else {
      setResults([...mockResources]);
    }
  }, [searchQuery]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    const searchResults = searchResources(query);
    setResults(searchResults);
  };
  
  const handleTypeFilter = (type) => {
    setSelectedType(type === selectedType ? '' : type);
    
    if (type === selectedType) {
      setResults(query ? searchResources(query) : [...mockResources]);
    } else {
      const filtered = (query ? searchResources(query) : [...mockResources])
        .filter(resource => resource.type === type);
      setResults(filtered);
    }
  };

  const resourceTypes = [
    { id: 'code', label: 'Code' },
    { id: 'markdown', label: 'Markdown' },
    { id: 'pdf', label: 'PDF' },
    { id: 'presentation', label: 'Presentations' },
    { id: 'spreadsheet', label: 'Spreadsheets' },
    { id: 'document', label: 'Documents' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl font-bold mb-6">Browse Resources</h1>
          
          <form onSubmit={handleSearch} className="flex mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search resources..."
                className="pl-9 w-full"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button type="submit" className="ml-2">Search</Button>
          </form>
          
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <Filter className="h-4 w-4 mr-2" />
              <span className="font-medium">Filter by type:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {resourceTypes.map((type) => (
                <Button
                  key={type.id}
                  variant={selectedType === type.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleTypeFilter(type.id)}
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <h2 className="text-lg font-medium mb-2">
            {results.length} {results.length === 1 ? 'result' : 'results'} {searchQuery ? `for "${searchQuery}"` : ''}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
        
        {results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No resources found matching your search.</p>
          </div>
        )}
      </main>
      
      <footer className="border-t py-6 px-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          CodeVault © {new Date().getFullYear()} - A knowledge management system
        </div>
      </footer>
    </div>
  );
};

export default Browse;
