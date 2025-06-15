
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { ContentAccess } from "@/components/ContentAccess";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Clock, User } from "lucide-react";

const SubjectGradeCurriculumTheoryPage = () => {
  const { subjectName, gradeName, curriculumName } = useParams();
  const navigate = useNavigate();
  const [theoryContent, setTheoryContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const formatName = (name: string | undefined) => 
    name?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || '';

  const subject = formatName(subjectName);
  const grade = formatName(gradeName);
  const curriculum = formatName(curriculumName);

  useEffect(() => {
    loadTheoryContent();
  }, [subjectName, gradeName, curriculumName]);

  const loadTheoryContent = async () => {
    try {
      const { data } = await supabase
        .from('educational_content')
        .select('*')
        .eq('subject', subject)
        .eq('grade', grade)
        .eq('curriculum', curriculum)
        .eq('content_type', 'theory')
        .order('created_at', { ascending: true });

      setTheoryContent(data || []);
    } catch (error) {
      console.error('Error loading theory content:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => (
      <div key={index} className="mb-4">
        {paragraph.startsWith('**') && paragraph.endsWith('**') ? (
          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
            {paragraph.slice(2, -2)}
          </h3>
        ) : paragraph.startsWith('- ') ? (
          <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
            {paragraph.split('\n').filter(item => item.trim()).map((item, idx) => (
              <li key={idx} className="leading-relaxed">{item.slice(2)}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700 leading-relaxed text-lg">{paragraph}</p>
        )}
      </div>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading theory content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(`/subjects/${subjectName}/grades/${gradeName}/curriculums/${curriculumName}`)} 
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Course</span>
          </Button>
        </div>

        <ContentAccess contentType="theory">
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                {subject} Theory - {grade}
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Comprehensive theoretical concepts following {curriculum} standards
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <BookOpen className="w-3 h-3" />
                  <span>{curriculum}</span>
                </Badge>
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <User className="w-3 h-3" />
                  <span>{grade} Level</span>
                </Badge>
              </div>
            </div>

            {theoryContent.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No Theory Content Available</h3>
                  <p className="text-gray-500">Theory content for this combination is coming soon.</p>
                </CardContent>
              </Card>
            ) : (
              theoryContent.map((content, index) => (
                <Card key={content.id} className="mb-8">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl">{content.title}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant={content.is_premium ? "default" : "secondary"}>
                          {content.is_premium ? "Premium" : "Free"}
                        </Badge>
                        <Badge variant="outline" className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>15-20 min read</span>
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-lg max-w-none">
                      {renderContent(content.content)}
                    </div>
                    
                    <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2">Key Takeaways:</h4>
                      <ul className="list-disc list-inside text-blue-700 space-y-1">
                        <li>Fundamental concepts clearly explained with examples</li>
                        <li>Aligned with {curriculum} standards for {grade}</li>
                        <li>Practical applications for real-world understanding</li>
                        <li>Foundation for advanced mathematical/linguistic concepts</li>
                      </ul>
                    </div>

                    <div className="mt-6 flex space-x-4">
                      <Button 
                        onClick={() => navigate(`/subjects/${subjectName}/grades/${gradeName}/curriculums/${curriculumName}/quiz`)}
                        className="flex-1"
                      >
                        Practice with Quiz
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => navigate(`/subjects/${subjectName}/grades/${gradeName}/curriculums/${curriculumName}/solved-examples`)}
                        className="flex-1"
                      >
                        View Examples
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </ContentAccess>
      </div>
    </div>
  );
};

export default SubjectGradeCurriculumTheoryPage;
