import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Edit, Trash2, Download } from "lucide-react";
import { Link } from 'react-router-dom';
import GoogleLogin from '../components/GoogleLogin';

const Index = ({ user, onLoginSuccess }) => {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">CSV Grove Manager</h1>
          <p className="text-xl text-gray-600 mb-8">Effortlessly manage and edit your CSV files online</p>
          {user ? (
            <Link to="/app">
              <Button size="lg">Get Started</Button>
            </Link>
          ) : (
            <div className="max-w-xs mx-auto">
              <GoogleLogin onLoginSuccess={onLoginSuccess} onLoginFailure={() => {}} />
            </div>
          )}
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            { title: "Upload CSV", description: "Easily upload your CSV files", icon: <Upload className="h-6 w-6" /> },
            { title: "Edit Data", description: "Modify your data with ease", icon: <Edit className="h-6 w-6" /> },
            { title: "Delete Rows", description: "Remove unwanted information", icon: <Trash2 className="h-6 w-6" /> },
            { title: "Download CSV", description: "Export your edited CSV file", icon: <Download className="h-6 w-6" /> },
          ].map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {feature.icon}
                  <span className="ml-2">{feature.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to manage your CSV files?</h2>
          {user ? (
            <Link to="/app">
              <Button size="lg">Try CSV Grove Manager Now</Button>
            </Link>
          ) : (
            <p className="text-lg text-gray-600">Sign in with Google to get started!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
