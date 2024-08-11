import React from 'react'
import MainPage from '../../components/MainPage'
import { fetchFlashcards } from '@/actions/flashcards'

const page = async () => {
  const flashcards = await fetchFlashcards()

  return (
    <div>
      <MainPage flashcards={flashcards} />
    </div>
  )
}

export default page
