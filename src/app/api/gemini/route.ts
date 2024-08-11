import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

const googleGenerativeAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY as string
)

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const topic =
      'Data Structures and Algorithms , Arrays , hashmaps , linked lists , trees , graphs , heaps , stacks , queues , sorting , searching , dynamic programming , greedy algorithms , backtracking , divide and conquer , bit manipulation , string algorithms , matrix algorithms , bitwise algorithms , number theory , combinatorics , probability , game theory , hashing , , suffix tree , suffix array , disjoint set , binary search tree , AVL tree , red black tree , , quad tree , tries , skip list , heap , priority queue , deque , double ended queue , circular queue , prefix array'

    const model = googleGenerativeAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    })

    const prompt = `You are a helpful assistant designed to output JSON.You are to generate a random mcq 1 question about ${topic} and output format of each object is  {
      question: "question within 30 words",
      answer: "answer within 50 words",
      tags: ["tag1", "tag2" (only 4 tags atmost ) ],
      difficulty: [3/4/5 (1 being the easiest and 5 being the hardest) ]
    } and you have to generate a json object consisting of 1 question on the topics ${topic}  `

    const result = await model.generateContent(prompt)
    const response = await result.response.text()

    return NextResponse.json({ message: 'Success', payload: response })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ message: 'Error', payload: error })
  }
}
