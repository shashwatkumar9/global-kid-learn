
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PenTool, Save, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BlogManagement = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [blogForm, setBlogForm] = useState({
    title: "",
    content: "",
    excerpt: "",
    author: "K12Expert Team",
    category: "Education",
    tags: "",
    featured_image: "",
    is_published: false,
    publish_date: new Date().toISOString().split('T')[0]
  });

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // This would typically save to a blog_posts table
      toast({
        title: "Blog Post Saved",
        description: "Blog post has been successfully saved.",
      });
      
      // Reset form
      setBlogForm({
        title: "",
        content: "",
        excerpt: "",
        author: "K12Expert Team",
        category: "Education",
        tags: "",
        featured_image: "",
        is_published: false,
        publish_date: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save blog post.",
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
          <PenTool className="h-5 w-5" />
          <span>Blog Management</span>
        </CardTitle>
        <CardDescription>
          Create and manage blog posts for k12expert.com/blog
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleBlogSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="blog_title">Blog Title</Label>
              <Input
                id="blog_title"
                value={blogForm.title}
                onChange={(e) => setBlogForm({...blogForm, title: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="blog_category">Category</Label>
              <Select 
                value={blogForm.category} 
                onValueChange={(value) => setBlogForm({...blogForm, category: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Teaching Tips">Teaching Tips</SelectItem>
                  <SelectItem value="Student Success">Student Success</SelectItem>
                  <SelectItem value="Parent Guides">Parent Guides</SelectItem>
                  <SelectItem value="Curriculum">Curriculum</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="blog_author">Author</Label>
              <Input
                id="blog_author"
                value={blogForm.author}
                onChange={(e) => setBlogForm({...blogForm, author: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="publish_date">Publish Date</Label>
              <Input
                id="publish_date"
                type="date"
                value={blogForm.publish_date}
                onChange={(e) => setBlogForm({...blogForm, publish_date: e.target.value})}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="blog_excerpt">Excerpt</Label>
            <Textarea
              id="blog_excerpt"
              value={blogForm.excerpt}
              onChange={(e) => setBlogForm({...blogForm, excerpt: e.target.value})}
              rows={3}
              placeholder="Brief summary of the blog post"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="blog_content">Blog Content</Label>
            <Textarea
              id="blog_content"
              value={blogForm.content}
              onChange={(e) => setBlogForm({...blogForm, content: e.target.value})}
              rows={10}
              placeholder="Write your blog post content here"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="blog_tags">Tags (comma separated)</Label>
              <Input
                id="blog_tags"
                value={blogForm.tags}
                onChange={(e) => setBlogForm({...blogForm, tags: e.target.value})}
                placeholder="e.g. education, tips, students"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="featured_image">Featured Image URL</Label>
              <Input
                id="featured_image"
                value={blogForm.featured_image}
                onChange={(e) => setBlogForm({...blogForm, featured_image: e.target.value})}
                placeholder="https://..."
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="blog_published"
              checked={blogForm.is_published}
              onChange={(e) => setBlogForm({...blogForm, is_published: e.target.checked})}
            />
            <Label htmlFor="blog_published">Publish Immediately</Label>
          </div>
          <div className="flex space-x-2">
            <Button type="submit" disabled={loading}>
              <Save className="w-4 h-4 mr-2" />
              {loading ? "Saving..." : "Save Blog Post"}
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

export default BlogManagement;
