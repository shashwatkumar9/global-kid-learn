
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HelpCircle, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const QuizManagement = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [quizForm, setQuizForm] = useState({
    question_text: "",
    options: ["", "", "", ""],
    correct_answer: "",
    explanation: "",
    question_type: "multiple_choice",
    subject: "",
    grade: "",
    curriculum: "",
    country: "United States",
    difficulty_level: "beginner",
    is_premium: false,
    points: 1,
    time_limit: 0
  });

  const handleQuizSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('questions')
        .insert([{
          ...quizForm,
          options: quizForm.options.filter(option => option.trim() !== "")
        }]);
      
      if (error) throw error;
      
      toast({
        title: "Question Added",
        description: "Quiz question has been successfully added.",
      });
      
      // Reset form
      setQuizForm({
        question_text: "",
        options: ["", "", "", ""],
        correct_answer: "",
        explanation: "",
        question_type: "multiple_choice",
        subject: "",
        grade: "",
        curriculum: "",
        country: "United States",
        difficulty_level: "beginner",
        is_premium: false,
        points: 1,
        time_limit: 0
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add question.",
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
          <HelpCircle className="h-5 w-5" />
          <span>Add Quiz Question</span>
        </CardTitle>
        <CardDescription>
          Create all types of quiz questions with enhanced features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleQuizSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="question_type">Question Type</Label>
              <Select 
                value={quizForm.question_type} 
                onValueChange={(value) => setQuizForm({...quizForm, question_type: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                  <SelectItem value="true_false">True/False</SelectItem>
                  <SelectItem value="short_answer">Short Answer</SelectItem>
                  <SelectItem value="essay">Essay</SelectItem>
                  <SelectItem value="fill_blank">Fill in the Blank</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quiz_subject">Subject</Label>
              <Input
                id="quiz_subject"
                value={quizForm.subject}
                onChange={(e) => setQuizForm({...quizForm, subject: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quiz_grade">Grade</Label>
              <Input
                id="quiz_grade"
                value={quizForm.grade}
                onChange={(e) => setQuizForm({...quizForm, grade: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quiz_curriculum">Curriculum</Label>
              <Input
                id="quiz_curriculum"
                value={quizForm.curriculum}
                onChange={(e) => setQuizForm({...quizForm, curriculum: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="points">Points</Label>
              <Input
                id="points"
                type="number"
                value={quizForm.points}
                onChange={(e) => setQuizForm({...quizForm, points: parseInt(e.target.value)})}
                min="1"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time_limit">Time Limit (seconds, 0 for no limit)</Label>
              <Input
                id="time_limit"
                type="number"
                value={quizForm.time_limit}
                onChange={(e) => setQuizForm({...quizForm, time_limit: parseInt(e.target.value)})}
                min="0"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="question_text">Question</Label>
            <Textarea
              id="question_text"
              value={quizForm.question_text}
              onChange={(e) => setQuizForm({...quizForm, question_text: e.target.value})}
              rows={3}
              required
            />
          </div>
          {quizForm.question_type === "multiple_choice" && (
            <div className="space-y-2">
              <Label>Answer Options</Label>
              {quizForm.options.map((option, index) => (
                <Input
                  key={index}
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...quizForm.options];
                    newOptions[index] = e.target.value;
                    setQuizForm({...quizForm, options: newOptions});
                  }}
                />
              ))}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="correct_answer">Correct Answer</Label>
            <Input
              id="correct_answer"
              value={quizForm.correct_answer}
              onChange={(e) => setQuizForm({...quizForm, correct_answer: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="explanation">Explanation (Optional)</Label>
            <Textarea
              id="explanation"
              value={quizForm.explanation}
              onChange={(e) => setQuizForm({...quizForm, explanation: e.target.value})}
              rows={3}
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="quiz_premium"
              checked={quizForm.is_premium}
              onChange={(e) => setQuizForm({...quizForm, is_premium: e.target.checked})}
            />
            <Label htmlFor="quiz_premium">Premium Question</Label>
          </div>
          <Button type="submit" disabled={loading}>
            <Save className="w-4 h-4 mr-2" />
            {loading ? "Saving..." : "Save Question"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuizManagement;
