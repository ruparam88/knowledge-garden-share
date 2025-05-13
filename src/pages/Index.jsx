
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import ResourceCard from "@/components/ResourceCard";
import { mockResources } from "@/lib/mockData";
import { Upload, Search, BookOpen } from "lucide-react";

const Index = () => {
  const recentResources = [...mockResources].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <BookOpen className="mx-auto h-12 w-12 text-primary mb-4" />
            <h1 className="text-4xl font-bold mb-4">CodeVault Knowledge Management</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Share, discover and collaborate on knowledge resources with your team.
              From code snippets to presentation slides, make information accessible to all.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/upload">
                  <Upload className="mr-2 h-5 w-5" />
                  Share Knowledge
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/browse">
                  <Search className="mr-2 h-5 w-5" />
                  Browse Resources
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Recent Resources */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Recent Resources</h2>
              <Button variant="outline" asChild>
                <Link to="/browse">View All</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-muted py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl font-semibold text-center mb-10">Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Resource Sharing</h3>
                <p className="text-muted-foreground">
                  Share code snippets, documents, spreadsheets, presentations and more with your team.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Fast Search</h3>
                <p className="text-muted-foreground">
                  Quickly find resources using powerful search capabilities and tag filtering.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Easy Uploads</h3>
                <p className="text-muted-foreground">
                  Upload any type of file or paste code directly to share with the team.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-6 px-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          CodeVault © {new Date().getFullYear()} - A knowledge management system
        </div>
      </footer>
    </div>
  );
};

export default Index;
