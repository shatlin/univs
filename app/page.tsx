'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  TrendingUp,
  Clock,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  Target,
  BookOpen,
  Users,
  Globe,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  GraduationCap,
  Send,
  AlertCircle
} from 'lucide-react'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalApplications: 0,
    inProgress: 0,
    submitted: 0,
    offers: 0,
    pendingTodos: 0,
    upcomingDeadlines: 0
  })
  const [recentApplications, setRecentApplications] = useState<any[]>([])
  const [upcomingDeadlines, setUpcomingDeadlines] = useState<any[]>([])
  const [pendingTodos, setPendingTodos] = useState<any[]>([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [appsRes, deadlinesRes, todosRes] = await Promise.all([
        fetch('/api/applications'),
        fetch('/api/deadlines?upcoming=true'),
        fetch('/api/todos?completed=false')
      ])

      const applications = await appsRes.json()
      const deadlines = await deadlinesRes.json()
      const todos = await todosRes.json()

      setRecentApplications(applications.slice(0, 5))
      setUpcomingDeadlines(deadlines.slice(0, 5))
      setPendingTodos(todos.slice(0, 5))

      const stats = {
        totalApplications: applications.length,
        inProgress: applications.filter((a: any) => a.status === 'IN_PROGRESS').length,
        submitted: applications.filter((a: any) => a.status === 'SUBMITTED').length,
        offers: applications.filter((a: any) => a.status === 'OFFER_RECEIVED').length,
        pendingTodos: todos.length,
        upcomingDeadlines: deadlines.length
      }
      setStats(stats)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'IN_PROGRESS': return <Clock className="w-4 h-4" />
      case 'SUBMITTED': return <Send className="w-4 h-4" />
      case 'OFFER_RECEIVED': return <CheckCircle className="w-4 h-4" />
      case 'REJECTED': return <XCircle className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return <AlertTriangle className="w-4 h-4 text-red-500" />
      case 'HIGH': return <ArrowUpRight className="w-4 h-4 text-orange-500" />
      case 'MEDIUM': return <ArrowDownRight className="w-4 h-4 text-yellow-500" />
      default: return <ArrowDownRight className="w-4 h-4 text-gray-400" />
    }
  }

  const mainStats = [
    {
      title: 'Total Applications',
      value: stats.totalApplications,
      icon: GraduationCap,
      bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
      iconBg: 'bg-blue-600/20',
      iconColor: 'text-blue-600',
      change: '+2',
      changeType: 'positive'
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: Clock,
      bgColor: 'bg-gradient-to-br from-amber-500 to-amber-600',
      iconBg: 'bg-amber-600/20',
      iconColor: 'text-amber-600',
      change: '3 active',
      changeType: 'neutral'
    },
    {
      title: 'Submitted',
      value: stats.submitted,
      icon: Send,
      bgColor: 'bg-gradient-to-br from-green-500 to-green-600',
      iconBg: 'bg-green-600/20',
      iconColor: 'text-green-600',
      change: '+1',
      changeType: 'positive'
    },
    {
      title: 'Offers Received',
      value: stats.offers,
      icon: CheckCircle,
      bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600',
      iconBg: 'bg-purple-600/20',
      iconColor: 'text-purple-600',
      change: 'Waiting',
      changeType: 'neutral'
    }
  ]

  const quickActions = [
    { name: 'Add University', icon: BookOpen, href: '/universities', color: 'blue' },
    { name: 'New Application', icon: FileText, href: '/applications', color: 'green' },
    { name: 'Add Task', icon: Target, href: '/todos', color: 'purple' },
    { name: 'Set Deadline', icon: Calendar, href: '/deadlines', color: 'red' }
  ]

  return (
    <div className="p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
          Welcome back, Damien!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Here's your application progress for the 2025 intake
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {mainStats.map((stat) => (
          <Card key={stat.title} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className={`h-2 ${stat.bgColor}`}></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.iconBg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  stat.changeType === 'positive' ? 'bg-green-100 text-green-600' :
                  stat.changeType === 'negative' ? 'bg-red-100 text-red-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-4 mb-8">
        {quickActions.map((action) => (
          <Link key={action.name} href={action.href}>
            <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-${action.color}-100 dark:bg-${action.color}-900/20 group-hover:scale-110 transition-transform`}>
                    <action.icon className={`w-5 h-5 text-${action.color}-600 dark:text-${action.color}-400`} />
                  </div>
                  <span className="font-medium">{action.name}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Applications */}
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Recent Applications</CardTitle>
                <CardDescription>Your latest application updates</CardDescription>
              </div>
              <Link href="/applications">
                <Button size="sm" variant="ghost">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentApplications.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {app.university?.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{app.university?.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{app.university?.courseName}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          {getStatusIcon(app.status)}
                          <span className="text-xs text-gray-600">{app.status.replace(/_/g, ' ')}</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <div className="flex items-center gap-1">
                          {getPriorityIcon(app.priority)}
                          <span className="text-xs text-gray-600">{app.priority}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              ))}
              {recentApplications.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No applications yet</p>
                  <Link href="/universities">
                    <Button size="sm" className="mt-3">Browse Universities</Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Upcoming Deadlines */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-red-500" />
                  Upcoming Deadlines
                </CardTitle>
                <Link href="/deadlines">
                  <Button size="sm" variant="ghost">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {upcomingDeadlines.slice(0, 3).map((deadline) => {
                  const daysLeft = Math.ceil((new Date(deadline.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                  return (
                    <div key={deadline.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className={`mt-1 w-2 h-2 rounded-full ${deadline.critical ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{deadline.title}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {new Date(deadline.date).toLocaleDateString()} • {daysLeft} days left
                        </p>
                      </div>
                    </div>
                  )
                })}
                {upcomingDeadlines.length === 0 && (
                  <p className="text-center text-sm text-gray-500 py-4">No upcoming deadlines</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pending Todos */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-500" />
                  Pending Tasks
                </CardTitle>
                <Link href="/todos">
                  <Button size="sm" variant="ghost">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {pendingTodos.slice(0, 3).map((todo) => (
                  <div key={todo.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="mt-1">
                      {getPriorityIcon(todo.priority)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{todo.title}</p>
                      {todo.dueDate && (
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Due: {new Date(todo.dueDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {todo.category}
                    </Badge>
                  </div>
                ))}
                {pendingTodos.length === 0 && (
                  <p className="text-center text-sm text-gray-500 py-4">No pending tasks</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="mt-6 border-0 shadow-lg">
        <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <CardTitle>Application Journey Progress</CardTitle>
          <CardDescription>Track your progress towards university admission</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Research Phase</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Application Preparation</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '60%'}}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center">
                  <Send className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Submission</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-gray-300 h-2 rounded-full" style={{width: '20%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}