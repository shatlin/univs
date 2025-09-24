'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Globe, MapPin, GraduationCap, Trophy } from 'lucide-react'

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<any[]>([])
  const [countries, setCountries] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('all')
  const [selectedTier, setSelectedTier] = useState('all')
  const [sortBy, setSortBy] = useState('ranking')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalUniversities, setTotalUniversities] = useState(0)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [newUniversity, setNewUniversity] = useState({
    name: '',
    countryId: '',
    courseName: '',
    entryRequirements: '',
    ieltsRequired: '',
    tuitionFee: '',
    location: '',
    website: '',
    ranking: '',
    ucasCode: '',
    notes: ''
  })

  useEffect(() => {
    fetchCountries()
  }, [])

  useEffect(() => {
    fetchUniversities()
  }, [searchTerm, selectedCountry, selectedTier, sortBy, currentPage])

  const fetchUniversities = async () => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams()
      if (searchTerm) params.append('search', searchTerm)
      if (selectedCountry !== 'all') params.append('countryId', selectedCountry)
      if (selectedTier !== 'all') params.append('tier', selectedTier)
      params.append('sortBy', sortBy)
      params.append('page', currentPage.toString())
      params.append('limit', '10')

      const res = await fetch(`/api/universities?${params}`)
      const data = await res.json()

      if (data.error) {
        console.error('API error:', data.error)
        setUniversities([])
        return
      }

      setUniversities(data.universities || [])
      setTotalPages(data.pagination?.totalPages || 1)
      setTotalUniversities(data.pagination?.total || 0)
    } catch (error) {
      console.error('Failed to fetch universities:', error)
      setUniversities([])
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCountries = async () => {
    try {
      const res = await fetch('/api/countries')
      const data = await res.json()

      if (data.error) {
        console.error('API error:', data.error)
        setCountries([])
        return
      }

      const countries = Array.isArray(data) ? data : []
      setCountries(countries)
    } catch (error) {
      console.error('Failed to fetch countries:', error)
      setCountries([])
    }
  }

  const getTierBadgeColor = (tier: string) => {
    switch(tier) {
      case 'S': return 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white'
      case 'A': return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
      case 'B': return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
      case 'C': return 'bg-gray-500 text-white'
      default: return 'bg-gray-300'
    }
  }

  const getTierLabel = (tier: string) => {
    switch(tier) {
      case 'S': return 'S-Tier (Best Choice)'
      case 'A': return 'A-Tier (Excellent)'
      case 'B': return 'B-Tier (Good)'
      case 'C': return 'C-Tier (Safety)'
      default: return tier
    }
  }

  const handleAddUniversity = async () => {
    try {
      const universityData = {
        ...newUniversity,
        ieltsRequired: newUniversity.ieltsRequired ? parseFloat(newUniversity.ieltsRequired) : null,
        tuitionFee: newUniversity.tuitionFee ? parseFloat(newUniversity.tuitionFee) : null,
        ranking: newUniversity.ranking ? parseInt(newUniversity.ranking) : null
      }

      const res = await fetch('/api/universities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(universityData)
      })

      if (res.ok) {
        await fetchUniversities()
        setIsAddDialogOpen(false)
        setNewUniversity({
          name: '',
          country: '',
          courseName: '',
          entryRequirements: '',
          ieltsRequired: '',
          tuitionFee: '',
          location: '',
          website: '',
          ranking: '',
          ucasCode: '',
          notes: ''
        })
      }
    } catch (error) {
      console.error('Failed to add university:', error)
    }
  }

  const handleCreateApplication = async (universityId: string) => {
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ universityId })
      })

      if (res.ok) {
        await fetchUniversities()
      }
    } catch (error) {
      console.error('Failed to create application:', error)
    }
  }

  const getApplicationStatus = (applications: any[]) => {
    if (!applications || applications.length === 0) return null
    const latest = applications[applications.length - 1]
    return latest.status
  }

  const getStatusColor = (status: string) => {
    const colors: any = {
      'NOT_STARTED': 'default',
      'IN_PROGRESS': 'secondary',
      'SUBMITTED': 'outline',
      'OFFER_RECEIVED': 'default',
      'REJECTED': 'destructive'
    }
    return colors[status] || 'default'
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Universities</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Showing {universities.length > 0 ? `${(currentPage - 1) * 10 + 1}-${Math.min(currentPage * 10, totalUniversities)}` : '0'} of {totalUniversities} universities
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add University</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New University</DialogTitle>
                <DialogDescription>
                  Enter the details of the university you want to track
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">University Name *</Label>
                    <Input
                      id="name"
                      value={newUniversity.name}
                      onChange={(e) => setNewUniversity({...newUniversity, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Select
                      value={newUniversity.countryId}
                      onValueChange={(value) => setNewUniversity({...newUniversity, countryId: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map(country => (
                          <SelectItem key={country.id} value={country.id}>
                            {country.flag} {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="courseName">Course Name</Label>
                    <Input
                      id="courseName"
                      value={newUniversity.courseName}
                      onChange={(e) => setNewUniversity({...newUniversity, courseName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ucasCode">UCAS Code</Label>
                    <Input
                      id="ucasCode"
                      value={newUniversity.ucasCode}
                      onChange={(e) => setNewUniversity({...newUniversity, ucasCode: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={newUniversity.location}
                      onChange={(e) => setNewUniversity({...newUniversity, location: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ranking">World Ranking</Label>
                    <Input
                      id="ranking"
                      type="number"
                      value={newUniversity.ranking}
                      onChange={(e) => setNewUniversity({...newUniversity, ranking: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ieltsRequired">IELTS Required</Label>
                    <Input
                      id="ieltsRequired"
                      type="number"
                      step="0.5"
                      value={newUniversity.ieltsRequired}
                      onChange={(e) => setNewUniversity({...newUniversity, ieltsRequired: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tuitionFee">Tuition Fee (per year)</Label>
                    <Input
                      id="tuitionFee"
                      type="number"
                      value={newUniversity.tuitionFee}
                      onChange={(e) => setNewUniversity({...newUniversity, tuitionFee: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={newUniversity.website}
                    onChange={(e) => setNewUniversity({...newUniversity, website: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="entryRequirements">Entry Requirements</Label>
                  <Textarea
                    id="entryRequirements"
                    value={newUniversity.entryRequirements}
                    onChange={(e) => setNewUniversity({...newUniversity, entryRequirements: e.target.value})}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newUniversity.notes}
                    onChange={(e) => setNewUniversity({...newUniversity, notes: e.target.value})}
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddUniversity}>Add University</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search universities, courses, or locations..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>
          <Select value={selectedCountry} onValueChange={(value) => {
            setSelectedCountry(value)
            setCurrentPage(1)
          }}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              {countries.map(country => (
                <SelectItem key={country.id} value={country.id}>
                  {country.flag} {country.name} ({country._count?.universities || 0})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedTier} onValueChange={(value) => {
            setSelectedTier(value)
            setCurrentPage(1)
          }}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by tier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tiers</SelectItem>
              <SelectItem value="S">S-Tier (Best)</SelectItem>
              <SelectItem value="A">A-Tier (Excellent)</SelectItem>
              <SelectItem value="B">B-Tier (Good)</SelectItem>
              <SelectItem value="C">C-Tier (Safety)</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={(value) => {
            setSortBy(value)
            setCurrentPage(1)
          }}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ranking">Best Match First</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="country">Country</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-500">Loading universities...</div>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {universities.map((university, index) => {
          const applicationStatus = getApplicationStatus(university.applications)
          return (
              <Card key={university.id} className="hover:shadow-lg transition-shadow relative overflow-hidden">
                {/* Tier Badge */}
                {university.recommendationTier && (
                  <div className="absolute top-2 right-2 z-10">
                    <Badge className={getTierBadgeColor(university.recommendationTier)}>
                      {university.recommendationTier}-Tier
                    </Badge>
                  </div>
                )}

                {/* Ranking Ribbon */}
                <div className="absolute top-0 left-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 text-xs font-bold">
                  #{(currentPage - 1) * 10 + index + 1}
                </div>

                <CardHeader
                  onClick={() => window.location.href = `/universities/${university.id}`}
                  className="cursor-pointer pt-8"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-12">
                      <CardTitle className="text-lg hover:text-blue-600 transition-colors mb-1">
                        {university.name}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <span className="font-medium">{university.country?.flag}</span>
                        <span>{university.location || university.country?.name}</span>
                        {university.ranking && (
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                            Global: #{university.ranking}
                          </span>
                        )}
                      </CardDescription>
                    </div>
                    {university.rankingScore && (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {university.rankingScore}
                        </div>
                        <div className="text-xs text-gray-500">Score</div>
                      </div>
                    )}
                  </div>
                  {applicationStatus && (
                    <Badge variant={getStatusColor(applicationStatus)} className="mt-2">
                      {applicationStatus.replace(/_/g, ' ')}
                    </Badge>
                  )}
                </CardHeader>
              <CardContent className="space-y-3">
                {/* Key Strengths */}
                {university.notes && (
                  <div className="text-xs text-gray-600 italic border-l-2 border-blue-400 pl-2">
                    {university.notes.split('Ranking:')[1] || university.notes.substring(0, 100)}
                  </div>
                )}

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {university.courseName && (
                    <div className="col-span-2">
                      <span className="text-gray-500">Course:</span>
                      <span className="ml-1 font-medium">{university.courseName}</span>
                    </div>
                  )}

                  {university.entryRequirements && (
                    <div className="col-span-2">
                      <span className="text-gray-500">Entry:</span>
                      <span className="ml-1 text-xs">{university.entryRequirements}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1">
                    {university.ieltsRequired && (
                      <>
                        <span className="text-gray-500">IELTS:</span>
                        <Badge variant="outline" className="text-xs px-1 py-0">
                          {university.ieltsRequired}
                        </Badge>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    {university.tuitionFee && (
                      <>
                        <span className="text-gray-500">Fees:</span>
                        <span className="font-medium text-xs">£{(university.tuitionFee/1000).toFixed(0)}k</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Category Tags */}
                <div className="flex flex-wrap gap-1">
                  {university.tier && (
                    <Badge variant="secondary" className="text-xs">
                      {university.tier}
                    </Badge>
                  )}
                  {university.category && (
                    <Badge variant="outline" className="text-xs">
                      {university.category}
                    </Badge>
                  )}
                  {university.admissionTest && (
                    <Badge variant="outline" className="text-xs bg-yellow-50">
                      {university.admissionTest}
                    </Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2 border-t">
                  <Link href={`/universities/${university.id}`} className="flex-1">
                    <Button size="sm" className="w-full h-8 text-xs">
                      View Details
                    </Button>
                  </Link>
                  {!applicationStatus && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 h-8 text-xs"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCreateApplication(university.id)
                      }}
                    >
                      Apply
                    </Button>
                  )}
                  {applicationStatus && (
                    <Link href={`/applications/${university.applications[0]?.id}`} className="flex-1">
                      <Button size="sm" variant="secondary" className="w-full h-8 text-xs">
                        Application
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          )
            })}
          </div>

          {universities.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-gray-500">No universities found. Try adjusting your filters or add a new university.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  )
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}