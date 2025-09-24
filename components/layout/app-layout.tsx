'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  GraduationCap,
  FileText,
  CheckSquare,
  Calendar,
  Menu,
  X,
  Bell,
  Search,
  User,
  ChevronDown,
  BookOpen,
  Target,
  TrendingUp,
  Clock,
  AlertCircle,
  Globe,
  MapPin
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Failed to fetch stats:', err))
  }, [])

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'My Profile', href: '/profile', icon: User },
    { name: 'Universities', href: '/universities', icon: GraduationCap, badge: stats?.totalUniversities },
    { name: 'Applications', href: '/applications', icon: FileText, badge: stats?.totalApplications },
    { name: 'Todo List', href: '/todos', icon: CheckSquare, badge: stats?.activeTodos },
    { name: 'Deadlines', href: '/deadlines', icon: Calendar, badge: stats?.urgentDeadlines, badgeColor: stats?.urgentDeadlines > 0 ? 'destructive' : null },
  ]



  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true
    if (href !== '/' && pathname.startsWith(href)) return true
    return false
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                UniTracker
              </span>
            </div>
          </div>

          {/* Center Section - Search */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="search"
                placeholder="Search universities, applications, or tasks..."
                className="pl-10 pr-4 py-2 w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden md:block text-sm font-medium">Damien</span>
                  <ChevronDown size={16} className="hidden md:block" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                <DropdownMenuItem>Application Preferences</DropdownMenuItem>
                <DropdownMenuItem>Notifications</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'w-64' : 'w-0'
          } transition-all duration-300 fixed left-0 top-16 bottom-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 overflow-hidden z-40`}
        >
          <div className="flex flex-col h-full">
            {/* Navigation Links */}
            <nav className="flex-1 px-4 py-6 space-y-1">
              <div className="mb-4">
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Main Menu
                </h3>
              </div>
              {navigation.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all ${
                      active
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={18} />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    {item.badge > 0 && (
                      <Badge
                        variant={item.badgeColor as any || (active ? 'secondary' : 'default')}
                        className={active ? 'bg-white/20 text-white border-white/30' : ''}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                )
              })}

              {/* Top Countries Section */}
              {stats?.topCountries && stats.topCountries.length > 0 && (
                <>
                  <div className="mt-8 mb-4">
                    <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Top Countries
                    </h3>
                  </div>
                  {stats.topCountries.map((country: any) => (
                    <Link
                      key={country.name}
                      href={`/universities?country=${country.name}`}
                      className="w-full flex items-center justify-between px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{country.flag || '🌍'}</span>
                        <span className="text-sm">{country.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {country.count}
                      </Badge>
                    </Link>
                  ))}
                </>
              )}
            </nav>

            {/* Application Progress */}
            {stats && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Application Progress
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Universities</span>
                    <span className="text-sm font-semibold">{stats.totalUniversities || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Active Applications</span>
                    <span className="text-sm font-semibold">{stats.totalApplications || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Pending Tasks</span>
                    <span className="text-sm font-semibold">{stats.activeTodos || 0}</span>
                  </div>
                  {stats.urgentDeadlines > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Urgent Deadlines</span>
                      <Badge variant="destructive" className="text-xs">
                        {stats.urgentDeadlines}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          <div className="min-h-screen">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}