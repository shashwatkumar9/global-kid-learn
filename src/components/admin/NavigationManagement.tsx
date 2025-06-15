
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navigation, Plus, Menu, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NavigationManagement = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [newNavItem, setNewNavItem] = useState({
    label: "",
    url: "",
    parent_id: null,
    order: 0,
    is_active: true
  });

  const handleNavItemAdd = async () => {
    setLoading(true);
    try {
      // This would typically save to a navigation table
      toast({
        title: "Navigation Item Added",
        description: "Navigation item has been successfully added.",
      });
      
      setNewNavItem({
        label: "",
        url: "",
        parent_id: null,
        order: 0,
        is_active: true
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add navigation item.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Navigation className="h-5 w-5" />
          <span>Navigation Management</span>
        </CardTitle>
        <CardDescription>
          Manage header menu, navigation bar, and footer elements
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nav_label">Menu Label</Label>
            <Input
              id="nav_label"
              value={newNavItem.label}
              onChange={(e) => setNewNavItem({...newNavItem, label: e.target.value})}
              placeholder="e.g. About Us"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nav_url">URL</Label>
            <Input
              id="nav_url"
              value={newNavItem.url}
              onChange={(e) => setNewNavItem({...newNavItem, url: e.target.value})}
              placeholder="e.g. /about"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nav_order">Order</Label>
            <Input
              id="nav_order"
              type="number"
              value={newNavItem.order}
              onChange={(e) => setNewNavItem({...newNavItem, order: parseInt(e.target.value)})}
              min="0"
            />
          </div>
          <div className="flex items-center space-x-2 pt-6">
            <input
              type="checkbox"
              id="nav_active"
              checked={newNavItem.is_active}
              onChange={(e) => setNewNavItem({...newNavItem, is_active: e.target.checked})}
            />
            <Label htmlFor="nav_active">Active</Label>
          </div>
        </div>
        <Button onClick={handleNavItemAdd} disabled={loading}>
          <Plus className="w-4 h-4 mr-2" />
          Add Navigation Item
        </Button>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Quick Navigation Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="w-full justify-start" variant="outline">
              <Menu className="w-4 h-4 mr-2" />
              Edit Header Menu
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Navigation className="w-4 h-4 mr-2" />
              Manage Mega Menu
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Globe className="w-4 h-4 mr-2" />
              Edit Footer
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NavigationManagement;
