
import { useParams, Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import ResourceViewer from "@/components/ResourceViewer";
import { getResourceById } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

const View = () => {
  const { id } = useParams();
  const resource = getResourceById(id || "");

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto max-w-5xl py-8 px-4">
        {resource ? (
          <ResourceViewer resource={resource} />
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Resource Not Found</h2>
            <p className="text-muted-foreground mb-8">
              The resource you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/">Return Home</Link>
            </Button>
          </div>
        )}

        <div className="fixed bottom-8 right-8">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full h-10 w-10 shadow-md"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
      </main>
      
      <footer className="border-t py-6 px-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          CodeVault © {new Date().getFullYear()} - A knowledge management system
        </div>
      </footer>
    </div>
  );
};

export default View;
