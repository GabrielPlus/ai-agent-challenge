'use client'
import { useAuthContextHook } from '@/context/use-auth-context'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import TypeSelectionForm from './type-selection-form'
import dynamic from 'next/dynamic'
import { Spinner } from '@/components/spinner'

// Wrapper component for Spinner
const LoadingSpinner = () => {
  return <Spinner noPadding={false} />
}

// Dynamically import forms with the loading spinner
const DetailForm = dynamic(() => import('./account-details-form'), {
  ssr: false,
  loading: LoadingSpinner,
})

const OTPForm = dynamic(() => import('./otp-form'), {
  ssr: false,
  loading: LoadingSpinner,
})

const RegistrationFormStep = () => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext()
  const { currentStep } = useAuthContextHook()
  const [onOTP, setOnOTP] = useState<string>('')
  const [onUserType, setOnUserType] = useState<'owner' | 'student'>('owner')

  setValue('otp', onOTP)

  switch (currentStep) {
    case 1:
      return (
        <TypeSelectionForm
          register={register}
          userType={onUserType}
          setUserType={setOnUserType}
        />
      )
    case 2:
      return (
        <DetailForm
          errors={errors}
          register={register}
        />
      )
    case 3:
      return (
        <OTPForm
          onOTP={onOTP}
          setOTP={setOnOTP}
        />
      )
    default:
      return <div>RegistrationFormStep</div>
  }
}

export default RegistrationFormStep