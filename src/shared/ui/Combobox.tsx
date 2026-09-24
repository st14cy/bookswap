import React, {useEffect, useId, useMemo, useState} from 'react';

export interface ComboboxOption {
    id: string;
    name: string;
}

interface ComboboxProps {
    id?: string;
    label: string;
    placeholder?: string;
    options: ComboboxOption[];
    selectedId: string;
    onSelect: (id: string) => void;
    isLoading?: boolean;
    error?: string;
    onRetry?: () => void;
    disabled?: boolean;
}


const Combobox: React.FC<ComboboxProps> = ({
    id,
    label,
    placeholder,
    options,
    selectedId,
    onSelect,
    isLoading = false,
    error = '',
    onRetry,
    disabled = false,
}) => {
    const styles = {
        input: 'w-full bg-gray rounded-12 py-22 px-20 text-16 placeholder:text-16',
        list: 'absolute left-0 right-0 top-full z-20 mt-1 max-h-72 overflow-auto rounded-12 bg-white shadow-lg border border-gray py-1',
        option: 'px-20 py-2 cursor-pointer select-none',
        optionActive: 'bg-gray',
        hint: 'px-20 py-2 text-black/50',
    };

    const generatedId = useId();
    const inputId = id ?? generatedId;
    const listId = `${inputId}-listbox`;

    const selectedName = options.find((o) => o.id === selectedId)?.name ?? '';

    const [text, setText] = useState(selectedName);
    const [isOpen, setIsOpen] = useState(false);
    const [isFiltering, setIsFiltering] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    useEffect(() => {
        setText(selectedName);
    }, [selectedName]);

    const visibleOptions = useMemo(() => {
        const query = text.trim().toLowerCase();
        if (!isFiltering || !query) return options;
        return options.filter((o) => o.name.toLowerCase().includes(query));
    }, [options, text, isFiltering]);

    const open = () => {
        if (disabled) return;
        setIsOpen(true);
        setActiveIndex(Math.max(0, visibleOptions.findIndex((o) => o.id === selectedId)));
    };

    const close = () => {
        setIsOpen(false);
        setIsFiltering(false);
        setText(selectedName);
        setActiveIndex(-1);
    };

    const select = (option: ComboboxOption) => {
        onSelect(option.id);
        setText(option.name);
        setIsOpen(false);
        setIsFiltering(false);
        setActiveIndex(-1);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
        setIsFiltering(true);
        setIsOpen(true);
        setActiveIndex(0);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (!isOpen) { open(); return; }
                if (visibleOptions.length) setActiveIndex((i) => (i + 1) % visibleOptions.length);
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (!isOpen) { open(); return; }
                if (visibleOptions.length) setActiveIndex((i) => (i <= 0 ? visibleOptions.length - 1 : i - 1));
                break;
            case 'Enter':
                if (isOpen) {
                    e.preventDefault();
                    const option = visibleOptions[activeIndex];
                    if (option) select(option);
                }
                break;
            case 'Escape':
                if (isOpen) {
                    e.preventDefault();
                    close();
                }
                break;
        }
    };

    return (
        <div className="relative">
            <label className="visually-hidden" htmlFor={inputId}>{label}</label>
            <input
                id={inputId}
                type="text"
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={isOpen}
                aria-controls={listId}
                aria-activedescendant={isOpen && activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
                autoComplete="off"
                placeholder={isLoading ? 'Загрузка жанров…' : placeholder}
                disabled={disabled || isLoading}
                value={text}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={open}
                onClick={open}
                onBlur={close}
                className={`${styles.input} pr-12`}
            />
            <span aria-hidden="true" className="pointer-events-none absolute right-20 top-1/2 -translate-y-1/2">
                ▾
            </span>

            {isOpen && (
                <ul id={listId} role="listbox" className={styles.list}>
                    {visibleOptions.length === 0 && (
                        <li className={styles.hint}>
                            {options.length === 0 ? 'Список жанров пуст' : 'Такого жанра нет'}
                        </li>
                    )}
                    {visibleOptions.map((option, index) => (
                        <li
                            key={option.id}
                            id={`${listId}-${index}`}
                            role="option"
                            aria-selected={option.id === selectedId}
                            className={`${styles.option} ${index === activeIndex ? styles.optionActive : ''} ${option.id === selectedId ? 'font-bold' : ''}`}
                            onMouseDown={(e) => { e.preventDefault(); select(option); }}
                            onMouseEnter={() => setActiveIndex(index)}
                        >
                            {option.name}
                        </li>
                    ))}
                </ul>
            )}

            {error && (
                <div role="alert" className="mt-2 text-accent">
                    {error}{' '}
                    {onRetry && (
                        <button type="button" className="text-blue underline" onClick={onRetry}>
                            Повторить
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Combobox;
