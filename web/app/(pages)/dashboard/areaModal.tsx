import React, { useEffect } from 'react'
import { AReaInfo, ServiceInfo } from '@shared/types'
import { useCookies } from 'next-client-cookies'
import API, { AreaPayload } from '@shared/Api'
import Wrapper from '@/app/components/wrapper'
import FinisherField from '@/app/(pages)/dashboard/finisherField'
import LogoButton from '@/app/(pages)/dashboard/logoButton'
import ActionModalList from '@/app/(pages)/dashboard/actionModalList'

export enum modalState {
    ACTION_CHOOSE_APP,
    ACTION_CHOOSE_ACTION,
    ACTION_FILL_FIELDS,
    REACTION_CHOOSE_APP,
    REACTION_CHOOSE_REACTION,
    REACTION_FILL_FIELDS,
    AREA_FINISH,
}

export const modalStateTitles = {
    [modalState.ACTION_CHOOSE_APP]: 'Choose your If app',
    [modalState.ACTION_CHOOSE_ACTION]: 'What should it do ?',
    [modalState.ACTION_FILL_FIELDS]: 'Fill the fields',
    [modalState.REACTION_CHOOSE_APP]: 'Choose your Then app',
    [modalState.REACTION_CHOOSE_REACTION]: 'What should it do ?',
    [modalState.REACTION_FILL_FIELDS]: 'Fill the fields',
    [modalState.AREA_FINISH]: ""
}

export interface ActionProps {
    actions: AReaInfo[]
    id: string
    image: string
}

export interface ReactionProps {
    reactions: AReaInfo[]
    id: string
    image: string
}

export interface LogoButtonProps {
    service: ServiceInfo;
    setSelectedService: (app: ServiceInfo | null) => void;
    setModalNextState: () => void;
}

export default function AreaModal({ show, handleClose, setPassed }: { show: boolean; handleClose: () => void; passed: boolean; setPassed: React.Dispatch<React.SetStateAction<boolean>> }) {
    if (!show) return null

    const [modalStateInfo, setModalStateInfo] = React.useState<{
        modalState: modalState
        title: string
    }>({ modalState: modalState.ACTION_CHOOSE_APP, title: 'Choose your If app' })
    const [availableServices, setAvailableServices] = React.useState<ServiceInfo[] | null>(null);
    const [selectedApp, setSelectedApp] = React.useState<ServiceInfo | null>(null);
    const [selectedAction, setSelectedAction] = React.useState<AReaInfo | null>(null);
    const [selectedReaction, setSelectedReaction] = React.useState<AReaInfo | null>(null);
    const [actionPayload, setActionPayload] = React.useState<AreaPayload | null>(null)
    const [reactionPayload, setReactionPayload] = React.useState<AreaPayload | null>(null);
    const accessToken = useCookies().get("accessToken")!;
    const api = new API(process.env.NEXT_PUBLIC_API_URL!);

    useEffect(() => {
        if (availableServices !== null) return;
        api.services.getAll(accessToken).then(({ body }) => setAvailableServices(body.services))
    }, [])

    useEffect(() => {
        if (modalStateInfo.modalState !== modalState.AREA_FINISH) return
        if (!actionPayload || !reactionPayload) return
        const startArea = async () => {
            await api.services.sendService(actionPayload, reactionPayload, accessToken)
            handleClose();
            setPassed(true);
        }
        startArea()
    }, [modalStateInfo])

    const setNextModalState = () => {
        const nextModalState = modalStateInfo.modalState + 1 as modalState;
        setModalStateInfo({ modalState: nextModalState, title: modalStateTitles[nextModalState] });
    }

    const RenderModalState = () => {
        if (!availableServices) return null;

        if (modalStateInfo.modalState === modalState.ACTION_CHOOSE_APP
        || modalStateInfo.modalState === modalState.REACTION_CHOOSE_APP) {
            return (
                <div className={'w-full h-[100%] flex items-center justify-center'}>
                    <div className="w-fit h-fit flex items-center justify-center">
                        {availableServices.filter(service =>
                        (modalStateInfo.modalState === modalState.ACTION_CHOOSE_APP && service.actionCount)
                        || (modalStateInfo.modalState === modalState.REACTION_CHOOSE_APP && service.reactionCount))
                        .map((value) => (
                            <LogoButton
                                key={value.id}
                                setModalNextState={setNextModalState}
                                service={value}
                                setSelectedService={setSelectedApp}
                                data-testid={`logo-button-${value.id}`}
                            />
                        ))}
                    </div>
                </div>
            )
        }
        if (modalStateInfo.modalState === modalState.ACTION_CHOOSE_ACTION
        || modalStateInfo.modalState === modalState.REACTION_CHOOSE_REACTION) {
            return (
                <ActionModalList
                    app={selectedApp}
                    handleClose={handleClose}
                    setSelectedArea={modalStateInfo.modalState === modalState.ACTION_CHOOSE_ACTION ? setSelectedAction : setSelectedReaction}
                    setModalNextState={setNextModalState}
                    state={modalStateInfo.modalState}
                />
            )
        }
        return (
            <FinisherField
                app={selectedApp}
                selectedArea={modalStateInfo.modalState === modalState.ACTION_FILL_FIELDS ? selectedAction : selectedReaction}
                setPayload={modalStateInfo.modalState === modalState.ACTION_FILL_FIELDS ? setActionPayload : setReactionPayload}
                handleClose={handleClose}
                setModalNextState={setNextModalState}
                enrichments={modalStateInfo.modalState === modalState.REACTION_FILL_FIELDS ? selectedAction?.enrichments : undefined}
            />
        )
    }

    return (
        <div className="w-full z-40 h-screen flex justify-center items-center flex-col absolute">
            <div className="absolute inset-0 backdrop-blur-md bg-black/80"></div>
            <p className="text-white text-3xl z-10 mb-10">{modalStateInfo.title}</p>
            <div className="w-[30%] h-[60%]">
                <Wrapper line={false}>
                    <div className={'w-10 h-10 absolute top-10 right-5'}>
                        <button onClick={handleClose} className="w-3 h-3 flex justify-center items-center" data-testid="close-button">
                            <svg className="w-10 h-10 scale-[4]" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6.34315 6.34315C6.73367 5.95262 7.36683 5.95262 7.75736 6.34315L12 10.5858L16.2426 6.34315C16.6332 5.95262 17.2663 5.95262 17.6569 6.34315C18.0474 6.73367 18.0474 7.36683 17.6569 7.75736L13.4142 12L17.6569 16.2426C18.0474 16.6332 18.0474 17.2663 17.6569 17.6569C17.2663 18.0474 16.6332 18.0474 16.2426 17.6569L12 13.4142L7.75736 17.6569C7.36683 18.0474 6.73367 18.0474 6.34315 17.6569C5.95262 17.2663 5.95262 16.6332 6.34315 16.2426L10.5858 12L6.34315 7.75736C5.95262 7.36683 5.95262 6.73367 6.34315 6.34315Z"
                                    fill="white"
                                />
                            </svg>
                        </button>
                    </div>
                    <RenderModalState />
                </Wrapper>
            </div>
        </div>
    )
}
