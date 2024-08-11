'use client'

import Flashcard from './Flashcard'
import { useState } from 'react'

const FlashcardContainer = ({ flashcards }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length)
  }

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
    )
  }

  return (
    <Flashcard
      card={flashcards[currentIndex]}
      onNext={handleNext}
      onPrevious={handlePrevious}
      currentIndex={currentIndex}
      totalCards={flashcards.length}
    />
  )
}

export default FlashcardContainer
