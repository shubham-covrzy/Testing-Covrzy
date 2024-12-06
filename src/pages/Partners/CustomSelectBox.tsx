
import React, { useState, useRef, useEffect } from 'react'
import { Check, ChevronDown, XCircle } from 'react-bootstrap-icons'
import style from './CustomSelectBox.module.css';
interface Option {
    value: string
    label: string
}

interface MultiSelectProps {
    options: Option[]
    onChange: (selectedOptions: Option[]) => void
    placeholder?: string
}

export function MultiSelect({ options, onChange, placeholder = "Select options" }: MultiSelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([])
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const toggleOption = (option: Option) => {
        const updatedSelection = selectedOptions.some((item) => item.value === option.value)
            ? selectedOptions.filter((item) => item.value !== option.value)
            : [...selectedOptions, option]

        setSelectedOptions(updatedSelection)
        onChange(updatedSelection)
    }

    const removeOption = (option: Option) => {
        const updatedSelection = selectedOptions.filter((item) => item.value !== option.value)
        setSelectedOptions(updatedSelection)
        onChange(updatedSelection)
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            setIsOpen(!isOpen)
        }
    }

    return (
        <div className={style.relativeCustom} ref={dropdownRef}>
            <div
                className={style.dropdownToggleCustom}
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                role="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <div className={style.selectedOptionsCustom}>
                    {selectedOptions.length > 0 ? (
                        selectedOptions.map((option) => (
                            <span key={option.value} className={style.selectedOptionCustom}>
                                {option.label}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeOption(option);
                                    }}
                                    className={style.removeBtnCustom}
                                    aria-label={`Remove ${option.label}`}
                                >
                                    <XCircle size={14} />
                                </button>
                            </span>
                        ))
                    ) : (
                        <span className={style.placeholderCustom}>{placeholder}</span>
                    )}
                </div>
                <ChevronDown size={20} className={`${style.dropdowArrowCustom} ${isOpen ? style.open : ''}`} />
            </div>
            {isOpen && (
                <ul
                    className={style.customDropdownMenu}
                    role="listbox"
                    aria-multiselectable="true"
                >
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={style.dropdownOptionCustom}
                            onClick={() => toggleOption(option)}
                            role="option"
                            aria-selected={selectedOptions.some((item) => item.value === option.value)}
                        >
                            <input
                                type="checkbox"
                                checked={selectedOptions.some((item) => item.value === option.value)}
                                onChange={() => { }}
                            />
                            {option.label}
                            {selectedOptions.some((item) => item.value === option.value) && (
                                <Check size={16} className={style.selectedCheckCustom} />
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

