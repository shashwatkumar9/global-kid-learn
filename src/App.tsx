
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthWrapper } from "./components/AuthWrapper";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";
import Index from "./pages/Index";
import AdminPanel from "./pages/AdminPanel";
import Auth from "./pages/Auth";
import StudentDashboard from "./pages/StudentDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import Subscription from "./pages/Subscription";
import SubscriptionSuccess from "./pages/SubscriptionSuccess";
import Quiz from "./pages/Quiz";
import Theory from "./pages/Theory";
import SolvedExamples from "./pages/SolvedExamples";
import ShortQuiz from "./pages/ShortQuiz";
import Exam from "./pages/Exam";
import NotFound from "./pages/NotFound";
import SubjectPage from "./pages/SubjectPage";
import GradePage from "./pages/GradePage";
import CountryPage from "./pages/CountryPage";
import CurriculumPage from "./pages/CurriculumPage";
import SubjectGradeCurriculumPage from "./pages/SubjectGradeCurriculumPage";
import SubjectGradeCurriculumTheoryPage from "./pages/SubjectGradeCurriculumTheoryPage";
import SubjectGradeCurriculumQuizPage from "./pages/SubjectGradeCurriculumQuizPage";
// New hierarchical pages
import ContinentPage from "./pages/ContinentPage";
import CountryDetailPage from "./pages/CountryDetailPage";
import CurriculumDetailPage from "./pages/CurriculumDetailPage";
import SubjectDetailPage from "./pages/SubjectDetailPage";
import GradeDetailPage from "./pages/GradeDetailPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthWrapper>
        <SubscriptionProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin-panel" element={<AdminPanel />} />
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/parent-dashboard" element={<ParentDashboard />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/subscription-success" element={<SubscriptionSuccess />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/theory" element={<Theory />} />
              <Route path="/solved-examples" element={<SolvedExamples />} />
              <Route path="/short-quiz" element={<ShortQuiz />} />
              <Route path="/exam" element={<Exam />} />

              {/* Legacy routes for backward compatibility */}
              <Route path="/subjects/:subjectName" element={<SubjectPage />} />
              <Route path="/grades/:gradeName" element={<GradePage />} />
              <Route path="/countries/:countryName" element={<CountryPage />} />
              <Route path="/curriculums/:curriculumName" element={<CurriculumPage />} />

              {/* New hierarchical routes - ORDER MATTERS! Most specific first */}
              {/* 5-level routes: continent/country/curriculum/grade/subject */}
              <Route path="/:continentName/:countryName/:curriculumName/:gradeName/:subjectName" element={<SubjectDetailPage />} />
              
              {/* 4-level routes: continent/country/curriculum/grade OR continent/country/curriculum/subject */}
              <Route path="/:continentName/:countryName/:curriculumName/:gradeOrSubjectName" element={<GradeDetailPage />} />
              
              {/* 3-level routes: continent/country/curriculum */}
              <Route path="/:continentName/:countryName/:curriculumName" element={<CurriculumDetailPage />} />
              
              {/* 2-level routes: continent/country */}
              <Route path="/:continentName/:countryName" element={<CountryDetailPage />} />
              
              {/* 1-level routes: continent */}
              <Route path="/:continentName" element={<ContinentPage />} />

              {/* Comprehensive subject-grade-curriculum routes for backward compatibility */}
              <Route path="/subjects/:subjectName/grades/:gradeName/curriculums/:curriculumName" element={<SubjectGradeCurriculumPage />} />
              <Route path="/subjects/:subjectName/grades/:gradeName/curriculums/:curriculumName/theory" element={<SubjectGradeCurriculumTheoryPage />} />
              <Route path="/subjects/:subjectName/grades/:gradeName/curriculums/:curriculumName/quiz" element={<SubjectGradeCurriculumQuizPage />} />
              <Route path="/subjects/:subjectName/grades/:gradeName/curriculums/:curriculumName/solved-examples" element={<SubjectGradeCurriculumTheoryPage />} />
              <Route path="/subjects/:subjectName/grades/:gradeName/curriculums/:curriculumName/short-quiz" element={<SubjectGradeCurriculumQuizPage />} />
              <Route path="/subjects/:subjectName/grades/:gradeName/curriculums/:curriculumName/exam" element={<SubjectGradeCurriculumQuizPage />} />
              
              {/* Catch-all route MUST be last */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SubscriptionProvider>
      </AuthWrapper>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
