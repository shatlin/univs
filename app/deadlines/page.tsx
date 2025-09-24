'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, AlertTriangle, Clock, CheckCircle } from 'lucide-react'

export default function DeadlinesPage() {
  const [deadlines, setDeadlines] = useState<any[]>([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchDeadlines()
  }, [])

  const fetchDeadlines = async () => {
    try {
      const res = await fetch('/api/deadlines')
      const data = await res.json()
      setDeadlines(data)
    } catch (error) {
      console.error('Failed to fetch deadlines:', error)
    }
  }

  const getDaysRemaining = (date: string) => {
    const today = new Date()
    const deadline = new Date(date)
    const diffTime = deadline.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getDeadlineColor = (daysRemaining: number) => {
    if (daysRemaining < 0) return 'text-gray-500'
    if (daysRemaining <= 7) return 'text-red-600'
    if (daysRemaining <= 30) return 'text-orange-600'
    if (daysRemaining <= 60) return 'text-yellow-600'
    return 'text-green-600'
  }

  const groupedDeadlines = deadlines.reduce((groups: any, deadline) => {
    const daysRemaining = getDaysRemaining(deadline.date)
    let category = 'upcoming'

    if (daysRemaining < 0) category = 'passed'
    else if (daysRemaining <= 7) category = 'urgent'
    else if (daysRemaining <= 30) category = 'soon'

    if (!groups[category]) groups[category] = []
    groups[category].push({ ...deadline, daysRemaining })
    return groups
  }, {})

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Deadlines</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Track important dates and submission deadlines</p>
      </div>

      {/* Urgent Deadlines Alert */}
      {groupedDeadlines.urgent && groupedDeadlines.urgent.length > 0 && (
        <Card className="mb-6 border-red-200 bg-red-50 dark:bg-red-900/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <CardTitle className="text-red-800 dark:text-red-400">
                Urgent Deadlines - Action Required!
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {groupedDeadlines.urgent.map((deadline: any) => (
                <div key={deadline.id} className="flex items-start justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-semibold">{deadline.title}</p>
                    {deadline.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{deadline.description}</p>
                    )}
                    <p className="text-sm font-medium text-red-600 mt-2">
                      {deadline.daysRemaining === 0 ? 'Due Today!' : `${deadline.daysRemaining} days remaining`}
                    </p>
                  </div>
                  {deadline.critical && <Badge variant="destructive">Critical</Badge>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Deadlines Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Coming Soon (8-30 days) */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-500" />
                Coming Soon
              </CardTitle>
              <Badge variant="secondary">{groupedDeadlines.soon?.length || 0}</Badge>
            </div>
            <CardDescription>8-30 days remaining</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {groupedDeadlines.soon?.map((deadline: any) => (
                <div key={deadline.id} className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  <p className="font-medium text-sm">{deadline.title}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-600">
                      {new Date(deadline.date).toLocaleDateString()}
                    </p>
                    <p className={`text-xs font-medium ${getDeadlineColor(deadline.daysRemaining)}`}>
                      {deadline.daysRemaining} days
                    </p>
                  </div>
                </div>
              )) || <p className="text-sm text-gray-500">No deadlines in this period</p>}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming (31+ days) */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                Upcoming
              </CardTitle>
              <Badge variant="secondary">{groupedDeadlines.upcoming?.length || 0}</Badge>
            </div>
            <CardDescription>More than 30 days away</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {groupedDeadlines.upcoming?.map((deadline: any) => (
                <div key={deadline.id} className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  <p className="font-medium text-sm">{deadline.title}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-600">
                      {new Date(deadline.date).toLocaleDateString()}
                    </p>
                    <p className={`text-xs font-medium ${getDeadlineColor(deadline.daysRemaining)}`}>
                      {deadline.daysRemaining} days
                    </p>
                  </div>
                </div>
              )) || <p className="text-sm text-gray-500">No upcoming deadlines</p>}
            </div>
          </CardContent>
        </Card>

        {/* Passed */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-gray-500" />
                Passed
              </CardTitle>
              <Badge variant="outline">{groupedDeadlines.passed?.length || 0}</Badge>
            </div>
            <CardDescription>Already passed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {groupedDeadlines.passed?.map((deadline: any) => (
                <div key={deadline.id} className="p-3 border rounded-lg opacity-60">
                  <p className="font-medium text-sm line-through">{deadline.title}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-600">
                      {new Date(deadline.date).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {Math.abs(deadline.daysRemaining)} days ago
                    </p>
                  </div>
                </div>
              )) || <p className="text-sm text-gray-500">No passed deadlines</p>}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key UCAS Dates */}
      <Card className="mt-6">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <CardTitle>Key UCAS Dates for 2025 Entry</CardTitle>
          <CardDescription>Important dates for UK university applications</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-2 h-12 bg-red-500 rounded"></div>
                <div>
                  <p className="font-semibold">UCAS Main Deadline</p>
                  <p className="text-sm text-gray-600">January 29, 2025 (18:00 UK time)</p>
                </div>
              </div>
              <Badge variant="destructive">Critical</Badge>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg opacity-60">
              <div className="flex items-center gap-4">
                <div className="w-2 h-12 bg-gray-400 rounded"></div>
                <div>
                  <p className="font-semibold line-through">Oxford & Cambridge Deadline</p>
                  <p className="text-sm text-gray-600">October 15, 2024 (PASSED)</p>
                </div>
              </div>
              <Badge variant="outline">Passed</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}