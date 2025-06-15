
import { useParams, Link } from 'react-router-dom';

const SubjectPage = () => {
  const { subjectName } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <Link to="/" className="text-xl font-bold text-gray-800">K12Expert</Link>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold capitalize">{subjectName?.replace(/-/g, ' ')}</h1>
        <p className="mt-4 text-lg text-gray-600">
          This is a dedicated page for the subject: {subjectName?.replace(/-/g, ' ')}. Content will be added here soon.
        </p>
      </main>
    </div>
  );
};

export default SubjectPage;
