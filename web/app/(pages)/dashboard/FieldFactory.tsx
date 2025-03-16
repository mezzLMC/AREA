/*
** EPITECH PROJECT, 2024
** area
** File description:
** ComponentFactory
*/

import React, { useEffect } from 'react';
import { Field, SelectFieldValue } from "@shared/types"
import dayjs from 'dayjs'
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Enrichment } from '@shared/services/types';

interface FieldComponentProps {
    updateFieldValue: (value: string) => void;
    enrichments?: Enrichment[];
}

const HourComponent = ({ updateFieldValue } : FieldComponentProps) => {
    const [timeValue, setTimeValue] = React.useState<dayjs.Dayjs>(dayjs())

    useEffect(() => {
        updateFieldValue(timeValue.toISOString())
    }, [timeValue])

    return (
        <div className={'w-[200px]'} data-testid="hour-component">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                    ampm={false}
                    className={'bg-white text-white'}
                    value={timeValue}
                    timeSteps={{ hours: 1, minutes: 1 }}
                    onChange={(newTime) => newTime && setTimeValue(newTime)}
                    data-testid="time-picker"
                />
            </LocalizationProvider>
        </div>
    )
}

const DateHourComponent = ({ updateFieldValue } : FieldComponentProps) => {
    const [dateValue, setDateValue] = React.useState<dayjs.Dayjs>(dayjs())
    const [timeValue, setTimeValue] = React.useState<dayjs.Dayjs>(dayjs())
    const updateDateTimeFieldValue = () => {
        const combinedValue = `${dayjs(dateValue).format('ddd MMM DD YYYY')} ${dayjs(timeValue).format('HH:mm:ss [GMT]ZZ')}`
        updateFieldValue(combinedValue)
    }

    useEffect(() => {
        updateDateTimeFieldValue()
    }, [dateValue, timeValue])

    return (
        <div className={'flex flex-col justify-center items-center'} data-testid="date-hour-component">
            <div className={'w-[200px] h-[120px] gap-y-5 flex flex-col items-center justify-center'}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        className={'bg-white/40 rounded text-white'}
                        value={dateValue}
                        format={"DD/MM/YYYY"}
                        onChange={(newDate) => {
                            if (newDate)
                                setDateValue(newDate);
                        }}
                        data-testid="date-picker"
                    />
                    <TimePicker
                        className={'bg-white/40 rounded text-white'}
                        value={timeValue}
                        timeSteps={{hours: 1, minutes: 1}}
                        ampm={false}
                        onChange={(newTime) => {
                            if (newTime)
                                setTimeValue(newTime);
                        }}
                        data-testid="time-picker"
                    />
                </LocalizationProvider>
            </div>
        </div>
    )
}

const TextFieldComponent = ({ updateFieldValue, enrichments } : FieldComponentProps) => {

    const [fieldValue, setFieldValue] = React.useState<string>('');
    const textFieldRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        updateFieldValue(fieldValue);
    }, [fieldValue])

    const onEnrichmentClick = (enrichment: Enrichment) => {
        setFieldValue((prev) => `${prev  }{{${enrichment.id}}}`);
        textFieldRef.current?.focus();
    }

    return (
        <div className=''>
            <input ref={textFieldRef} type="text" value={fieldValue} onChange={(e) => setFieldValue(e.target.value)} className="border p-2 rounded" />
            <div className='flex flex-row gap-2 mt-4'>
                {enrichments?.map((enrichment) => (
                    <button key={enrichment.id} onClick={() => onEnrichmentClick(enrichment)} className="bg-blue-500 p-2 rounded text-white">{enrichment.name}</button>
                ))}
            </div>
        </div>
    )
}

const SelectFieldComponent = ({ updateFieldValue, options } : FieldComponentProps & {options: SelectFieldValue[]}) => {
    const [fieldValue, setFieldValue] = React.useState<string>(options[0].value);

    useEffect(() => {
        updateFieldValue(fieldValue);
    }, [fieldValue])

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setFieldValue(e.target.value);
    }

    return (
        <select
            value={fieldValue}
            onChange={onChange}
            className="border p-2 rounded w-1/2"
            data-testid="select-field"
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>{option.name}</option>
            ))}
        </select>
    )
}

interface ComponentsByTypeProps {
    field: Field;
    updateField: (value: string) => void;
    fieldName: string;
    enrichments?: Enrichment[];
}

const FieldFactory = ({ updateField, field, fieldName, enrichments }: ComponentsByTypeProps) => (
    <div className={'w-full flex p-0 h-auto text-black flex-col items-center gap-2 justify-center'}>
        <label className="text-xl text-white font-bold">{fieldName}</label>
        {field.type === "date" && <DateHourComponent updateFieldValue={updateField} />}
        {field.type === "hour" && <HourComponent updateFieldValue={updateField} />}
        {field.type === "text_field" && <TextFieldComponent updateFieldValue={updateField} enrichments={enrichments} />}
        {field.type === "select_field" && <SelectFieldComponent updateFieldValue={updateField} options={field.values!} />}
    </div>
)

export default FieldFactory;
