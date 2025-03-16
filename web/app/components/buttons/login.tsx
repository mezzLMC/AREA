import { useCookies } from 'next-client-cookies'
import React, { useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import API from '@shared/Api'
import { CustomButton } from '@/app/components/buttons/classicButtons'

export default function LoginButtons({ setShown }: { setShown: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [username, setUsername] = useState('')
    const cookiesStore = useCookies()
    const [userId, setUserId] = useState<number | null>(null);
    const api = new API('http://localhost:8080/api')

    const accessSiteWithUsername = (e: React.FormEvent) => {
        if (!cookiesStore || !userId) return
        const validateForm = () => {
            const newError = { us: username ? null : 'Username is required*' }
            return !Object.values(newError).some((formError) => formError)
        }
        e.preventDefault()
        if (validateForm() && username && cookiesStore) {
            const accessToken = cookiesStore.get('accessToken')
            if (!accessToken) {
                window.location.href = '/'
                return
            }
            api.users.updateUser(userId.toString(), username, '', accessToken)
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            const { status, body } = await api.auth.loginWithGoogle(codeResponse.code)
            if (status !== 200 && status !== 201) return
            const { token, id } = body
            cookiesStore.set('accessToken', token)
            window.location.href = '/dashboard'
            setUserId(id)
        },
        flow: 'auth-code'
    })

    return (
        <div className="flex flex-col h-full items-center space-y-10 w-full">
            {!userId ? (
                <>
                    <CustomButton
                        title="Sign In with Google"
                        onPress={googleLogin}
                        color="bg-white"
                        textColor="text-black"
                        data-testid="google-login-button"
                    >
                        <FontAwesomeIcon icon={faGoogle} style={{ color: '#000000' }} />
                    </CustomButton>

                    <CustomButton
                        title="Sign in with Email"
                        onPress={() => setShown(true)}
                        color="bg-black"
                        textColor="text-white"
                        data-testid="email-login-button"
                    >
                        <FontAwesomeIcon icon={faEnvelope} style={{ color: '#ffffff' }} />
                    </CustomButton>
                </>
            ) : (
                userId && (
                    <>
                        <form
                            className={`w-full z-50 h-full flex flex-col items-center justify-center`}
                            onSubmit={(e) => {
                                e.preventDefault()
                                accessSiteWithUsername(e)
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    accessSiteWithUsername(e)
                                }
                            }}
                        >
                            <div className={'w-[350px] h-[70px]'}>
                                <input
                                    type={'text'}
                                    name={'username'}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder={'New Username'}
                                    className="w-full z-999 text-center text-xl h-[50px] p-4 rounded-full bg-transparent border-2 border-[rgba(78,78,97,0.4)] text-white"
                                    data-testid="username-input"
                                />
                            </div>
                            <CustomButton
                                title="Sign In"
                                onPress={accessSiteWithUsername}
                                color="bg-black"
                                data-testid="sign-in-button"
                            >
                                <FontAwesomeIcon icon={faSignInAlt} style={{ color: '#ffffff' }} />
                            </CustomButton>
                        </form>
                    </>
                )
            )}
        </div>
    )
}
