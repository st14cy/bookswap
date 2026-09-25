import React from 'react';

interface InputProps {
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'search';
    disabled?: boolean;
    placeholder?: string;
    id?: string;
    name?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    style?: 'base' | 'search';
    label?: string;
    autoComplete?: string;
}

const Input: React.FC<InputProps> = ({
                                         type = 'text',
                                         disabled = false,
                                         placeholder = '',
                                         id,
                                         name,
                                         value,
                                         onChange,
                                         style = 'base',
                                         label = 'Введите данные',
                                         autoComplete,
                                     }) => {
    const styles = {
        base: 'bg-gray rounded-12 py-22 px-20 text-16 placeholder:text-16',
        search: 'min-w-0 flex-1 bg-transparent px-36 focus:outline-none focus:ring-0 focus:shadow-none text-16 placeholder:text-16',
    };

    return (
        <>
            <label className="visually-hidden" htmlFor={id}>
                {label}
            </label>
            <input
                name={name}
                type={type}
                disabled={disabled}
                placeholder={placeholder}
                id={id}
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
                className={styles[style]}
            />
        </>
    );
};

export default Input;
