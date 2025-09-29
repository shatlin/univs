'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import {
  GraduationCap, MapPin, Globe, Trophy, DollarSign, Calendar,
  FileText, Target, Briefcase, Home, AlertTriangle, CheckCircle,
  Clock, Users, BookOpen, TrendingUp, Building, Star, Save, Plus, Trash2
} from 'lucide-react'
import Link from 'next/link'

interface UniversityNote {
  id: string
  content: string
  createdAt: string
  updatedAt: string
}

interface UniversityDetail {
  id: string
  name: string
  country?: {
    name: string
    flag?: string
    code: string
  }
  countryId?: string
  location?: string
  ranking?: number
  tier?: string
  category?: string
  website?: string
  isFavorite?: boolean

  // Entry requirements
  entryRequirements?: string
  ibRequirement?: string
  aLevelRequirement?: string
  mathsRequirement?: string
  ieltsRequired?: number

  // Admission tests
  admissionTest?: string
  testDeadline?: string

  // Key dates
  applicationDeadline?: string
  decisionDate?: string

  // Financial
  tuitionFee?: number
  livingCosts?: number

  // Career prospects
  employmentRate?: number
  averageSalary?: number
  majorRecruiters?: string
  industryLinks?: string
  researchAreas?: string

  // Campus info
  accommodation?: string
  campusInfo?: string

  // UCAS
  ucasCode?: string
  courseName?: string
  notes?: string

  // User's personal notes
  userNotes?: string

  // Relations
  applications?: any[]
  courses?: any[]
  testRequirements?: any[]
  keyDates?: any[]
  universityNotes?: UniversityNote[]
}

export default function UniversityDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [university, setUniversity] = useState<UniversityDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [userNotes, setUserNotes] = useState('')
  const [isSavingNotes, setIsSavingNotes] = useState(false)
  const [newTimelineNote, setNewTimelineNote] = useState('')

  useEffect(() => {
    if (params.id) {
      fetchUniversity(params.id as string)
    }
  }, [params.id])

  const fetchUniversity = async (id: string) => {
    try {
      const res = await fetch(`/api/universities/${id}`)
      if (!res.ok) throw new Error('Failed to fetch university')
      const data = await res.json()
      setUniversity(data)
      setUserNotes(data.userNotes || '')
    } catch (error) {
      console.error('Error fetching university:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveUserNotes = async () => {
    if (!university) return
    setIsSavingNotes(true)
    try {
      const res = await fetch(`/api/universities/${university.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userNotes })
      })
      if (res.ok) {
        const updated = await res.json()
        setUniversity(updated)
        // Show success feedback
        setTimeout(() => setIsSavingNotes(false), 1000)
      } else {
        setIsSavingNotes(false)
      }
    } catch (error) {
      console.error('Error saving notes:', error)
      setIsSavingNotes(false)
    }
  }

  const addTimelineNote = async () => {
    if (!university || !newTimelineNote.trim()) return
    try {
      const res = await fetch(`/api/universities/${university.id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newTimelineNote })
      })
      if (res.ok) {
        const note = await res.json()
        setUniversity(prev => prev ? {
          ...prev,
          universityNotes: [note, ...(prev.universityNotes || [])]
        } : null)
        setNewTimelineNote('')
      }
    } catch (error) {
      console.error('Error adding note:', error)
    }
  }

  const toggleFavorite = async () => {
    if (!university) return
    try {
      const res = await fetch(`/api/universities/${university.id}/favorite`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      })
      if (res.ok) {
        const updated = await res.json()
        setUniversity(updated)
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }


  const deleteNote = async (noteId: string) => {
    if (!university || !confirm('Are you sure you want to delete this note?')) return
    try {
      const res = await fetch(`/api/universities/${university.id}/notes?noteId=${noteId}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        setUniversity(prev => prev ? {
          ...prev,
          universityNotes: prev.universityNotes?.filter(n => n.id !== noteId)
        } : null)
      }
    } catch (error) {
      console.error('Error deleting note:', error)
    }
  }

  const getCategoryColor = (category?: string) => {
    if (!category) return 'default'
    switch (category.toLowerCase()) {
      case 'reach': return 'destructive'
      case 'match': return 'secondary'
      case 'safety': return 'default'
      default: return 'default'
    }
  }

  const getTierBadge = (tier?: string) => {
    if (!tier) return null
    const tierColors: any = {
      'elite': 'bg-purple-500 text-white',
      'tier 1': 'bg-purple-500 text-white',
      'tier a': 'bg-blue-500 text-white',
      'tier 2': 'bg-green-500 text-white',
      'tier 3': 'bg-yellow-500 text-white',
      'tier 4': 'bg-gray-500 text-white'
    }
    return (
      <Badge className={tierColors[tier.toLowerCase()] || 'bg-gray-500 text-white'}>
        {tier}
      </Badge>
    )
  }

  const getApplicationProgress = () => {
    if (!university?.applications || university.applications.length === 0) return 0
    const app = university.applications[0]
    const statusProgress: any = {
      'NOT_STARTED': 0,
      'IN_PROGRESS': 25,
      'SUBMITTED': 50,
      'UNDER_REVIEW': 60,
      'INTERVIEW_SCHEDULED': 75,
      'OFFER_RECEIVED': 90,
      'OFFER_ACCEPTED': 100,
      'OFFER_DECLINED': 100,
      'REJECTED': 100,
      'WITHDRAWN': 100
    }
    return statusProgress[app.status] || 0
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg">Loading university details...</div>
      </div>
    )
  }

  if (!university) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg">University not found</div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{university.name}</h1>
              {getTierBadge(university.tier)}
              {university.category && (
                <Badge variant={getCategoryColor(university.category)}>
                  {university.category}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {university.location}, {university.country?.name || 'Unknown'} {university.country?.flag}
              </span>
              {university.ranking && (
                <span className="flex items-center gap-1">
                  <Trophy className="w-4 h-4" />
                  World Ranking: #{university.ranking}
                </span>
              )}
              {university.website && (
                <a
                  href={university.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-blue-600"
                >
                  <Globe className="w-4 h-4" />
                  Website
                </a>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={university.isFavorite ? 'default' : 'outline'}
              onClick={toggleFavorite}
              className="flex items-center gap-2"
            >
              <Star className={`h-4 w-4 ${university.isFavorite ? 'fill-current' : ''}`} />
              {university.isFavorite ? 'Favorited' : 'Add to Favorites'}
            </Button>
            <Button variant="outline" onClick={() => router.push('/universities')}>
              Back to Universities
            </Button>
            {!university.applications || university.applications.length === 0 ? (
              <Button>Start Application</Button>
            ) : (
              <Link href={`/applications/${university.applications[0].id}`}>
                <Button>View Application</Button>
              </Link>
            )}
          </div>
        </div>

        {/* Application Progress Bar */}
        {university.applications && university.applications.length > 0 && (
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Application Progress</span>
              <span>{getApplicationProgress()}%</span>
            </div>
            <Progress value={getApplicationProgress()} className="h-2" />
            <p className="text-sm text-gray-600">
              Status: {university.applications[0].status.replace(/_/g, ' ')}
            </p>
          </div>
        )}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-7 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="deadlines">Key Dates</TabsTrigger>
          <TabsTrigger value="career">Career Prospects</TabsTrigger>
          <TabsTrigger value="status">Status & Tasks</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Entry Requirements Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Entry Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {university.ibRequirement && (
                  <div>
                    <span className="font-medium">IB: </span>
                    <span className="text-gray-600">{university.ibRequirement}</span>
                  </div>
                )}
                {university.aLevelRequirement && (
                  <div>
                    <span className="font-medium">A-Levels: </span>
                    <span className="text-gray-600">{university.aLevelRequirement}</span>
                  </div>
                )}
                {university.mathsRequirement && (
                  <div>
                    <span className="font-medium">Maths: </span>
                    <span className="text-gray-600">{university.mathsRequirement}</span>
                  </div>
                )}
                {university.ieltsRequired && (
                  <div>
                    <span className="font-medium">IELTS: </span>
                    <span className="text-gray-600">{university.ieltsRequired}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Financial Information Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Financial Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {university.tuitionFee && (
                  <div>
                    <span className="font-medium">Tuition Fee: </span>
                    <span className="text-gray-600">£{university.tuitionFee.toLocaleString()}/year</span>
                  </div>
                )}
                {university.livingCosts && (
                  <div>
                    <span className="font-medium">Living Costs: </span>
                    <span className="text-gray-600">£{university.livingCosts.toLocaleString()}/year</span>
                  </div>
                )}
                <div>
                  <span className="font-medium">Total Annual Cost: </span>
                  <span className="text-gray-600">
                    £{((university.tuitionFee || 0) + (university.livingCosts || 0)).toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Admission Test Card */}
            {university.admissionTest && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Admission Test
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Test Required: </span>
                    <Badge>{university.admissionTest}</Badge>
                  </div>
                  {university.testDeadline && (
                    <div>
                      <span className="font-medium">Test Date: </span>
                      <span className="text-gray-600">
                        {new Date(university.testDeadline).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Additional Information */}
          {(university.campusInfo || university.accommodation || university.notes) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Additional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {university.campusInfo && (
                  <div>
                    <h4 className="font-medium mb-1">Campus Information</h4>
                    <p className="text-sm text-gray-600">{university.campusInfo}</p>
                  </div>
                )}
                {university.accommodation && (
                  <div>
                    <h4 className="font-medium mb-1">Accommodation</h4>
                    <p className="text-sm text-gray-600">{university.accommodation}</p>
                  </div>
                )}
                {university.notes && (
                  <div>
                    <h4 className="font-medium mb-2">Detailed Analysis for Damien's Profile</h4>
                    <div className="text-sm text-gray-600 whitespace-pre-wrap space-y-3">
                      {university.notes.split('\n\n').map((section, idx) => {
                        // Check if this is a heading (starts with emoji or special formatting)
                        const isHeading = section.includes('📊') || section.includes('✅') ||
                                        section.includes('⚠️') || section.includes('💡') ||
                                        section.includes('❌') || section.includes('🎯');

                        if (isHeading) {
                          return (
                            <div key={idx} className="font-semibold text-gray-800 dark:text-gray-200">
                              {section}
                            </div>
                          );
                        }

                        // Format bullet points
                        if (section.includes('•')) {
                          return (
                            <ul key={idx} className="space-y-1 ml-4">
                              {section.split('\n').filter(line => line.includes('•')).map((line, lineIdx) => (
                                <li key={lineIdx} className="flex">
                                  <span className="mr-2">•</span>
                                  <span>{line.replace('•', '').trim()}</span>
                                </li>
                              ))}
                            </ul>
                          );
                        }

                        // Regular paragraph
                        return (
                          <p key={idx} className="leading-relaxed">
                            {section}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Requirements Tab */}
        <TabsContent value="requirements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Entry Requirements Details</CardTitle>
              <CardDescription>Complete requirements for admission</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Academic Requirements
                  </h3>
                  <div className="space-y-2 pl-6">
                    {university.ibRequirement && (
                      <div className="flex justify-between">
                        <span className="text-sm">IB Requirement:</span>
                        <span className="text-sm font-medium">{university.ibRequirement}</span>
                      </div>
                    )}
                    {university.aLevelRequirement && (
                      <div className="flex justify-between">
                        <span className="text-sm">A-Level Requirement:</span>
                        <span className="text-sm font-medium">{university.aLevelRequirement}</span>
                      </div>
                    )}
                    {university.mathsRequirement && (
                      <div className="flex justify-between">
                        <span className="text-sm">Mathematics:</span>
                        <span className="text-sm font-medium">{university.mathsRequirement}</span>
                      </div>
                    )}
                    {university.entryRequirements && (
                      <div className="pt-2">
                        <span className="text-sm">Additional Requirements:</span>
                        <p className="text-sm text-gray-600 mt-1">{university.entryRequirements}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    English & Tests
                  </h3>
                  <div className="space-y-2 pl-6">
                    {university.ieltsRequired && (
                      <div className="flex justify-between">
                        <span className="text-sm">IELTS Required:</span>
                        <span className="text-sm font-medium">{university.ieltsRequired}</span>
                      </div>
                    )}
                    {university.admissionTest && (
                      <div className="flex justify-between">
                        <span className="text-sm">Admission Test:</span>
                        <Badge variant="outline">{university.admissionTest}</Badge>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Test Requirements Section */}
              {university.testRequirements && university.testRequirements.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold">Test Requirements</h3>
                  <div className="grid gap-3">
                    {university.testRequirements.map((test: any) => (
                      <Card key={test.id} className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{test.testName}</span>
                              {test.required && <Badge variant="destructive">Required</Badge>}
                              {test.recommended && <Badge variant="secondary">Recommended</Badge>}
                            </div>
                            {test.minScore && (
                              <p className="text-sm text-gray-600">Minimum Score: {test.minScore}</p>
                            )}
                            {test.typicalScore && (
                              <p className="text-sm text-gray-600">Typical Score: {test.typicalScore}</p>
                            )}
                          </div>
                          {test.testDate && (
                            <div className="text-right">
                              <p className="text-sm font-medium">Test Date</p>
                              <p className="text-sm text-gray-600">
                                {new Date(test.testDate).toLocaleDateString()}
                              </p>
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Courses</CardTitle>
              <CardDescription>Courses aligned with your preferences - Click course names to view on UCAS</CardDescription>
            </CardHeader>
            <CardContent>
              {university.courses && university.courses.length > 0 ? (
                <div className="grid gap-4">
                  {university.courses.map((course: any) => (
                    <Card key={course.id} className="p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            {course.ucasUrl ? (
                              <a
                                href={course.ucasUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group"
                              >
                                <h3 className="font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline decoration-dotted underline-offset-2 flex items-center gap-1">
                                  {course.name}
                                  <Globe className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                                </h3>
                              </a>
                            ) : (
                              <h3 className="font-semibold">{course.name}</h3>
                            )}
                            {course.code && (
                              <p className="text-sm text-gray-600">Code: {course.code}</p>
                            )}
                          </div>
                          <div className="text-right">
                            {course.degree && <Badge>{course.degree}</Badge>}
                            {course.duration && (
                              <p className="text-sm text-gray-600 mt-1">{course.duration}</p>
                            )}
                          </div>
                        </div>
                        {course.description && (
                          <p className="text-sm text-gray-600">{course.description}</p>
                        )}
                        {course.modules && (
                          <div>
                            <span className="text-sm font-medium">Key Modules: </span>
                            <span className="text-sm text-gray-600">{course.modules}</span>
                          </div>
                        )}
                        {course.careerPaths && (
                          <div>
                            <span className="text-sm font-medium">Career Paths: </span>
                            <span className="text-sm text-gray-600">{course.careerPaths}</span>
                          </div>
                        )}
                        {course.ucasUrl && (
                          <div className="pt-2">
                            <a
                              href={course.ucasUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                              <Globe className="w-3 h-3" />
                              View full course details on UCAS
                            </a>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-gray-500">Recommended courses based on your preferences:</p>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Computer Science</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Data Science</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Artificial Intelligence</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Machine Learning</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Key Dates Tab */}
        <TabsContent value="deadlines" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Key Dates & Deadlines</CardTitle>
              <CardDescription>Important dates for this university</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Standard Dates */}
                <div className="grid gap-3">
                  {university.applicationDeadline && (
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="font-medium">Application Deadline</p>
                          <p className="text-sm text-gray-600">Submit your application by this date</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {new Date(university.applicationDeadline).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                  {university.testDeadline && (
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-orange-500" />
                        <div>
                          <p className="font-medium">Test Deadline</p>
                          <p className="text-sm text-gray-600">{university.admissionTest} test date</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {new Date(university.testDeadline).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                  {university.decisionDate && (
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-green-500" />
                        <div>
                          <p className="font-medium">Decision Date</p>
                          <p className="text-sm text-gray-600">Expected decision by this date</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {new Date(university.decisionDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Key Dates */}
                {university.keyDates && university.keyDates.length > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-3">
                      <h3 className="font-semibold">Additional Important Dates</h3>
                      {university.keyDates.map((date: any) => (
                        <div key={date.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            {date.critical ? (
                              <AlertTriangle className="w-5 h-5 text-red-500" />
                            ) : (
                              <Calendar className="w-5 h-5 text-gray-500" />
                            )}
                            <div>
                              <p className="font-medium">{date.title}</p>
                              {date.description && (
                                <p className="text-sm text-gray-600">{date.description}</p>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              {new Date(date.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Career Prospects Tab */}
        <TabsContent value="career" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Employment Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {university.employmentRate && (
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Employment Rate</span>
                      <span className="text-sm font-medium">{university.employmentRate}%</span>
                    </div>
                    <Progress value={university.employmentRate} className="h-2" />
                  </div>
                )}
                {university.averageSalary && (
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm">Average Starting Salary</span>
                    <span className="text-lg font-semibold">
                      £{university.averageSalary.toLocaleString()}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Industry Connections
                </CardTitle>
              </CardHeader>
              <CardContent>
                {university.majorRecruiters && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Major Recruiters:</p>
                    <p className="text-sm text-gray-600">{university.majorRecruiters}</p>
                  </div>
                )}
                {university.industryLinks && (
                  <div className="space-y-2 mt-3">
                    <p className="text-sm font-medium">Industry Partnerships:</p>
                    <p className="text-sm text-gray-600">{university.industryLinks}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {university.researchAreas && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Research Excellence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{university.researchAreas}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Status & Tasks Tab */}
        <TabsContent value="status" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Application Status & Tasks</CardTitle>
              <CardDescription>Track your progress and pending tasks</CardDescription>
            </CardHeader>
            <CardContent>
              {university.applications && university.applications.length > 0 ? (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium">Current Status</span>
                      <Badge>{university.applications[0].status.replace(/_/g, ' ')}</Badge>
                    </div>
                    <Progress value={getApplicationProgress()} className="h-2 mb-2" />
                    <p className="text-xs text-gray-600">
                      {getApplicationProgress()}% complete
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h3 className="font-semibold">Checklist</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {university.applications[0].personalStatement ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Clock className="w-4 h-4 text-gray-400" />
                        )}
                        <span className="text-sm">Personal Statement</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {university.applications[0].transcriptStatus === 'SUBMITTED' ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Clock className="w-4 h-4 text-gray-400" />
                        )}
                        <span className="text-sm">Academic Transcript</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {university.applications[0].ieltsStatus === 'SUBMITTED' ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Clock className="w-4 h-4 text-gray-400" />
                        )}
                        <span className="text-sm">IELTS Score</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {university.applications[0].reference1Status === 'SUBMITTED' ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Clock className="w-4 h-4 text-gray-400" />
                        )}
                        <span className="text-sm">Reference 1</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {university.applications[0].reference2Status === 'SUBMITTED' ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Clock className="w-4 h-4 text-gray-400" />
                        )}
                        <span className="text-sm">Reference 2</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Link href={`/applications/${university.applications[0].id}`}>
                      <Button>View Full Application</Button>
                    </Link>
                    <Button variant="outline">Add Task</Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 space-y-3">
                  <p className="text-gray-500">No application started yet</p>
                  <Button>Start Application</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes" className="space-y-4">
          {/* Main User Notes */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>My Personal Notes</CardTitle>
                <Button
                  onClick={saveUserNotes}
                  size="sm"
                  disabled={isSavingNotes}
                >
                  <Save className="w-4 h-4 mr-1" />
                  {isSavingNotes ? 'Saving...' : 'Save Notes'}
                </Button>
              </div>
              <CardDescription>Your main notes and thoughts about this university</CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                placeholder="Write your personal notes here... Include thoughts, impressions, pros/cons, etc."
                className="w-full h-48 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
              />
            </CardContent>
          </Card>

          {/* Timeline Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Timeline Notes</CardTitle>
              <CardDescription>Quick notes with automatic timestamps</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add New Note */}
              <div className="space-y-3">
                <textarea
                  value={newTimelineNote}
                  onChange={(e) => setNewTimelineNote(e.target.value)}
                  placeholder="Add a quick note... (e.g., 'Called admissions office about requirements', 'Attended virtual open day - loved the CS department presentation')"
                  className="w-full h-24 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                />
                <Button
                  onClick={addTimelineNote}
                  disabled={!newTimelineNote.trim()}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Note
                </Button>
              </div>

              {/* Existing Notes List */}
              {university?.universityNotes && university.universityNotes.length > 0 ? (
                <div className="space-y-3 pt-4">
                  <Separator />
                  <div className="space-y-3">
                    {university.universityNotes.map((note) => (
                      <div key={note.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div className="text-xs text-gray-500">
                            {new Date(note.createdAt).toLocaleString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteNote(note.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {note.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">
                  No timeline notes yet. Add your first note above!
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}