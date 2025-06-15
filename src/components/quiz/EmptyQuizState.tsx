
import { Card, CardContent } from "@/components/ui/card";

export const EmptyQuizState = () => {
  return (
    <Card>
      <CardContent className="text-center py-12">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Quiz Questions Available</h3>
        <p className="text-gray-500">Quiz questions for this combination are coming soon.</p>
      </CardContent>
    </Card>
  );
};
