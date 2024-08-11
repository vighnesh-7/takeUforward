import { db } from '@/lib/db'
import getCurrentUser from './getCurrentUser'

export const fetchFlashcards = async () => {
  try {
    const user = await getCurrentUser()
    if (!user) {
      throw new Error('Access denied')
    }

    const res = await db.flashcard.findMany()

    if (!res) {
      return { error: 'No flashcards found' }
    }
    return res
  } catch (error: any) {
    return {
      error: error.message,
    }
  }
}

export const addFlashcard = async (newCard: any) => {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== 'ADMIN') {
      throw new Error('Access denied')
    }

    const flashcard = await db.flashcard.create({
      data: newCard,
    })

    return flashcard
  } catch (error: any) {
    console.log(error, 'error')

    throw new Error(error)
  }
}

export const updateFlashcard = async (id: string, editingCard: any) => {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== 'ADMIN') {
      throw new Error('Access denied')
    }

    const flashcard = await db.flashcard.update({
      where: { id },
      data: editingCard,
    })

    return flashcard
  } catch (error: any) {
    throw new Error(error)
  }
}

export const deleteFlashcard = async (id: string) => {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== 'ADMIN') {
      throw new Error('Access denied')
    }
    const flashcard = await db.flashcard.delete({
      where: { id },
    })

    return flashcard
  } catch (error: any) {
    throw new Error(error)
  }
}
