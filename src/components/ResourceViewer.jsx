
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, FileImage, File, Download, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUserById } from "@/lib/mockData";

const ResourceViewer = ({ resource }) => {
  const user = getUserById(resource.createdBy);
  const date = new Date(resource.createdAt).toLocaleDateString();

  const renderContent = () => {
    switch (resource.type) {
      case "markdown":
      case "code":
        return (
          <div className="bg-muted p-4 rounded-md overflow-x-auto">
            <pre className="whitespace-pre-wrap break-words">{resource.content}</pre>
          </div>
        );
      case "pdf":
      case "presentation":
      case "spreadsheet":
      case "document":
        return (
          <div className="flex flex-col items-center justify-center p-8 bg-muted rounded-md">
            <File className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-center mb-4">
              This file can be downloaded and viewed in its native application.
            </p>
            <Button className="flex items-center">
              <Download className="mr-2 h-4 w-4" /> Download File
            </Button>
          </div>
        );
      default:
        return (
          <div className="bg-muted p-4 rounded-md text-center">
            <p>Preview not available</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{resource.title}</h1>
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <span>Shared by {user?.name}</span>
            <span>·</span>
            <span>{date}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {resource.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
      
      <p className="text-muted-foreground">{resource.description}</p>
      
      <Card>
        <CardContent className="p-6">
          {renderContent()}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourceViewer;
