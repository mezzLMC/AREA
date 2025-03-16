'use client'

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'

interface Props {
    onLoginPress: () => void
    onSignUpPress: () => void
}

enum Hex {
    'bg-black' = '#000000',
    'bg-white' = '#ffffff',
    'bg-gray-900' = '#111827',
    'bg-blue-700' = '#1D4ED8',
    'bg-fuchsia-300' = '#f0abfc'
}

interface CustomButtonProps {
    title: string
    onPress: () => void
    color: string
    textColor?: string
    children: React.ReactNode
    testId?: string
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, color, textColor = 'text-white', children, testId }) => (
    <button
        className={`w-[350px] h-[50px] z-10 p-4 rounded-full ${color} flex items-center justify-center mt-5`}
        style={{ boxShadow: `0 3px 5px ${Hex[color as keyof typeof Hex]}` }}
        onClick={onPress}
        data-testid={testId}
    >
        {children && <span className="mr-2">{children}</span>}
        <span className={`text-xl font-semibold ${textColor}`}>{title}</span>
    </button>
)

const ConnectButtons: React.FC<Props & { testId?: string }> = ({ onLoginPress, onSignUpPress, testId }) => (
    <div data-testid={testId || 'connect-buttons'} className="flex flex-col items-center space-y-10 w-full">
        <CustomButton
            title="Sign In"
            onPress={onLoginPress}
            color="bg-white"
            textColor="text-black"
            testId="sign-in-button"
        >
            <FontAwesomeIcon icon={faSignInAlt} style={{ color: '#000000' }} />
        </CustomButton>

        <CustomButton
            title="Get Started"
            onPress={onSignUpPress}
            color="bg-gray-900"
            testId="get-started-button"
        >
            <FontAwesomeIcon icon={faSignInAlt} style={{ color: '#ffffff' }} />
        </CustomButton>
    </div>
);

export { ConnectButtons, CustomButton }
