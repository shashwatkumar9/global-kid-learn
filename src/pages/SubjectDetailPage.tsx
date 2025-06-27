
import { useParams, Link } from 'react-router-dom';
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Users, Target } from "lucide-react";

const SubjectDetailPage = () => {
  const { continentName, countryName, curriculumName, subjectName } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={null} profile={null} onDashboardNavigation={() => {}} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/${continentName}`}>{continentName?.replace(/-/g, ' ')}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/${continentName}/${countryName}`}>{countryName?.replace(/-/g, ' ')}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/${continentName}/${countryName}/${curriculumName}`}>{curriculumName?.replace(/-/g, ' ')}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{subjectName?.replace(/-/g, ' ')}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 capitalize">{subjectName?.replace(/-/g, ' ')}</h1>
          <p className="text-lg text-gray-600">
            {curriculumName?.replace(/-/g, ' ')} curriculum • {countryName?.replace(/-/g, ' ')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Content Types */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Available Content</h2>
            <div className="grid gap-6">
              <Card className="border-l-4 border-l-blue-600">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                    Theory & Concepts
                  </CardTitle>
                  <CardDescription>
                    Comprehensive lessons and theoretical foundations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">Coming Soon</h4>
                    <p className="text-yellow-700 text-sm">
                      Interactive theory lessons, video explanations, and concept guides are being developed for this subject.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-600">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2 text-green-600" />
                    Practice Questions
                  </CardTitle>
                  <CardDescription>
                    Interactive quizzes and practice problems
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">Coming Soon</h4>
                    <p className="text-yellow-700 text-sm">
                      Adaptive quizzes, instant feedback, and progress tracking will be available soon.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-600">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-purple-600" />
                    Timed Assessments
                  </CardTitle>
                  <CardDescription>
                    Full-length exams and short tests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">Coming Soon</h4>
                    <p className="text-yellow-700 text-sm">
                      Exam simulations and timed practice tests to help you prepare for real assessments.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Subject Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Curriculum</h4>
                  <Badge variant="outline" className="capitalize">
                    {curriculumName?.replace(/-/g, ' ')}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Country</h4>
                  <Badge variant="outline" className="capitalize">
                    {countryName?.replace(/-/g, ' ')}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Region</h4>
                  <Badge variant="outline" className="capitalize">
                    {continentName?.replace(/-/g, ' ')}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Get Notified
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Be the first to know when content for this subject becomes available.
                </p>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Notify Me
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SubjectDetailPage;
