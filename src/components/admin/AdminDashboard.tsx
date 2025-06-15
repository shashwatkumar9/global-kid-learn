
import { Card, CardContent } from "@/components/ui/card";
import { Users, Shield, BookOpen, Globe } from "lucide-react";

interface AdminDashboardProps {
  users: any[];
}

const AdminDashboard = ({ users }: AdminDashboardProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Students</p>
              <p className="text-2xl font-bold">{users.filter(u => u.role === 'student').length}</p>
            </div>
            <Users className="h-8 w-8 text-blue-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Active Parents</p>
              <p className="text-2xl font-bold">{users.filter(u => u.role === 'parent').length}</p>
            </div>
            <Shield className="h-8 w-8 text-green-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Course Materials</p>
              <p className="text-2xl font-bold">2,340</p>
            </div>
            <BookOpen className="h-8 w-8 text-purple-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Countries Covered</p>
              <p className="text-2xl font-bold">20</p>
            </div>
            <Globe className="h-8 w-8 text-orange-200" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
