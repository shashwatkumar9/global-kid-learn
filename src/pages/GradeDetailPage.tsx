
import { useParams, Link } from 'react-router-dom';
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, BookOpen, Users, Calendar } from "lucide-react";

const GradeDetailPage = () => {
  const { continentName, countryName, curriculumName, gradeName } = useParams();

  // Mock subjects for grade level
  const mockSubjects = [
    "Mathematics", "English Language Arts", "Science", "Social Studies", 
    "Physical Education", "Arts", "Music", "Foreign Language"
  ];

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
              <BreadcrumbPage>{gradeName?.replace(/-/g, ' ')}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 capitalize">{gradeName?.replace(/-/g, ' ')}</h1>
          <p className="text-lg text-gray-600">
            {curriculumName?.replace(/-/g, ' ')} curriculum • {countryName?.replace(/-/g, ' ')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Subjects for this grade */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
              Subjects for {gradeName?.replace(/-/g, ' ')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockSubjects.map((subject) => (
                <Card key={subject} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{subject}</CardTitle>
                    <CardDescription>
                      Curriculum content for {gradeName?.replace(/-/g, ' ')} level
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-yellow-700 text-sm">
                          Content for {subject} at {gradeName?.replace(/-/g, ' ')} level is being developed.
                        </p>
                      </div>
                      <Link 
                        to={`/${continentName}/${countryName}/${curriculumName}/${gradeName}/${subject.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                        className="block bg-blue-600 text-white px-3 py-2 rounded text-center text-sm hover:bg-blue-700 transition-colors"
                      >
                        View {subject}
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Grade Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Grade Level</h4>
                  <Badge variant="default" className="capitalize">
                    {gradeName?.replace(/-/g, ' ')}
                  </Badge>
                </div>
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
                  <h4 className="font-semibold mb-2">Subjects Available</h4>
                  <Badge variant="secondary">
                    {mockSubjects.length} subjects
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Development Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Content for this grade level is currently in development. Check back soon for updates!
                </p>
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Get Updates
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

export default GradeDetailPage;
