'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'

const applicationStatuses = [
  'NOT_STARTED',
  'IN_PROGRESS',
  'SUBMITTED',
  'UNDER_REVIEW',
  'INTERVIEW_SCHEDULED',
  'OFFER_RECEIVED',
  'OFFER_ACCEPTED',
  'OFFER_DECLINED',
  'REJECTED',
  'WITHDRAWN'
]

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([])
  const [filteredApplications, setFilteredApplications] = useState<any[]>([])
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')

  useEffect(() => {
    fetchApplications()
  }, [])

  useEffect(() => {
    filterApplications()
  }, [statusFilter, priorityFilter, applications])

  const fetchApplications = async () => {
    try {
      const res = await fetch('/api/applications')
      const data = await res.json()
      setApplications(data)
      setFilteredApplications(data)
    } catch (error) {
      console.error('Failed to fetch applications:', error)
    }
  }

  const filterApplications = () => {
    let filtered = applications

    if (statusFilter !== 'all') {
      filtered = filtered.filter(a => a.status === statusFilter)
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(a => a.priority === priorityFilter)
    }

    setFilteredApplications(filtered)
  }

  const updateApplicationStatus = async (applicationId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/applications/${applicationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (res.ok) {
        await fetchApplications()
      }
    } catch (error) {
      console.error('Failed to update application status:', error)
    }
  }

  const getStatusColor = (status: string) => {
    const colors: any = {
      'NOT_STARTED': 'default',
      'IN_PROGRESS': 'secondary',
      'SUBMITTED': 'outline',
      'UNDER_REVIEW': 'outline',
      'INTERVIEW_SCHEDULED': 'secondary',
      'OFFER_RECEIVED': 'default',
      'OFFER_ACCEPTED': 'default',
      'OFFER_DECLINED': 'destructive',
      'REJECTED': 'destructive',
      'WITHDRAWN': 'destructive'
    }
    return colors[status] || 'default'
  }

  const getPriorityColor = (priority: string) => {
    const colors: any = {
      'CRITICAL': 'destructive',
      'HIGH': 'destructive',
      'MEDIUM': 'secondary',
      'LOW': 'default'
    }
    return colors[priority] || 'default'
  }

  const groupApplicationsByStatus = () => {
    const groups: any = {
      active: [],
      submitted: [],
      offers: [],
      closed: []
    }

    filteredApplications.forEach(app => {
      if (['NOT_STARTED', 'IN_PROGRESS', 'INTERVIEW_SCHEDULED'].includes(app.status)) {
        groups.active.push(app)
      } else if (['SUBMITTED', 'UNDER_REVIEW'].includes(app.status)) {
        groups.submitted.push(app)
      } else if (['OFFER_RECEIVED', 'OFFER_ACCEPTED'].includes(app.status)) {
        groups.offers.push(app)
      } else {
        groups.closed.push(app)
      }
    })

    return groups
  }

  const groups = groupApplicationsByStatus()

  const ApplicationCard = ({ application }: { application: any }) => (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{application.university?.name}</CardTitle>
            <CardDescription>{application.university?.courseName}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge variant={getStatusColor(application.status)}>
              {application.status.replace(/_/g, ' ')}
            </Badge>
            <Badge variant={getPriorityColor(application.priority)}>
              {application.priority}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="text-sm space-y-1">
            {application.deadline && (
              <p><strong>Deadline:</strong> {new Date(application.deadline).toLocaleDateString()}</p>
            )}
            {application.applicationDate && (
              <p><strong>Applied:</strong> {new Date(application.applicationDate).toLocaleDateString()}</p>
            )}
            <p><strong>Location:</strong> {application.university?.location}, {application.university?.country}</p>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span>Documents:</span>
            <Badge variant={application.transcriptStatus === 'SUBMITTED' ? 'default' : 'outline'}>
              Transcript
            </Badge>
            <Badge variant={application.ieltsStatus === 'SUBMITTED' ? 'default' : 'outline'}>
              IELTS
            </Badge>
            <Badge variant={application.reference1Status === 'SUBMITTED' ? 'default' : 'outline'}>
              Ref 1
            </Badge>
            <Badge variant={application.reference2Status === 'SUBMITTED' ? 'default' : 'outline'}>
              Ref 2
            </Badge>
          </div>

          {application.todos && application.todos.length > 0 && (
            <div className="text-sm">
              <p className="text-muted-foreground">
                {application.todos.length} pending task{application.todos.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Link href={`/applications/${application.id}`}>
              <Button size="sm">View Details</Button>
            </Link>
            <Select
              value={application.status}
              onValueChange={(value) => updateApplicationStatus(application.id, value)}
            >
              <SelectTrigger className="w-40 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {applicationStatuses.map(status => (
                  <SelectItem key={status} value={status}>
                    {status.replace(/_/g, ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Application Tracker</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Monitor and manage your university applications</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {applicationStatuses.map(status => (
              <SelectItem key={status} value={status}>
                {status.replace(/_/g, ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="CRITICAL">Critical</SelectItem>
            <SelectItem value="HIGH">High</SelectItem>
            <SelectItem value="MEDIUM">Medium</SelectItem>
            <SelectItem value="LOW">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">
            Active ({groups.active.length})
          </TabsTrigger>
          <TabsTrigger value="submitted">
            Submitted ({groups.submitted.length})
          </TabsTrigger>
          <TabsTrigger value="offers">
            Offers ({groups.offers.length})
          </TabsTrigger>
          <TabsTrigger value="closed">
            Closed ({groups.closed.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {groups.active.map((app: any) => (
              <ApplicationCard key={app.id} application={app} />
            ))}
          </div>
          {groups.active.length === 0 && (
            <p className="text-center text-gray-500 py-8">No active applications</p>
          )}
        </TabsContent>

        <TabsContent value="submitted" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {groups.submitted.map((app: any) => (
              <ApplicationCard key={app.id} application={app} />
            ))}
          </div>
          {groups.submitted.length === 0 && (
            <p className="text-center text-gray-500 py-8">No submitted applications</p>
          )}
        </TabsContent>

        <TabsContent value="offers" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {groups.offers.map((app: any) => (
              <ApplicationCard key={app.id} application={app} />
            ))}
          </div>
          {groups.offers.length === 0 && (
            <p className="text-center text-gray-500 py-8">No offers received yet</p>
          )}
        </TabsContent>

        <TabsContent value="closed" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {groups.closed.map((app: any) => (
              <ApplicationCard key={app.id} application={app} />
            ))}
          </div>
          {groups.closed.length === 0 && (
            <p className="text-center text-gray-500 py-8">No closed applications</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}