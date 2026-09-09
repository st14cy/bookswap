import React from 'react';

interface ButtonProps {
    variant?:'primary'| 'accent' | 'searchPrimary' | 'searchAccent' | 'subscribe',
    onClick?: () => void,
    disabled?: boolean,
    type?: 'button' | 'submit' | 'reset',
    children?: React.ReactNode,
}


const Button:React.FC<ButtonProps> = ({
    variant = 'primary',
    onClick,
    disabled=false,
    type='button',
    children='Кнопка'}) => {
    const variants={
        primary: 'bg-gray text-black rounded-12 py-22 px-20',
        accent: 'bg-accent text-white rounded-12 py-22 px-20',
        searchPrimary: 'bg-transparent text-black py-12 px-16',
        searchAccent: 'bg-accent rounded-12 text-white py-12 px-16',
        subscribe: 'bg-transparent text-blue  px-16',
    };
    return (
        <button type={type}
        onClick={onClick}
        disabled={disabled}
        className={variants[variant]}>
            {children}
        </button>
    );
};

export default Button;