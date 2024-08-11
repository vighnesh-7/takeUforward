'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@/types/user'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'
import { FaSpinner } from 'react-icons/fa'
import Loader from './Loader'
import { SiGooglegemini } from 'react-icons/si'

interface Props {
  currentUser: User
}

const AdminDashboard: React.FC<Props> = ({ currentUser }: Props) => {
  const [flashcards, setFlashcards] = useState([])
  const [newCard, setNewCard] = useState({
    question: '',
    answer: '',
    difficulty: 1,
    tags: '',
  })
  const [editingCard, setEditingCard] = useState<any>(null)
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isCardAdded, setIsCardAdded] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [time, setTime] = useState(5)
  const router = useRouter()

  if (currentUser?.role !== 'ADMIN') {
    router.push('/')
  }
  useEffect(() => {
    fetchFlashcards()
  }, [])

  const fetchFlashcards = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/flashcards')
      const data = await response.json()
      setFlashcards(data)
    } catch (error) {
      customToast('Failed to fetch flashcards', 'error')
    }
    setIsLoading(false)
  }

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCardAdded(true)

    const tagsArray = newCard.tags.split(',').map((tag) => tag.trim())

    const cardToPost = {
      ...newCard,
      tags: tagsArray,
      userId: currentUser.id,
    }

    try {
      const response = await axios.post('/api/flashcards', cardToPost)
      if (response.status === 200) {
        setNewCard({ question: '', answer: '', difficulty: 1, tags: '' })
        fetchFlashcards()
        customToast('Flashcard added successfully', 'success')
      }
    } catch (error) {
      customToast('Failed to add flashcard', 'error')
    }
    setIsCardAdded(false)
  }

  const handleEditCard = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await axios.patch(
        `/api/flashcards/${editingCard.id}`,
        editingCard
      )
      if (response.status === 200) {
        setEditingCard(null)
        fetchFlashcards()
        customToast('Flashcard updated successfully', 'success')
      }
    } catch (error) {
      customToast('Failed to update flashcard', 'error')
    }
    setIsLoading(false)
  }

  const handleDeleteCard = async (id: string) => {
    setIsLoading(true)
    try {
      const response = await axios.delete(`/api/flashcards/${id}`)
      if (response.status === 200) {
        fetchFlashcards()
        customToast('Flashcard deleted successfully', 'success')
      }
    } catch (error) {
      customToast('Failed to delete flashcard', 'error')
    }
    setIsLoading(false)
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      setNewCard({
        question: '',
        answer: '',
        difficulty: 1,
        tags: '',
      })
      const response = await axios.get('/api/gemini')

      if (response.status === 200) {
        const res = await response.data
        const validate = res.payload
          .replace(/^```jsonn?/, '')
          .replace(/```$/, '')

        const card = JSON.parse(validate)
        setNewCard({
          question: card.question,
          answer: card.answer,
          difficulty: card.difficulty,
          tags: card.tags.join(', '),
        })
      }
    } catch (error: any) {
      customToast('Failed to generate flashcards', 'error')
    }

    let interval = setInterval(() => {
      setTime((prev) => prev - 1)
    }, 1000)

    setTimeout(() => {
      clearInterval(interval)
      setTime(5)
    }, 5000)

    setTimeout(() => {
      setIsGenerating(false)
    }, 5000)
  }

  const customToast = (message: string, type: 'success' | 'error') => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1 flex-center space-x-4">
                <div>
                  <p>{type === 'success' ? '✅' : '❌'}</p>
                </div>
                <p
                  className={`text-sm font-medium ${
                    type === 'success' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {message}
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ),
      { duration: 3000, position: 'bottom-right' }
    )
  }

  if (currentUser?.role !== 'ADMIN') {
    return (
      <div className="flex-center h-screen">
        <h1 className="text-3xl font-bold">
          You are not authorized to view this page.
        </h1>
      </div>
    )
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Admin Dashboard</h1>

        <div className="mb-8 bg-white dark:bg-slate-800 shadow-md rounded-lg p-4 md:p-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-5 mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-black dark:text-gray-100">
              Add New Flashcard
            </h2>

            {!isGenerating ? (
              <button
                disabled={isGenerating}
                onClick={handleGenerate}
                className="w-full md:w-auto bg-blue-500 flex justify-center items-center text-white font-semibold px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <SiGooglegemini className="h-5 w-5 mr-2" /> Generate using AI
              </button>
            ) : (
              <span className="w-full md:w-auto bg-blue-500 text-white font-semibold flex justify-center items-center px-4 py-2 rounded-full">
                Please wait {time} seconds... &nbsp;
                <FaSpinner className="animate-spin" />
              </span>
            )}
          </div>
          <form onSubmit={handleAddCard} className="space-y-4">
            <input
              type="text"
              placeholder='Question (e.g. "What is the difference between an array and a linked list?",)'
              value={newCard.question}
              onChange={(e) =>
                setNewCard({ ...newCard, question: e.target.value })
              }
              className="w-full p-2 border rounded transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
            <input
              type="text"
              placeholder="Answer"
              value={newCard.answer}
              onChange={(e) =>
                setNewCard({ ...newCard, answer: e.target.value })
              }
              className="w-full p-2 border rounded focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
            <input
              type="number"
              placeholder="Difficulty (1-5)"
              value={newCard.difficulty}
              onChange={(e) =>
                setNewCard({ ...newCard, difficulty: Number(e.target.value) })
              }
              className="w-full p-2 border rounded focus:border-blue-500 focus:ring focus:ring-blue-200"
              min="1"
              max="5"
            />
            <input
              type="text"
              placeholder="Tags (comma-separated)"
              value={newCard.tags}
              onChange={(e) => setNewCard({ ...newCard, tags: e.target.value })}
              className="w-full p-2 border rounded focus:border-blue-500 focus:ring focus:ring-blue-200 mb-4 md:mb-8"
            />
            <button
              type="submit"
              className="w-full md:w-auto bg-blue-500 text-white font-semibold px-5 py-2 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              disabled={isCardAdded}
            >
              {isCardAdded ? (
                <FaSpinner className="animate-spin inline-block mr-2" />
              ) : null}
              Add Flashcard
            </button>
          </form>
        </div>

        <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Flashcards</h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <Loader />
            </div>
          ) : flashcards?.length > 0 ? (
            flashcards.map((card: any) => (
              <div
                key={card.id}
                className="border max-sm:mb-12 p-3 md:p-4 mb-4 rounded-lg hover:shadow-lg transition duration-300 ease-in-out"
              >
                {editingCard && editingCard.id === card.id ? (
                  <form onSubmit={handleEditCard} className="space-y-2">
                    <input
                      type="text"
                      value={editingCard?.question}
                      onChange={(e) =>
                        setEditingCard({
                          ...editingCard,
                          question: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />
                    <input
                      type="text"
                      value={editingCard.answer}
                      onChange={(e) =>
                        setEditingCard({
                          ...editingCard,
                          answer: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />
                    <input
                      type="number"
                      value={editingCard.difficulty}
                      onChange={(e) =>
                        setEditingCard({
                          ...editingCard,
                          difficulty: Number(e.target.value),
                        })
                      }
                      className="w-full p-2 border rounded focus:border-blue-500 focus:ring focus:ring-blue-200"
                      min="1"
                      max="5"
                    />
                    <input
                      type="text"
                      value={editingCard.tags.join(', ')}
                      onChange={(e) =>
                        setEditingCard({
                          ...editingCard,
                          tags: e.target.value
                            .split(',')
                            .map((tag) => tag.trim()),
                        })
                      }
                      className="w-full p-2 border rounded focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                      <button
                        type="submit"
                        className="w-full md:w-auto bg-emerald-600 text-white font-semibold px-4 py-1.5 rounded-full hover:bg-emerald-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <FaSpinner className="animate-spin inline-block mr-2" />
                        ) : null}
                        Save
                      </button>
                      <button
                        onClick={() => setEditingCard(null)}
                        className="w-full md:w-auto bg-gray-500 font-semibold text-white px-4 py-1.5 rounded-full hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <p className="font-semibold">Question: {card.question}</p>
                    <p className="mt-2">Answer: {card.answer}</p>
                    <p className="mt-2">Difficulty: {card.difficulty}</p>
                    <p className="mt-2">Tags: {card.tags.join(', ')}</p>
                    <div className="mt-4 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                      <button
                        onClick={() => setEditingCard(card)}
                        className="w-full md:w-auto bg-yellow-500 font-semibold text-white px-4 py-1.5 rounded-full hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCard(card.id)}
                        className="w-full md:w-auto bg-red-500 font-semibold text-white px-4 py-1.5 rounded-full hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <p>No flashcards available.</p>
          )}
        </div>
      </div>
    </>
  )
}

export default AdminDashboard
