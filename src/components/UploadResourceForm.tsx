
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResourceType } from "@/types";

const UploadResourceForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<ResourceType>("code");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, upload the file to storage and save data to database
    console.log({
      title,
      description,
      type,
      content,
      tags: tags.split(",").map(t => t.trim()),
      file
    });

    toast({
      title: "Resource uploaded successfully",
      description: "Your knowledge resource is now available to others.",
    });
    
    // Navigate back home or to the new resource
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Share Knowledge Resource</CardTitle>
          <CardDescription>
            Upload a document, code snippet, or other resource to share with your team.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              placeholder="Enter a descriptive title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Briefly describe this resource" 
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Resource Type</Label>
            <Select value={type} onValueChange={(value: ResourceType) => setType(value)}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select resource type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="code">Code Snippet</SelectItem>
                <SelectItem value="markdown">Markdown</SelectItem>
                <SelectItem value="pdf">PDF Document</SelectItem>
                <SelectItem value="presentation">Presentation</SelectItem>
                <SelectItem value="spreadsheet">Spreadsheet</SelectItem>
                <SelectItem value="document">Document</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {(type === "code" || type === "markdown") ? (
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea 
                id="content" 
                placeholder="Paste your code or markdown here" 
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="file">Upload File</Label>
              <Input 
                id="file" 
                type="file" 
                onChange={(e) => e.target.files && setFile(e.target.files[0])}
                required
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input 
              id="tags" 
              placeholder="Enter tags separated by commas" 
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button type="submit">Upload Resource</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default UploadResourceForm;
