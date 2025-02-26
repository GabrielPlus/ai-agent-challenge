import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import UserTypeCard from './user-type-card'

type Props = {
  register: UseFormRegister<FieldValues>
  userType: 'owner' | 'student'
  setUserType: React.Dispatch<React.SetStateAction<'owner' | 'student'>>
}

const TypeSelectionForm = ({ register, setUserType, userType }: Props) => {
  return (
    <>
      <h2 className="text-gravel md:text-4xl font-bold ">Create an account</h2>
      <p className="text-iridium md:text-sm">
  Discover powerful insights from YouTube videos! Whether you're a blogger or an analyst, 
  <br /> let's customize your experience to fit your needs.
</p>

      <UserTypeCard
        register={register}
        setUserType={setUserType}
        userType={userType}
        value="analyzer"
        title="I analyze videos"
        text="Using this tool to gain insights on YouTube videos."
      />
      <UserTypeCard
        register={register}
        setUserType={setUserType}
        userType={userType}
        value="blogger"
        title="I'm a blogger"
        text="Looking to enhance my content with video analysis."
      />

    </>
  )
}

export default TypeSelectionForm