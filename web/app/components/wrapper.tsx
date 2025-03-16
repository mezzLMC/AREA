import React from 'react';

export default function Wrapper({
    children,
    line,
    className = "",
    testID
}: {
    children: React.ReactNode;
    line: boolean;
    className?: string;
    testID?: string;
}) {
    return (
        <div
            className={`relative w-full h-full flex flex-row mx-3 ${className}`}
            data-testid={testID}
        >
            <div
                className={'absolute w-full h-full flex flex-row rounded-2xl'}
                style={{
                    border: `${line ? '1px' : '3px'} solid transparent`,
                    background: 'linear-gradient(150deg, rgba(207,207,252,0.5), rgba(207,207,252,0.1), rgba(207,207,252,0)) border-box',
                    WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    borderRadius: '16px',
                    zIndex: 1
                }}
            >
            </div>
            <div className={'w-full h-full rounded-2xl bg-[rgba(78,78,97,0.2)] flex flex-row'} style={{ zIndex: 2 }}>
                {children}
            </div>
        </div>
    );
}
