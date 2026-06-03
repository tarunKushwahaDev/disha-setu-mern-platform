import Link from 'next/link';
import { Map, GraduationCap, Users, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-sidebar text-sidebar-foreground border-t border-sidebar-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
                <span className="text-sidebar-primary-foreground font-bold text-lg">D</span>
              </div>
              <span className="font-bold text-xl">
                Disha<span className="text-sidebar-primary">Setu</span>
              </span>
            </Link>
            <p className="text-sm text-sidebar-foreground/70 leading-relaxed">
              Empowering first-generation learners with career guidance, scholarships, 
              and mentorship to build their path to success.
            </p>
            <div className="text-xs text-sidebar-foreground/50">
              Developed by Team Vinayak for SahAl for Shiksha HACKATHON 2026
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/career"
                  className="flex items-center gap-2 text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
                >
                  <Map className="w-4 h-4" />
                  Career Mapping
                </Link>
              </li>
              <li>
                <Link
                  href="/scholarships"
                  className="flex items-center gap-2 text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
                >
                  <GraduationCap className="w-4 h-4" />
                  Scholarships
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="flex items-center gap-2 text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
                >
                  <Users className="w-4 h-4" />
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-sidebar-foreground/70">
              <li>
                <Link href="#" className="hover:text-sidebar-foreground transition-colors">
                  Government Schemes
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-sidebar-foreground transition-colors">
                  Skill Development Centers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-sidebar-foreground transition-colors">
                  Career Guides
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-sidebar-foreground transition-colors">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-sidebar-foreground/70">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                support@dishasetu.in
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                1800-XXX-XXXX (Toll Free)
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Ministry of Skill Development, New Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-sidebar-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-sidebar-foreground/50">
            &copy; {new Date().getFullYear()} DishaSetu. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-sidebar-foreground/50">
            <Link href="#" className="hover:text-sidebar-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-sidebar-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-sidebar-foreground transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
