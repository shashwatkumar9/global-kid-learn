
import { useParams, Link } from 'react-router-dom';
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { continentData } from "@/data/continentData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { BookOpen, GraduationCap, Calculator, FileText } from "lucide-react";

const CurriculumDetailPage = () => {
  const { continentName, countryName, curriculumName } = useParams();
  
  const continentKey = Object.keys(continentData).find(
    key => key.toLowerCase().replace(/[^a-z0-9]/g, '-') === continentName
  );
  
  const continent = continentKey ? continentData[continentKey as keyof typeof continentData] : null;
  const country = continent?.countries.find(
    c => c.name.toLowerCase().replace(/[^a-z0-9]/g, '-') === countryName
  );
  const curriculum = country?.curriculums.find(
    c => c.name.toLowerCase().replace(/[^a-z0-9]/g, '-') === curriculumName
  );

  if (!curriculum || !country || !continent) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header user={null} profile={null} onDashboardNavigation={() => {}} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-center">Curriculum Not Found</h1>
          <p className="text-center mt-4">
            <Link to="/" className="text-blue-600 hover:underline">Return to Home</Link>
          </p>
        </main>
        <Footer />
      </div>
    );
  }

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
                <Link to={`/${continentName}`}>{continentKey}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/${continentName}/${countryName}`}>{country.name}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{curriculum.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{curriculum.name}</h1>
          <p className="text-lg text-gray-600">
            {country.name} - {curriculum.subjects.length} subjects across {curriculum.grades.length} grade levels
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Subjects Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
              Subjects
            </h2>
            <div className="grid gap-4">
              {curriculum.subjects.map((subject) => (
                <Card key={subject} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{subject}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2">
                      <Link 
                        to={`/${continentName}/${countryName}/${curriculumName}/${subject.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-center text-sm hover:bg-blue-700 transition-colors"
                      >
                        View Subject
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Grades Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <GraduationCap className="w-6 h-6 mr-2 text-green-600" />
              Grade Levels
            </h2>
            <div className="grid gap-4">
              {curriculum.grades.map((grade) => (
                <Card key={grade} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{grade}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2">
                      <Link 
                        to={`/${continentName}/${countryName}/${curriculumName}/${grade.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                        className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-center text-sm hover:bg-green-700 transition-colors"
                      >
                        View Grade
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Coming Soon</h3>
          <p className="text-gray-600 mb-6">
            Detailed curriculum content, interactive lessons, and assessment tools are being developed.
          </p>
          <div className="flex justify-center space-x-4">
            <Badge variant="outline" className="px-4 py-2">
              <Calculator className="w-4 h-4 mr-2" />
              Interactive Quizzes
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <FileText className="w-4 h-4 mr-2" />
              Lesson Plans
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <BookOpen className="w-4 h-4 mr-2" />
              Study Materials
            </Badge>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CurriculumDetailPage;
