
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
              <Route path="/subjects/:subjectName" element={<SubjectPage />} />
              <Route path="/grades/:gradeName" element={<GradePage />} />
              <Route path="/countries/:countryName" element={<CountryPage />} />
              <Route path="/curriculums/:curriculumName" element={<CurriculumPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SubscriptionProvider>
      </AuthWrapper>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
