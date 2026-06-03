'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Map,
  GraduationCap,
  Users,
  LayoutDashboard,
  Menu,
  X,
  LogIn,
} from 'lucide-react';
import { LanguageSelector } from './language-selector';
import { ConnectivityBadge } from './connectivity-badge';
import { useTranslation } from '@/hooks/use-translation';
import { useAppStore } from '@/lib/store/app-store';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', labelKey: 'nav.home', icon: Home },
  { href: '/career', labelKey: 'nav.career', icon: Map },
  { href: '/scholarships', labelKey: 'nav.scholarships', icon: GraduationCap },
  { href: '/community', labelKey: 'nav.community', icon: Users },
  { href: '/dashboard', labelKey: 'nav.dashboard', icon: LayoutDashboard },
];

export function Header() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const sidebarOpen = useAppStore((state) => state.sidebarOpen);
  const setSidebarOpen = useAppStore((state) => state.setSidebarOpen);
  const user = useAppStore((state) => state.user);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">D</span>
            </div>
            <span className="font-bold text-xl text-foreground">
              Disha<span className="text-primary">Setu</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {t(item.labelKey)}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <ConnectivityBadge />
            </div>
            <LanguageSelector />
            
            {!user && (
              <Link
                href="/login"
                className={cn(
                  'hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg',
                  'bg-primary text-primary-foreground',
                  'hover:bg-primary/90 transition-colors',
                  'text-sm font-medium'
                )}
              >
                <LogIn className="w-4 h-4" />
                {t('nav.login')}
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
            >
              {sidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {sidebarOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {t(item.labelKey)}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-border">
              <div className="sm:hidden mb-4">
                <ConnectivityBadge />
              </div>
              {!user && (
                <Link
                  href="/login"
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg',
                    'bg-primary text-primary-foreground',
                    'hover:bg-primary/90 transition-colors',
                    'text-sm font-medium'
                  )}
                >
                  <LogIn className="w-5 h-5" />
                  {t('nav.login')}
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
