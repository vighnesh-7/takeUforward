import { addFlashcard, fetchFlashcards } from '@/actions/flashcards'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const res = await fetchFlashcards()

    return NextResponse.json(res)
  } catch (e: any) {
    return NextResponse.json({
      status: 500,
      message: e.message,
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const req = await request.json()

    const res = await addFlashcard(req)

    return NextResponse.json(res)
  } catch (e: any) {
    return NextResponse.json({
      status: 500,
      message: e.message,
    })
  }
}
