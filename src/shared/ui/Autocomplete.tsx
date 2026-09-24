import React, {useEffect, useId, useRef, useState} from 'react';

interface AutocompleteProps<T> {
    id?: string;
    name?: string;
    label: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    fetchSuggestions: (query: string, signal: AbortSignal) => Promise<T[]>;
    onSelect: (item: T) => void;
    getKey: (item: T, index: number) => string;
    renderItem: (item: T) => React.ReactNode;
    minChars?: number;
    debounceMs?: number;
    disabled?: boolean;
}


function Autocomplete<T>({
    id,
    name,
    label,
    placeholder,
    value,
    onChange,
    fetchSuggestions,
    onSelect,
    getKey,
    renderItem,
    minChars = 2,
    debounceMs = 300,
    disabled = false,
}: AutocompleteProps<T>) {
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

    const [items, setItems] = useState<T[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [activeIndex, setActiveIndex] = useState(-1);

    const timerRef = useRef<number | undefined>(undefined);
    const abortRef = useRef<AbortController | null>(null);

    const cancelPending = () => {
        window.clearTimeout(timerRef.current);
        abortRef.current?.abort();
        abortRef.current = null;
    };

    useEffect(() => cancelPending, []);

    const requestSuggestions = (query: string) => {
        cancelPending();
        if (query.trim().length < minChars) {
            setItems([]);
            setIsOpen(false);
            setIsLoading(false);
            return;
        }

        setIsOpen(true);
        setIsLoading(true);
        setError('');

        timerRef.current = window.setTimeout(async () => {
            const controller = new AbortController();
            abortRef.current = controller;
            try {
                const result = await fetchSuggestions(query, controller.signal);
                if (controller.signal.aborted) return;
                setItems(result);
                setActiveIndex(-1);
            } catch (e) {
                if (controller.signal.aborted) return;
                setItems([]);
                setError(e instanceof Error ? e.message : 'Не удалось загрузить подсказки');
            } finally {
                if (!controller.signal.aborted) setIsLoading(false);
            }
        }, debounceMs);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
        requestSuggestions(e.target.value);
    };

    const select = (item: T) => {
        cancelPending();
        onSelect(item);
        setIsOpen(false);
        setItems([]);
        setActiveIndex(-1);
        setIsLoading(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isOpen || items.length === 0) {
            if (e.key === 'Escape') setIsOpen(false);
            return;
        }
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setActiveIndex((i) => (i + 1) % items.length);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setActiveIndex((i) => (i <= 0 ? items.length - 1 : i - 1));
                break;
            case 'Enter':
                if (activeIndex >= 0) {
                    e.preventDefault();
                    select(items[activeIndex]);
                }
                break;
            case 'Escape':
                e.preventDefault();
                setIsOpen(false);
                break;
        }
    };

    const showList = isOpen && (isLoading || error !== '' || items.length > 0 || value.trim().length >= minChars);

    return (
        <div className="relative">
            <label className="visually-hidden" htmlFor={inputId}>{label}</label>
            <input
                id={inputId}
                name={name}
                type="text"
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={showList}
                aria-controls={listId}
                aria-activedescendant={activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
                autoComplete="off"
                placeholder={placeholder}
                disabled={disabled}
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={() => { if (items.length > 0) setIsOpen(true); }}
                onBlur={() => setIsOpen(false)}
                className={styles.input}
            />

            {showList && (
                <ul id={listId} role="listbox" className={styles.list}>
                    {isLoading && <li className={styles.hint}>Ищем…</li>}
                    {!isLoading && error && <li className={styles.hint}>{error}</li>}
                    {!isLoading && !error && items.length === 0 && (
                        <li className={styles.hint}>Ничего не найдено — можно ввести вручную</li>
                    )}
                    {!isLoading && items.map((item, index) => (
                        <li
                            key={getKey(item, index)}
                            id={`${listId}-${index}`}
                            role="option"
                            aria-selected={index === activeIndex}
                            className={`${styles.option} ${index === activeIndex ? styles.optionActive : ''}`}
                            onMouseDown={(e) => { e.preventDefault(); select(item); }}
                            onMouseEnter={() => setActiveIndex(index)}
                        >
                            {renderItem(item)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Autocomplete;
