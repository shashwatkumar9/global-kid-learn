
import { useParams, Link } from 'react-router-dom';
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { continentData } from "@/data/continentData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { BookOpen, GraduationCap, Users } from "lucide-react";

const CountryDetailPage = () => {
  const { continentName, countryName } = useParams();
  
  const continentKey = Object.keys(continentData).find(
    key => key.toLowerCase().replace(/[^a-z0-9]/g, '-') === continentName
  );
  
  const continent = continentKey ? continentData[continentKey as keyof typeof continentData] : null;
  const country = continent?.countries.find(
    c => c.name.toLowerCase().replace(/[^a-z0-9]/g, '-') === countryName
  );

  if (!country || !continent) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header user={null} profile={null} onDashboardNavigation={() => {}} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-center">Country Not Found</h1>
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
              <BreadcrumbPage>{country.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{country.name}</h1>
          <p className="text-lg text-gray-600">
            Educational curriculums and programs available in {country.name}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {country.curriculums.map((curriculum) => (
            <Card key={curriculum.name} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-8 h-8 text-blue-600" />
                    <div>
                      <CardTitle>{curriculum.name}</CardTitle>
                      <CardDescription>
                        {curriculum.subjects.length} subjects • {curriculum.grades.length} grade levels
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Subjects</h4>
                    <div className="flex flex-wrap gap-1">
                      {curriculum.subjects.slice(0, 4).map((subject) => (
                        <Badge key={subject} variant="secondary" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                      {curriculum.subjects.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{curriculum.subjects.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Grade Levels</h4>
                    <div className="flex flex-wrap gap-1">
                      {curriculum.grades.slice(0, 6).map((grade) => (
                        <Badge key={grade} variant="outline" className="text-xs">
                          {grade}
                        </Badge>
                      ))}
                      {curriculum.grades.length > 6 && (
                        <Badge variant="outline" className="text-xs">
                          +{curriculum.grades.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Link 
                    to={`/${continentName}/${countryName}/${curriculum.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full justify-center mt-4"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Explore {curriculum.name}</span>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CountryDetailPage;
