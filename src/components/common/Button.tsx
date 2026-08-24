import React from 'react';

interface ButtonProps {
    variant?:'primary'| 'accent',
    onClick?: () => void,
    disabled?: boolean,
    type?: 'button' | 'submit' | 'reset',
    children?: string,
}


const Button:React.FC<ButtonProps> = ({
    variant = 'primary',
    onClick,
    disabled=false,
    type='submit',
    children='Кнопка'}) => {
    const variants={
        primary: 'bg-gray text-black',
        accent: 'bg-accent text-white',
    };
    return (
        <button type={type}
        onClick={onClick}
        disabled={disabled}
        className={`rounded-12 py-22 px-20 ${variants[variant]}`}>
            {children}
        </button>
    );
};

export default Button;