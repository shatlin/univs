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

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<any[]>([])
  const [filteredUniversities, setFilteredUniversities] = useState<any[]>([])
  const [countries, setCountries] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
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
    fetchUniversities()
    fetchCountries()
  }, [])

  useEffect(() => {
    filterUniversities()
  }, [searchTerm, selectedCountry, universities])

  const fetchUniversities = async () => {
    try {
      const res = await fetch('/api/universities')
      const data = await res.json()

      if (data.error) {
        console.error('API error:', data.error)
        setUniversities([])
        setFilteredUniversities([])
        return
      }

      const universities = Array.isArray(data) ? data : []
      setUniversities(universities)
      setFilteredUniversities(universities)
    } catch (error) {
      console.error('Failed to fetch universities:', error)
      setUniversities([])
      setFilteredUniversities([])
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

  const filterUniversities = () => {
    let filtered = universities

    if (selectedCountry !== 'all') {
      filtered = filtered.filter(u => u.countryId === selectedCountry)
    }

    if (searchTerm) {
      filtered = filtered.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.location?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredUniversities(filtered)
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
          <p className="text-gray-600 dark:text-gray-400 mt-1">Browse and manage your target universities</p>
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

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search universities, courses, or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
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
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredUniversities.map((university) => {
          const applicationStatus = getApplicationStatus(university.applications)
          return (
            <Card key={university.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader onClick={() => window.location.href = `/universities/${university.id}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg hover:text-blue-600 transition-colors">{university.name}</CardTitle>
                    <CardDescription>
                      {university.location}, {university.country?.name || university.country} {university.country?.flag}
                    </CardDescription>
                  </div>
                  {applicationStatus && (
                    <Badge variant={getStatusColor(applicationStatus)}>
                      {applicationStatus.replace(/_/g, ' ')}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {university.courseName && (
                    <p><strong>Course:</strong> {university.courseName}</p>
                  )}
                  {university.ranking && (
                    <p><strong>World Ranking:</strong> #{university.ranking}</p>
                  )}
                  {university.ieltsRequired && (
                    <p><strong>IELTS Required:</strong> {university.ieltsRequired}</p>
                  )}
                  {university.tuitionFee && (
                    <p><strong>Tuition Fee:</strong> £{university.tuitionFee.toLocaleString()}/year</p>
                  )}
                  {university.entryRequirements && (
                    <p><strong>Entry Requirements:</strong> {university.entryRequirements}</p>
                  )}
                  <div className="flex gap-2 pt-4">
                    <Link href={`/universities/${university.id}`}>
                      <Button size="sm">View Details</Button>
                    </Link>
                    {!applicationStatus && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCreateApplication(university.id)}
                      >
                        Start Application
                      </Button>
                    )}
                    {applicationStatus && (
                      <Link href={`/applications/${university.applications[0]?.id}`}>
                        <Button size="sm" variant="outline">
                          View Application
                        </Button>
                      </Link>
                    )}
                    {university.website && (
                      <a href={university.website} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="outline">
                          Website
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredUniversities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No universities found. Try adjusting your filters or add a new university.</p>
        </div>
      )}
    </div>
  )
}