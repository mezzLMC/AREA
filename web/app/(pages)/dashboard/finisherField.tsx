import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { AreaPayload } from '@shared/Api'
import { AReaInfo, ServiceInfo } from '@shared/types'
import { Enrichment } from '@shared/services/types'
import { CustomButton } from '@/app/components/buttons/classicButtons'
import FieldFactory from './FieldFactory'

interface finisherFieldProps {
    app: ServiceInfo | null;
    setPayload: React.Dispatch<React.SetStateAction<AreaPayload | null>>;
    selectedArea: AReaInfo | null;
    handleClose: () => void;
    setModalNextState: () => void;
    enrichments?: Enrichment[];
}

export default function FinisherField({ app, selectedArea, setPayload, setModalNextState, handleClose, enrichments }: finisherFieldProps) {
    if (!app || !selectedArea) return null;

    const [fields, setFields] = React.useState<Record<string, string>>(
        selectedArea.fields.reduce((acc, field) => {
            acc[field.id] = "";
            return acc;
        }, {} as Record<string, string>)
    );

    const payload: AreaPayload = {
        id: selectedArea.id,
        service: app.id,
        fields
    }

    const generateFieldUpdate = (fieldId: string) => (value: string) => {
        setFields((prev) => ({ ...prev, [fieldId]: value }));
    }

    return (
        <div className={'w-full h-full flex flex-col items-center justify-center'} data-testid="finisher-field">
            <div className={'w-10 h-10 absolute top-10 right-5'}>
                <button onClick={handleClose} className="w-3 h-3 flex justify-center items-center" data-testid="close-button">
                    <svg className="w-10 h-10 scale-[4]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.34315 6.34315C6.73367 5.95262 7.36683 5.95262 7.75736 6.34315L12 10.5858L16.2426 6.34315C16.6332 5.95262 17.2663 5.95262 17.6569 6.34315C18.0474 6.73367 18.0474 7.36683 17.6569 7.75736L13.4142 12L17.6569 16.2426C18.0474 16.6332 18.0474 17.2663 17.6569 17.6569C17.2663 18.0474 16.6332 18.0474 16.2426 17.6569L12 13.4142L7.75736 17.6569C7.36683 18.0474 6.73367 18.0474 6.34315 17.6569C5.95262 17.2663 5.95262 16.6332 6.34315 16.2426L10.5858 12L6.34315 7.75736C5.95262 7.36683 5.95262 6.73367 6.34315 6.34315Z"
                            fill="white"
                        />
                    </svg>
                </button>
            </div>
            <div className={'w-auto h-1/5 flex justify-start items-center'}>
                <img src={app.imageURL} alt={app.id} className={'w-[90px] h-auto'} data-testid="app-image"/>
            </div>
            <div className={'w-full h-1/2 text-center flex flex-col gap-8 items-center justify-center'} data-testid="fields-container">
                {selectedArea.fields.map((field) => (
                    <FieldFactory
                    enrichments={enrichments}
                    field={field}
                    updateField={generateFieldUpdate(field.id)}
                    key={field.name}
                    fieldName={field.name}
                    />
                ))}
            </div>
            <CustomButton
                title={'Finish your Action'}
                onPress={() => {
                    setPayload(payload);
                    setModalNextState();
                }}
                color={'bg-fuchsia-300'}
                data-testid="finish-button"
            >
                <FontAwesomeIcon icon={faCheck} style={{ color: '#000000' }} />
            </CustomButton>
        </div>
    )
}
