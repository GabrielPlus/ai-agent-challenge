import AgentPulse from '@/components/AgentPulse'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const Layout = async ({ children }: Props) => {
  const user = await currentUser()

  if (user) {
    redirect('/')
  }

  return (
    <div className="hh-screen flex w-full justify-center">
      <div className="w-[600px] lg:w-1/2 flex flex-col items-start p-6">

        {children}
      </div>
      <div className="hidden lg:flex flex-1 max-h-full overflow-hidden relative bg-cream flex-col pl-24 gap-3 items-center justify-center ml-[-10rem] mt-[-15rem]">
        <h2 className="text-gravel text-2xl md:text-4xl font-bold">
          Hi, I’m your AI powered Agentube!
        </h2>
        <p className="text-iridium text-sm md:text-base mb-10">
          AgentTube is capable of helping without a form...{' '}
          <br />
          something never done before 😉
        </p>

        {/* Centered Pulse */}
        <div className="w-[600px] lg:w-1/2 flex flex-col items-center justify-center p-6 pt-6">
          <AgentPulse color="blue" />
        </div>
      </div>

    </div>
  )
}

export default Layout
