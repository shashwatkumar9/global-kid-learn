
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { ContentAccess } from "@/components/ContentAccess";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Brain, FileText, Timer, Crown, Users, Globe, GraduationCap } from "lucide-react";

const SubjectGradeCurriculumPage = () => {
  const { subjectName, gradeName, curriculumName } = useParams();
  const navigate = useNavigate();
  const [theoryContent, setTheoryContent] = useState<any[]>([]);
  const [solvedExamples, setSolvedExamples] = useState<any[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [examQuestions, setExamQuestions] = useState<any[]>([]);
  const [shortQuizQuestions, setShortQuizQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const formatName = (name: string | undefined) => 
    name?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || '';

  const subject = formatName(subjectName);
  const grade = formatName(gradeName);
  const curriculum = formatName(curriculumName);

  useEffect(() => {
    loadContent();
  }, [subjectName, gradeName, curriculumName]);

  const loadContent = async () => {
    try {
      // Load theory content
      const { data: theory } = await supabase
        .from('educational_content')
        .select('*')
        .eq('subject', subject)
        .eq('grade', grade)
        .eq('curriculum', curriculum)
        .eq('content_type', 'theory');

      // Load solved examples
      const { data: examples } = await supabase
        .from('educational_content')
        .select('*')
        .eq('subject', subject)
        .eq('grade', grade)
        .eq('curriculum', curriculum)
        .eq('content_type', 'solved_examples');

      // Load quiz questions
      const { data: quiz } = await supabase
        .from('questions')
        .select('*')
        .eq('subject', subject)
        .eq('grade', grade)
        .eq('curriculum', curriculum)
        .eq('question_type', 'quiz');

      // Load exam questions
      const { data: exam } = await supabase
        .from('questions')
        .select('*')
        .eq('subject', subject)
        .eq('grade', grade)
        .eq('curriculum', curriculum)
        .eq('question_type', 'exam');

      // Load short quiz questions
      const { data: shortQuiz } = await supabase
        .from('questions')
        .select('*')
        .eq('subject', subject)
        .eq('grade', grade)
        .eq('curriculum', curriculum)
        .eq('question_type', 'short_quiz');

      setTheoryContent(theory || []);
      setSolvedExamples(examples || []);
      setQuizQuestions(quiz || []);
      setExamQuestions(exam || []);
      setShortQuizQuestions(shortQuiz || []);
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderContentSection = (title: string, content: string) => (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
      <div className="prose prose-lg max-w-none">
        {content.split('\n\n').map((paragraph, index) => (
          <div key={index} className="mb-4">
            {paragraph.startsWith('**') && paragraph.endsWith('**') ? (
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {paragraph.slice(2, -2)}
              </h3>
            ) : paragraph.startsWith('- ') ? (
              <ul className="list-disc list-inside text-gray-600">
                {paragraph.split('\n').map((item, idx) => (
                  <li key={idx}>{item.slice(2)}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 leading-relaxed">{paragraph}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading educational content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="ghost" onClick={() => navigate("/")} className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
        </div>

        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <GraduationCap className="w-8 h-8 text-purple-600" />
            <Globe className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {subject} - {grade} - {curriculum}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Comprehensive {subject} curriculum for {grade} students following {curriculum} standards
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Badge variant="secondary" className="flex items-center space-x-1">
              <BookOpen className="w-3 h-3" />
              <span>{subject}</span>
            </Badge>
            <Badge variant="secondary" className="flex items-center space-x-1">
              <GraduationCap className="w-3 h-3" />
              <span>{grade}</span>
            </Badge>
            <Badge variant="secondary" className="flex items-center space-x-1">
              <Globe className="w-3 h-3" />
              <span>{curriculum}</span>
            </Badge>
          </div>
        </div>

        {/* Overview Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Course Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{theoryContent.length}</div>
                <p className="text-gray-600">Theory Lessons</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{solvedExamples.length}</div>
                <p className="text-gray-600">Solved Examples</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {quizQuestions.length + examQuestions.length + shortQuizQuestions.length}
                </div>
                <p className="text-gray-600">Practice Questions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <ContentAccess contentType="theory">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" 
                  onClick={() => navigate(`/subjects/${subjectName}/grades/${gradeName}/curriculums/${curriculumName}/theory`)}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span>Theory Lessons</span>
                </CardTitle>
                <CardDescription>
                  Comprehensive theoretical concepts and explanations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  {theoryContent.length} lessons available
                </p>
                <Button className="w-full">Start Learning</Button>
              </CardContent>
            </Card>
          </ContentAccess>

          <ContentAccess contentType="solved_examples">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate(`/subjects/${subjectName}/grades/${gradeName}/curriculums/${curriculumName}/solved-examples`)}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-green-600" />
                  <span>Solved Examples</span>
                </CardTitle>
                <CardDescription>
                  Step-by-step solutions and worked examples
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  {solvedExamples.length} examples available
                </p>
                <Button className="w-full" variant="outline">View Examples</Button>
              </CardContent>
            </Card>
          </ContentAccess>

          <ContentAccess contentType="quiz">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate(`/subjects/${subjectName}/grades/${gradeName}/curriculums/${curriculumName}/quiz`)}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-orange-600" />
                  <span>Practice Quiz</span>
                </CardTitle>
                <CardDescription>
                  Test your understanding with practice questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  {quizQuestions.length} questions available
                </p>
                <Button className="w-full" variant="outline">Start Quiz</Button>
              </CardContent>
            </Card>
          </ContentAccess>

          <ContentAccess contentType="short_quiz">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-yellow-200"
                  onClick={() => navigate(`/subjects/${subjectName}/grades/${gradeName}/curriculums/${curriculumName}/short-quiz`)}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Timer className="w-5 h-5 text-yellow-600" />
                  <span>Short Tests</span>
                  <Crown className="w-4 h-4 text-yellow-600" />
                </CardTitle>
                <CardDescription>
                  Quick 15-minute assessment tests (Premium)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  {shortQuizQuestions.length} questions available
                </p>
                <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500">
                  Start Test
                </Button>
              </CardContent>
            </Card>
          </ContentAccess>

          <ContentAccess contentType="exam">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-purple-200"
                  onClick={() => navigate(`/subjects/${subjectName}/grades/${gradeName}/curriculums/${curriculumName}/exam`)}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-purple-600" />
                  <span>Full Examination</span>
                  <Crown className="w-4 h-4 text-purple-600" />
                </CardTitle>
                <CardDescription>
                  Comprehensive 60-minute exam simulation (Premium)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  {examQuestions.length} questions available
                </p>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500">
                  Start Exam
                </Button>
              </CardContent>
            </Card>
          </ContentAccess>
        </div>

        {/* Featured Content Preview */}
        {theoryContent.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Featured Theory Content</CardTitle>
              <CardDescription>Preview of available learning materials</CardDescription>
            </CardHeader>
            <CardContent>
              {renderContentSection(theoryContent[0].title, theoryContent[0].content.substring(0, 1000) + '...')}
              <Button onClick={() => navigate(`/subjects/${subjectName}/grades/${gradeName}/curriculums/${curriculumName}/theory`)}>
                Read Complete Lesson
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Standards Alignment */}
        <Card>
          <CardHeader>
            <CardTitle>Common Core Standards Alignment</CardTitle>
            <CardDescription>This curriculum aligns with the following standards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subject === 'Mathematics' && (
                <>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold">1.OA.A.1</h4>
                    <p className="text-sm text-gray-600">Use addition and subtraction within 20 to solve problems</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold">1.NBT.A.1</h4>
                    <p className="text-sm text-gray-600">Count to 120, starting at any number less than 120</p>
                  </div>
                </>
              )}
              {subject === 'English Language Arts' && (
                <>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold">RF.1.2</h4>
                    <p className="text-sm text-gray-600">Demonstrate understanding of spoken words, syllables, and sounds</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold">RF.1.3</h4>
                    <p className="text-sm text-gray-600">Know and apply grade-level phonics and word analysis skills</p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubjectGradeCurriculumPage;
