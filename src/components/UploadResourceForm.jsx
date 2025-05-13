
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

const UploadResourceForm = () => {
  const [resourceData, setResourceData] = useState({
    title: "",
    description: "",
    type: "code",
    content: "",
    tags: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResourceData({
      ...resourceData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here we would typically send the data to an API
    
    // Show success toast
    toast({
      title: "Resource uploaded",
      description: "Your resource has been successfully uploaded.",
    });
    
    // Reset form
    setResourceData({
      title: "",
      description: "",
      type: "code",
      content: "",
      tags: ""
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Upload Resource</h1>
        <p className="text-muted-foreground">Share your knowledge with the team.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input 
            id="title" 
            name="title" 
            value={resourceData.title} 
            onChange={handleChange} 
            placeholder="Enter a descriptive title"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            name="description" 
            value={resourceData.description} 
            onChange={handleChange} 
            placeholder="Briefly describe this resource"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="type">Resource Type</Label>
          <select 
            id="type" 
            name="type" 
            value={resourceData.type} 
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required
          >
            <option value="code">Code Snippet</option>
            <option value="markdown">Markdown</option>
            <option value="pdf">PDF</option>
            <option value="presentation">Presentation</option>
            <option value="spreadsheet">Spreadsheet</option>
            <option value="document">Document</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea 
            id="content" 
            name="content" 
            value={resourceData.content} 
            onChange={handleChange} 
            placeholder="Paste code, markdown, or provide a link to your resource"
            className="min-h-[200px]"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tags">Tags (comma separated)</Label>
          <Input 
            id="tags" 
            name="tags" 
            value={resourceData.tags} 
            onChange={handleChange} 
            placeholder="react, javascript, tutorial"
          />
        </div>
        
        <Button type="submit" className="w-full">Upload Resource</Button>
      </form>
    </div>
  );
};

export default UploadResourceForm;
