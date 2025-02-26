'use server'

import { client } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation' // Correct Clerk redirection

export const onCompleteUserRegistration = async (
  fullname: string,
  clerkId: string,
  type: string
) => {
  try {
    const registered = await client.user.create({
      data: {
        fullname,
        clerkId,
        type
      },
      select: {
        fullname: true,
        id: true,
        type: true
      }
    })

    if (!registered) {
      return { status: 400, message: 'User registration failed' }
    }

    return { status: 200, user: registered }
  } catch (error) {
    console.error('Error in onCompleteUserRegistration:', error)
    return { status: 400, message: 'Something went wrong' }
  }
}

export const onLoginUser = async () => {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in') // Correct way to handle server-side redirection
  }

  try {
    const authenticated = await client.user.findUnique({
      where: {
        clerkId: user.id
      },
      select: {
        fullname: true,
        id: true,
        type: true
      }
    })

    if (!authenticated) {
      return { status: 400, message: 'User not found' }
    }

    return { status: 200, user: authenticated }
  } catch (error) {
    console.error('Error in onLoginUser:', error)
    return { status: 400, message: 'Something went wrong' }
  }
}
