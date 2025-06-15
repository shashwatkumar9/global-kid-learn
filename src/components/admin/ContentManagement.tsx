
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ContentManagement = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [contentForm, setContentForm] = useState({
    title: "",
    content: "",
    content_type: "theory",
    subject: "",
    grade: "",
    curriculum: "",
    country: "United States",
    difficulty_level: "beginner",
    is_premium: false,
    duration: "",
    tags: "",
    meta_description: "",
    featured_image: ""
  });

  const handleContentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('educational_content')
        .insert([contentForm]);
      
      if (error) throw error;
      
      toast({
        title: "Content Added",
        description: `${contentForm.content_type} content has been successfully added.`,
      });
      
      // Reset form
      setContentForm({
        title: "",
        content: "",
        content_type: "theory",
        subject: "",
        grade: "",
        curriculum: "",
        country: "United States",
        difficulty_level: "beginner",
        is_premium: false,
        duration: "",
        tags: "",
        meta_description: "",
        featured_image: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add content.",
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
          <FileText className="h-5 w-5" />
          <span>Add Educational Content</span>
        </CardTitle>
        <CardDescription>
          Create theories, solved examples, quizzes, long exams, and instant solved exams
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleContentSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={contentForm.title}
                onChange={(e) => setContentForm({...contentForm, title: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content_type">Content Type</Label>
              <Select 
                value={contentForm.content_type} 
                onValueChange={(value) => setContentForm({...contentForm, content_type: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="theory">Theory</SelectItem>
                  <SelectItem value="solved_examples">Solved Examples</SelectItem>
                  <SelectItem value="quiz">Quiz</SelectItem>
                  <SelectItem value="long_exam">Long Exam</SelectItem>
                  <SelectItem value="instant_solved_exam">Instant Solved Exam</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={contentForm.subject}
                onChange={(e) => setContentForm({...contentForm, subject: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="grade">Grade</Label>
              <Input
                id="grade"
                value={contentForm.grade}
                onChange={(e) => setContentForm({...contentForm, grade: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="curriculum">Curriculum</Label>
              <Input
                id="curriculum"
                value={contentForm.curriculum}
                onChange={(e) => setContentForm({...contentForm, curriculum: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select 
                value={contentForm.difficulty_level} 
                onValueChange={(value) => setContentForm({...contentForm, difficulty_level: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {(contentForm.content_type === "long_exam" || contentForm.content_type === "instant_solved_exam") && (
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={contentForm.duration}
                  onChange={(e) => setContentForm({...contentForm, duration: e.target.value})}
                  placeholder="e.g. 60"
                />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={contentForm.content}
              onChange={(e) => setContentForm({...contentForm, content: e.target.value})}
              rows={8}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              value={contentForm.tags}
              onChange={(e) => setContentForm({...contentForm, tags: e.target.value})}
              placeholder="e.g. mathematics, algebra, equations"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is_premium"
              checked={contentForm.is_premium}
              onChange={(e) => setContentForm({...contentForm, is_premium: e.target.checked})}
            />
            <Label htmlFor="is_premium">Premium Content</Label>
          </div>
          <Button type="submit" disabled={loading}>
            <Save className="w-4 h-4 mr-2" />
            {loading ? "Saving..." : "Save Content"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContentManagement;
