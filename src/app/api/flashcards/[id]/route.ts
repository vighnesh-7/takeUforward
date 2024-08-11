import { deleteFlashcard, updateFlashcard } from '@/actions/flashcards'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(request: NextRequest) {
  try {
    const req = await request.json()
    const id = req.id

    const res = await updateFlashcard(id, req)

    return NextResponse.json(res)
  } catch (e: any) {
    return NextResponse.json({
      status: 500,
      message: e.message,
    })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const id = url.pathname.split('/').pop()

    if (!id) {
      throw new Error('ID parameter is missing')
    }

    const res = await deleteFlashcard(id)

    return NextResponse.json(res)
  } catch (e: any) {
    return NextResponse.json({
      status: 500,
      message: e.message,
    })
  }
}
