'use client'

import { useToast } from "@/components/ui/use-toast"
import { useSignUp } from "@clerk/nextjs"
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { UserRegistrationProps, UserRegistrationSchema } from "@/schemas/auth.schemas"
import { onCompleteUserRegistration } from "@/actions/auth"
import { useRouter } from "next/navigation"

export const useSignUpForm = () => {
    const { toast } = useToast()
    const [loading, setLoading] = useState<boolean>(false)
    const { signUp, isLoaded, setActive } = useSignUp()
    const router = useRouter()
    const methods = useForm<UserRegistrationProps>({
        resolver: zodResolver(UserRegistrationSchema),
        defaultValues: {
            type: 'owner',
        },
        mode: 'onChange',
    })

    useEffect(() => {
        // Append CAPTCHA div to the document when the component mounts
        const captchaContainer = document.createElement("div")
        captchaContainer.id = "clerk-captcha"
        document.body.appendChild(captchaContainer)

        return () => {
            // Remove CAPTCHA div on unmount
            document.body.removeChild(captchaContainer)
        }
    }, [])

    const onGenerateOTP = async (
        email: string,
        password: string,
        onNext: React.Dispatch<React.SetStateAction<number>>
    ) => {
        if (!isLoaded) return

        try {
            await signUp.create({
                emailAddress: email,
                password: password,
            })

            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

            onNext((prev) => prev + 1)
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.errors[0].longMessage,
            })
        }
    }

    const onHandleSubmit = methods.handleSubmit(
        async (values: UserRegistrationProps) => {
            if (!isLoaded) return

            try {
                setLoading(true)

                // Ensure CAPTCHA is present
                const captchaContainer = document.getElementById("clerk-captcha")
                if (!captchaContainer) {
                    toast({
                        title: "Error",
                        description: "CAPTCHA verification failed. Please try again.",
                    })
                    setLoading(false)
                    return
                }

                // Clerk may automatically handle CAPTCHA, so you might not need manual validation
                // But if Clerk provides a method to get the token, call it here:
                // const captchaToken = await Clerk.getCaptchaToken(); // Uncomment if available

                const completeSignUp = await signUp.attemptEmailAddressVerification({
                    code: values.otp,
                })

                if (completeSignUp.status !== 'complete') {
                    toast({
                        title: "Error",
                        description: "Something went wrong!",
                    })
                    setLoading(false)
                    return
                }

                if (completeSignUp.status == 'complete') {
                    if (!signUp.createdUserId) return

                    const registered = await onCompleteUserRegistration(
                        values.fullname,
                        signUp.createdUserId,
                        values.type
                    )

                    if (registered?.status == 200 && registered.user) {
                        await setActive({
                            session: completeSignUp.createdSessionId,
                        })

                        setLoading(false)
                        router.push('/')
                    }

                    if (registered?.status == 400) {
                        toast({
                            title: 'Error',
                            description: 'Something went wrong!',
                        })
                    }
                }
            } catch (error: any) {
                toast({
                    title: 'Error',
                    description: error.errors[0].longMessage,
                })
            }
        }
    )

    return {
        methods,
        onHandleSubmit,
        onGenerateOTP,
        loading,
    }
}



// 'use client'

// import { useToast } from "@/components/ui/use-toast"
// import { useSignUp } from "@clerk/nextjs"
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useState } from "react"
// import { useForm } from "react-hook-form"
// import { UserRegistrationProps, UserRegistrationSchema } from "@/schemas/auth.schemas"
// import { onCompleteUserRegistration } from "@/actions/auth"
// import { useRouter } from "next/navigation"



// export const useSignUpForm = () => {
//     const { toast } = useToast()
//     const [loading, setLoading] = useState<boolean>(false)
//     const { signUp, isLoaded, setActive } = useSignUp()
//     const router = useRouter()
//     const methods = useForm<UserRegistrationProps>({
//       resolver: zodResolver(UserRegistrationSchema),
//       defaultValues: {
//         type: 'owner',
//       },
//       mode: 'onChange',
//     })

//     const onGenerateOTP = async (
//         email: string,
//         password: string,
//         onNext: React.Dispatch<React.SetStateAction<number>>
//       ) => {
//         if (!isLoaded) return
    
//         try {
//           await signUp.create({
//             emailAddress: email,
//             password: password,
//           })
    
//           await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
    
//           onNext((prev) => prev + 1)
//         } catch (error: any) {
//           toast({
//             title: 'Error',
//             description: error.errors[0].longMessage,
//           })
//         }
//       }

//       const onHandleSubmit = methods.handleSubmit(
//         async (values: UserRegistrationProps) => {
//           if (!isLoaded) return
    
//           try {
//             setLoading(true)
//             const completeSignUp = await signUp.attemptEmailAddressVerification({
//               code: values.otp,
//             })
    
//             if (completeSignUp.status !== 'complete') {
//               return { message: 'Something went wrong!' }
//             }
    
//             if (completeSignUp.status == 'complete') {
//               if (!signUp.createdUserId) return
    
//               const registered = await onCompleteUserRegistration(
//                 values.fullname,
//                 signUp.createdUserId,
//                 values.type
//               )
    
//               if (registered?.status == 200 && registered.user) {
//                 await setActive({
//                   session: completeSignUp.createdSessionId,
//                 })
    
//                 setLoading(false)
//                 router.push('/')
//               }
    
//               if (registered?.status == 400) {
//                 toast({
//                   title: 'Error',
//                   description: 'Something went wrong!',
//                 })
//               }
//             }
//           } catch (error: any) {
//             toast({
//               title: 'Error',
//               description: error.errors[0].longMessage,
//             })
//           }
//         }
//       )
//       return {
//         methods,
//         onHandleSubmit,
//         onGenerateOTP,
//         loading,
//       }
// }

