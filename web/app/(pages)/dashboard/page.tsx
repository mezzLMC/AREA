'use client'

import React, { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import API, { HistoryArea } from '@shared/Api'
import { useCookies } from "next-client-cookies";
import Menu from '@/app/components/menu'
import { RoseGlow, VioletGlow } from '@/app/components/bgGlow'
import { CustomButton } from '@/app/components/buttons/classicButtons'
import Wrapper from '@/app/components/wrapper'
import AreaModal from '@/app/(pages)/dashboard/areaModal'
import './scrollBar.css'

const AreaBlock = ({ src } : { src: HistoryArea }) => {

    const ActionSection = ({ side }: { side: boolean }) => (
        <div className={`w-full h-full flex ${side ? 'justify-end' : 'justify-start'} items-center`}>
            {!side && (
                <div
                    className="w-[90px] h-[90px] rounded-md ml-10"
                    style={{
                        backgroundImage: `url('${src.action.image}')`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                    }}
                ></div>
            )}
            <div className={`w-full h-full ${side ? 'mr-10 justify-end' : 'ml-10 justify-start'} items-center flex text-lg`}>{side ? src.reaction.name : src.action.name}</div>
            {side && (
                <div
                    className="w-[90px] h-[90px] rounded-md mr-10"
                    style={{
                        backgroundImage: `url('${src.reaction.image}')`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                    }}
                ></div>
            )}
        </div>
    )

    return (
        <div data-testid="area-block">
            <div className="w-full h-[100px] flex flex-row">
                <ActionSection side={false} />
                <ActionSection side={true} />
            </div>
            <div className="w-full h-0">
                <Wrapper line={true}>
                    <></>
                </Wrapper>
            </div>
        </div>
    )
}

const DashBoard = ({ openModal, isModalOpen, setPassed }: { openModal: () => void; isModalOpen: boolean; setPassed: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const Api = new API(process.env.NEXT_PUBLIC_API_URL!);
    const cookiesStore = useCookies();
    const token = cookiesStore.get("accessToken")!;
    const [history, setHistory] = useState<HistoryArea[] | null>(null);
    
    useEffect(() => {
        if (history !== null) return;
        Api.services.getMe(token).then((res) => {
            setHistory(res.body);
        });
    }, []);

    return (
        <div className="w-full h-full justify-center items-center flex pt-36 pb-12" data-testid="dashboard-page">
            <div className="w-1/2 h-full flex justify-start items-center flex-col">
                <h1 className="w-auto h-24 flex text-center text-5xl font-bold" data-testid="dashboard-title">Your AREAS</h1>
                <div className="w-full h-4/5 flex justify-center items-center flex-col mb-10 rounded-none">
                    <Wrapper line={false}>
                        <div className="w-full h-11/12 justify-end items-center rounded-2xl overflow-x-hidden overflow-y-auto z-20 scrollbar-thumb-gray-800/50 scrollbar-track-transparent custom-scrollbar">
                            {history && history.map((area) => (
                                <AreaBlock src={area} key={area.id} />
                            ))}
                        </div>
                    </Wrapper>
                </div>
                {!isModalOpen && (
                    <CustomButton
                        color={'bg-fuchsia-300'}
                        textColor={'text-black'}
                        title={'Create an AREA'}
                        onPress={() => {
                            openModal()
                            setPassed(false)
                        }}
                        data-testid="create-area-button"
                    >
                        <FontAwesomeIcon icon={faPlus} size={'xl'} style={{ color: '#000000' }} />
                    </CustomButton>
                )}
            </div>
        </div>
    )
}

export default function DashBoardPage() {
    const [passed, setPassed] = React.useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)

    const openModal = () => {
        setIsModalOpen(true)
    }
    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <main data-testid="dashboard-page-container">
            <Menu />
            <AreaModal show={isModalOpen} handleClose={closeModal} passed={passed} setPassed={setPassed} />
            <div className="w-full h-full justify-end items-center flex flex-col">
                <RoseGlow />
                <VioletGlow />
                <DashBoard isModalOpen={isModalOpen} openModal={openModal} setPassed={setPassed} />
            </div>
        </main>
    )
}
