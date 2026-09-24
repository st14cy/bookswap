import React from 'react';

interface ButtonProps {
    variant?:'primary'| 'accent' | 'searchPrimary' | 'searchAccent' | 'subscribe' | 'exit',
    onClick?: () => void,
    disabled?: boolean,
    type?: 'button' | 'submit' | 'reset',
    children?: React.ReactNode,
    className?: string
}

const Button:React.FC<ButtonProps> = ({
    variant = 'primary',
    onClick,
    disabled=false,
    type='button',
    children='Кнопка',
                                          className = ''}) => {
    const variants={
        primary: 'bg-gray text-black rounded-12 py-22 px-20',
        accent: 'bg-accent text-white rounded-12 py-22 px-20 hover:bg-accent/80',
        searchPrimary: 'bg-transparent text-black py-12 px-16 ',
        searchAccent: 'bg-accent rounded-12 text-white py-12 px-16 ',
        subscribe: 'bg-transparent text-blue',
    };
    return (
        <button type={type}
                onClick={onClick}
                disabled={disabled}
                className={`${variants[variant]} ${className}`}>
            {children}
        </button>
    );
};

export default Button;