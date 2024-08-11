'use client'

import React, { useState } from 'react'

const Flashcard = ({
  card,
  onNext,
  onPrevious,
  currentIndex,
  totalCards,
}: {
  card: {
    tags: any
    id: string
    question: string
    answer: string
    difficulty: number
    createdAt: string
  }
  onNext: () => void
  onPrevious: () => void
  currentIndex: number
  totalCards: number
}) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const buttonClicked = () => {
    setIsFlipped(false)
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1:
      case 2:
        return 'bg-green-500'
      case 3:
        return 'bg-yellow-500'
      case 4:
      case 5:
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-4 flex justify-between items-center">
          <span className="text-base text-gray-600 dark:text-gray-50 font-semibold">
            Card {currentIndex + 1} of {totalCards}
          </span>
          <span
            className={`px-2 py-1 rounded-full text-xs text-white ${getDifficultyColor(
              card.difficulty
            )}`}
          >
            Difficulty: {card.difficulty}
          </span>
        </div>
        <div
          className={`relative w-full aspect-[3/2] cursor-pointer transition-transform duration-500 transform perspective-1000 rounded-xl ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          onClick={handleFlip}
          style={{
            boxShadow:
              'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px',
          }}
        >
          <div>
            {isFlipped ? (
              <div className="absolute w-full h-full frontface-hidden bg-white rounded-xl shadow-lg flex flex-col items-center justify-center p-6 rotate-y-180">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Answer:
                  </h2>
                  <p className="text-xl text-gray-700 font-[400]">
                    {card?.answer}
                  </p>
                </div>

                <div className="text-sm text-gray-500 mt-16 w-full flex flex-row items-center justify-start">
                  {card.tags.map((tag: string) => {
                    return (
                      <span className="px-2.5 py-1.5 bg-gray-800 text-gray-50 rounded-xl text-xs mr-2.5 font-semibold">
                        {tag}
                      </span>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg flex items-center justify-center p-8 px-16">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Question:
                  </h2>
                  <p className="text-xl text-gray-700 font-[400]">
                    {card?.question}
                  </p>
                </div>
              </div>
            )}
            <p
              className={`absolute bottom-4 right-4 px-2.5 py-1.5 font-semibold bg-gray-700 text-white rounded-full text-xs transition-opacity duration-300 ${
                isFlipped ? 'opacity-0' : 'opacity-100'
              }`}
            >
              Click to flip the answer
            </p>
          </div>
        </div>
        <div className="mt-8 flex justify-between">
          <button
            className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            onClick={() => {
              buttonClicked()
              onPrevious()
            }}
          >
            Previous
          </button>
          <button
            className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            onClick={() => {
              buttonClicked()
              onNext()
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Flashcard
