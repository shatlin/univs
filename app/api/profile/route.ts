import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const profile = await prisma.studentProfile.findFirst({
      orderBy: { createdAt: 'desc' }
    })
    
    if (!profile) {
      return NextResponse.json({ message: 'No profile found' }, { status: 404 })
    }
    
    return NextResponse.json(profile)
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Delete existing profiles (we only want one)
    await prisma.studentProfile.deleteMany()
    
    // Create new profile
    const profile = await prisma.studentProfile.create({
      data: body
    })
    
    return NextResponse.json(profile)
  } catch (error) {
    console.error('Error creating profile:', error)
    return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    const profile = await prisma.studentProfile.findFirst()
    
    if (!profile) {
      // Create new if doesn't exist
      const newProfile = await prisma.studentProfile.create({
        data: body
      })
      return NextResponse.json(newProfile)
    }
    
    // Update existing
    const updatedProfile = await prisma.studentProfile.update({
      where: { id: profile.id },
      data: body
    })
    
    return NextResponse.json(updatedProfile)
  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}