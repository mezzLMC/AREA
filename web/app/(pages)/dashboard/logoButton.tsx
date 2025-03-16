import React from 'react'
import { LogoButtonProps } from '@/app/(pages)/dashboard/areaModal'

export default function LogoButton({ service, setModalNextState, setSelectedService }: LogoButtonProps) {
    const [isHovered, setIsHovered] = React.useState(false)

    return (
        <div
            className={`w-[110px] h-[110px] z-0 relative flex items-center justify-center rounded-xl transition-all duration-300 ${isHovered ? 'border-none' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            data-testid="logo-button-container"
        >
            <div
                className={`w-[110px] absolute h-[110px] z-0 rounded-xl flex`}
                style={{
                    border: '2px solid transparent',
                    background: isHovered ? 'linear-gradient(150deg, rgba(207, 207, 252, 0.5), rgba(207, 207, 252, 0.1), rgba(207, 207, 252, 0)) border-box' : 'transparent',
                    WebkitMask: isHovered ? 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)' : undefined,
                    WebkitMaskComposite: isHovered ? 'xor' : undefined,
                    maskComposite: isHovered ? 'exclude' : undefined
                }}
                data-testid="logo-button-background"
            ></div>
            <button
                onClick={() => {
                    setSelectedService(service);
                    setModalNextState();
                }}
                className={`w-[90px] relative h-[90px] z-1 rounded-md flex justify-center items-center`}
                style={{
                    backgroundImage: `url('${service.imageURL}')`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}
                data-testid="logo-button"
            ></button>
        </div>
    )
}
