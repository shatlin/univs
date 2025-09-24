'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  User, Calendar, School, Target, BookOpen, TrendingUp, AlertCircle,
  Edit, Save, X, CheckCircle, Award, Brain, Globe
} from 'lucide-react'

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState<any>(null)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/profile')
      if (res.ok) {
        const data = await res.json()
        setProfile(data)
        setEditedProfile(data)
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const saveProfile = async () => {
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedProfile)
      })
      if (res.ok) {
        const data = await res.json()
        setProfile(data)
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Failed to save profile:', error)
    }
  }

  const getGradeColor = (grade: number) => {
    if (grade >= 7) return 'text-green-600 bg-green-50'
    if (grade >= 6) return 'text-blue-600 bg-blue-50'
    if (grade >= 5) return 'text-yellow-600 bg-yellow-50'
    if (grade >= 4) return 'text-orange-600 bg-orange-50'
    return 'text-red-600 bg-red-50'
  }

  const calculateTotalPossible = () => {
    if (!profile) return 0
    const subjects = [
      profile.englishGrade,
      profile.frenchGrade,
      profile.mathGrade,
      profile.businessGrade,
      profile.physicsGrade,
      profile.computerScienceGrade
    ].filter(g => g !== null)
    return subjects.reduce((sum, grade) => sum + (grade || 0), 0) + 3 // +3 for core
  }

  const getUniversityReadiness = () => {
    const total = profile?.predictedTotal || 0
    if (total >= 40) return { level: 'Excellent', color: 'text-green-600', description: 'Ready for top-tier universities' }
    if (total >= 35) return { level: 'Good', color: 'text-blue-600', description: 'Competitive for most universities' }
    if (total >= 30) return { level: 'Moderate', color: 'text-yellow-600', description: 'Meeting requirements for many universities' }
    return { level: 'Needs Improvement', color: 'text-orange-600', description: 'Focus on improving grades' }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500">Loading profile...</div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500">No profile found</div>
      </div>
    )
  }

  const primaryInterests = profile.primaryInterests ? JSON.parse(profile.primaryInterests) : []
  const additionalInterests = profile.additionalInterests ? JSON.parse(profile.additionalInterests) : []
  const teacherComments = profile.teacherComments ? JSON.parse(profile.teacherComments) : {}
  const readiness = getUniversityReadiness()

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <User className="w-8 h-8" />
              {profile.name}
            </h1>
            <div className="mt-2 flex items-center gap-4 text-gray-600">
              <span className="flex items-center gap-1">
                <School className="w-4 h-4" />
                {profile.school}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {profile.currentGrade}
              </span>
              <span className="flex items-center gap-1">
                <Award className="w-4 h-4" />
                IB Diploma Programme
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={saveProfile} size="sm" className="flex items-center gap-2">
                  <Save className="w-4 h-4" /> Save
                </Button>
                <Button onClick={() => setIsEditing(false)} variant="outline" size="sm">
                  <X className="w-4 h-4" /> Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                <Edit className="w-4 h-4" /> Edit Profile
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Predicted IB Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profile.predictedTotal}/45</div>
            <Progress value={(profile.predictedTotal / 45) * 100} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">University Readiness</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${readiness.color}`}>{readiness.level}</div>
            <p className="text-xs text-gray-500 mt-1">{readiness.description}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Strongest Subjects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <div>Computer Science (6)</div>
              <div>Business (6)</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Focus Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <div className="text-orange-600">Physics (4)</div>
              <div className="text-orange-600">French (4)</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="academics" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="academics">Academics</TabsTrigger>
          <TabsTrigger value="interests">Interests & Goals</TabsTrigger>
          <TabsTrigger value="requirements">University Requirements</TabsTrigger>
          <TabsTrigger value="feedback">Teacher Feedback</TabsTrigger>
        </TabsList>

        {/* Academics Tab */}
        <TabsContent value="academics">
          <div className="grid gap-6">
            {/* IB Subjects */}
            <Card>
              <CardHeader>
                <CardTitle>IB Subject Grades</CardTitle>
                <CardDescription>Current performance in IB Diploma subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { name: 'English Language & Literature', grade: profile.englishGrade, level: profile.englishLevel },
                    { name: 'French Ab Initio', grade: profile.frenchGrade, level: profile.frenchLevel },
                    { name: 'Mathematics (Analysis & Approaches)', grade: profile.mathGrade, level: profile.mathLevel },
                    { name: 'Business Management', grade: profile.businessGrade, level: profile.businessLevel },
                    { name: 'Physics', grade: profile.physicsGrade, level: profile.physicsLevel },
                    { name: 'Computer Science', grade: profile.computerScienceGrade, level: profile.computerScienceLevel },
                  ].map((subject) => (
                    <div key={subject.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{subject.name}</div>
                        <Badge variant="outline" className="mt-1">{subject.level}</Badge>
                      </div>
                      <div className={`text-2xl font-bold px-3 py-1 rounded ${getGradeColor(subject.grade || 0)}`}>
                        {subject.grade}/7
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* IB Core */}
            <Card>
              <CardHeader>
                <CardTitle>IB Core Components</CardTitle>
                <CardDescription>Progress in Theory of Knowledge, Extended Essay, and CAS</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 border rounded-lg">
                    <div className="font-medium mb-2">Theory of Knowledge (TOK)</div>
                    <Badge className="bg-green-100 text-green-800">{profile.tokStatus}</Badge>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="font-medium mb-2">Extended Essay (EE)</div>
                    <Badge className="bg-green-100 text-green-800">{profile.extendedEssayStatus}</Badge>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="font-medium mb-2">CAS</div>
                    <Badge className="bg-orange-100 text-orange-800">{profile.casStatus}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Interests Tab */}
        <TabsContent value="interests">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Academic Interests</CardTitle>
                <CardDescription>Primary areas of study interest</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-2">Primary Interests</Label>
                    <div className="flex flex-wrap gap-2">
                      {primaryInterests.map((interest: string) => (
                        <Badge key={interest} className="bg-blue-100 text-blue-800">
                          <Brain className="w-3 h-3 mr-1" />
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2">Additional Interests</Label>
                    <div className="flex flex-wrap gap-2">
                      {additionalInterests.map((interest: string) => (
                        <Badge key={interest} variant="outline">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Career Goals</CardTitle>
                <CardDescription>Future career aspirations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{profile.careerGoals}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preferred Countries</CardTitle>
                <CardDescription>Target countries for university applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  {profile.preferredCountries && JSON.parse(profile.preferredCountries).map((country: string) => (
                    <Badge key={country} variant="outline" className="flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      {country}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Requirements Tab */}
        <TabsContent value="requirements">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>University Eligibility Analysis</CardTitle>
                <CardDescription>Based on current grades and predicted scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border-l-4 border-green-500 bg-green-50">
                    <h4 className="font-semibold text-green-800">✓ Strong Match Universities</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      With a predicted score of {profile.predictedTotal}/45, you're competitive for:
                    </p>
                    <ul className="mt-2 text-sm space-y-1">
                      <li>• University of Manchester, Bristol, Southampton (A-Tier)</li>
                      <li>• Most B-Tier UK universities</li>
                      <li>• Strong European technical universities</li>
                    </ul>
                  </div>

                  <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50">
                    <h4 className="font-semibold text-yellow-800">⚠ Reach Universities</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      May need grade improvements for:
                    </p>
                    <ul className="mt-2 text-sm space-y-1">
                      <li>• Cambridge, Imperial, UCL (need 38+ typically)</li>
                      <li>• ETH Zurich, EPFL (highly competitive)</li>
                    </ul>
                  </div>

                  <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-semibold text-blue-800">💡 Recommendations</h4>
                    <ul className="mt-2 text-sm space-y-1">
                      <li>• Focus on improving Physics and French to boost overall score</li>
                      <li>• Strong Computer Science (6) aligns well with your interests</li>
                      <li>• Business Management (6) provides good foundation</li>
                      <li>• Consider universities with strong CS programs that value subject-specific grades</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subject-Specific Requirements</CardTitle>
                <CardDescription>How your grades match typical university requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <span>Computer Science HL (Grade 6)</span>
                    <Badge className="bg-green-100 text-green-800">Exceeds most requirements</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <span>Mathematics HL (Grade 5)</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Meets most requirements</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <span>Physics HL (Grade 4)</span>
                    <Badge className="bg-orange-100 text-orange-800">May limit some options</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Teacher Feedback Tab */}
        <TabsContent value="feedback">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Strengths</CardTitle>
                <CardDescription>Areas where you excel</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{profile.strengths}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Areas for Improvement</CardTitle>
                <CardDescription>Focus areas for development</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{profile.areasForImprovement}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subject Teacher Comments</CardTitle>
                <CardDescription>Feedback from your IB teachers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(teacherComments).map(([subject, comment]) => (
                    <div key={subject} className="border-l-4 border-gray-200 pl-4">
                      <h4 className="font-semibold capitalize mb-1">{subject}</h4>
                      <p className="text-sm text-gray-600">{comment as string}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}