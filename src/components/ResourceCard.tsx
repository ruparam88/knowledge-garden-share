
import { Resource } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, FileImage, FileAudio, FileVideo, File, Book } from "lucide-react";
import { getUserById } from "@/lib/mockData";

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard = ({ resource }: ResourceCardProps) => {
  const user = getUserById(resource.createdBy);
  const date = new Date(resource.createdAt).toLocaleDateString();

  const getIcon = (type: string) => {
    switch (type) {
      case "markdown":
      case "document":
        return <FileText className="h-8 w-8 text-blue-500" />;
      case "pdf":
        return <FileText className="h-8 w-8 text-red-500" />;
      case "presentation":
        return <File className="h-8 w-8 text-orange-500" />;
      case "spreadsheet":
        return <FileText className="h-8 w-8 text-green-500" />;
      case "code":
        return <Book className="h-8 w-8 text-purple-500" />;
      default:
        return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardHeader className="p-4 pb-2 flex flex-row items-center space-x-3">
        <div className="p-2 bg-muted rounded-md">
          {getIcon(resource.type)}
        </div>
        <div>
          <CardTitle className="line-clamp-1 text-lg">{resource.title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {user?.name} · {date}
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-muted-foreground line-clamp-2">{resource.description}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {resource.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {resource.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{resource.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="secondary" asChild className="w-full">
          <Link to={`/view/${resource.id}`}>View Resource</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;
