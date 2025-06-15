
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  const popularCountries = [
    "United States", "United Kingdom", "Canada", "Australia", 
    "India", "Singapore", "UAE", "Germany", "France", "South Africa"
  ];

  const popularCurriculums = [
    "A-Levels", "IB Programme", "AP Courses", "GCSE", 
    "CBSE", "ICSE", "Ontario Curriculum", "HSC", "VCE", "NCEA"
  ];

  const popularSubjects = [
    "Mathematics", "Physics", "Chemistry", "Biology", 
    "English", "Computer Science", "Economics", "History"
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <GraduationCap className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                K12Expert
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering students worldwide with comprehensive K-12 education resources, 
              interactive learning materials, and expert guidance across multiple curriculums.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Popular Countries */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Popular Countries</h3>
            <ul className="space-y-2">
              {popularCountries.map((country) => (
                <li key={country}>
                  <a 
                    href={`/country/${country.toLowerCase().replace(/ /g, '-')}`}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {country}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Curriculums */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-400">Popular Curriculums</h3>
            <ul className="space-y-2">
              {popularCurriculums.map((curriculum) => (
                <li key={curriculum}>
                  <a 
                    href={`/curriculum/${curriculum.toLowerCase().replace(/ /g, '-')}`}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {curriculum}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Subjects & Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">Popular Subjects</h3>
            <ul className="space-y-2 mb-6">
              {popularSubjects.map((subject) => (
                <li key={subject}>
                  <a 
                    href={`/subjects/${subject.toLowerCase().replace(/ /g, '-')}`}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {subject}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-sm text-gray-400">Email Us</p>
                <p className="text-white">support@k12expert.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-sm text-gray-400">Call Us</p>
                <p className="text-white">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-sm text-gray-400">Address</p>
                <p className="text-white">Global Education Hub</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <h4 className="font-semibold mb-3 text-blue-400">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="/careers" className="text-gray-300 hover:text-white transition-colors">Careers</a></li>
                <li><a href="/press" className="text-gray-300 hover:text-white transition-colors">Press</a></li>
                <li><a href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-purple-400">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/help" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Support</a></li>
                <li><a href="/tutorials" className="text-gray-300 hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-green-400">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/study-guides" className="text-gray-300 hover:text-white transition-colors">Study Guides</a></li>
                <li><a href="/practice-tests" className="text-gray-300 hover:text-white transition-colors">Practice Tests</a></li>
                <li><a href="/exam-prep" className="text-gray-300 hover:text-white transition-colors">Exam Prep</a></li>
                <li><a href="/resources" className="text-gray-300 hover:text-white transition-colors">All Resources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-orange-400">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="/cookies" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="/disclaimer" className="text-gray-300 hover:text-white transition-colors">Disclaimer</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 K12Expert. All rights reserved. Empowering education worldwide.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-xs text-gray-500">Available in 20+ countries</span>
            <span className="text-xs text-gray-500">50+ curriculums supported</span>
            <span className="text-xs text-gray-500">1000+ subjects covered</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
