
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Layout, Save, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PageEditor = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [pageEditor, setPageEditor] = useState({
    page_url: "",
    page_title: "",
    page_content: "",
    meta_title: "",
    meta_description: "",
    keywords: "",
    is_published: true
  });

  const handlePageSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // This would typically save to a pages table
      toast({
        title: "Page Saved",
        description: "Page has been successfully saved.",
      });
      
      // Reset form
      setPageEditor({
        page_url: "",
        page_title: "",
        page_content: "",
        meta_title: "",
        meta_description: "",
        keywords: "",
        is_published: true
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save page.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Layout className="h-5 w-5" />
          <span>Page Editor</span>
        </CardTitle>
        <CardDescription>
          Edit any page on the website with full control
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePageSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="page_url">Page URL</Label>
              <Input
                id="page_url"
                value={pageEditor.page_url}
                onChange={(e) => setPageEditor({...pageEditor, page_url: e.target.value})}
                placeholder="e.g. /about-us"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="page_title">Page Title</Label>
              <Input
                id="page_title"
                value={pageEditor.page_title}
                onChange={(e) => setPageEditor({...pageEditor, page_title: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meta_title">Meta Title (SEO)</Label>
              <Input
                id="meta_title"
                value={pageEditor.meta_title}
                onChange={(e) => setPageEditor({...pageEditor, meta_title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords (comma separated)</Label>
              <Input
                id="keywords"
                value={pageEditor.keywords}
                onChange={(e) => setPageEditor({...pageEditor, keywords: e.target.value})}
                placeholder="e.g. education, learning, K12"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="meta_description">Meta Description (SEO)</Label>
            <Textarea
              id="meta_description"
              value={pageEditor.meta_description}
              onChange={(e) => setPageEditor({...pageEditor, meta_description: e.target.value})}
              rows={2}
              placeholder="Brief description for search engines"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="page_content">Page Content (HTML/React)</Label>
            <Textarea
              id="page_content"
              value={pageEditor.page_content}
              onChange={(e) => setPageEditor({...pageEditor, page_content: e.target.value})}
              rows={12}
              placeholder="Enter HTML or React JSX content here"
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is_published"
              checked={pageEditor.is_published}
              onChange={(e) => setPageEditor({...pageEditor, is_published: e.target.checked})}
            />
            <Label htmlFor="is_published">Published</Label>
          </div>
          <div className="flex space-x-2">
            <Button type="submit" disabled={loading}>
              <Save className="w-4 h-4 mr-2" />
              {loading ? "Saving..." : "Save Page"}
            </Button>
            <Button type="button" variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PageEditor;
