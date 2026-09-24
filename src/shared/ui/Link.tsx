import React from 'react';

interface LinkProps {
    onClick?: () => void,
    disabled?: boolean,
    children?:  React.ReactNode,
    href?: string,
    className?: string
}

const Link:React.FC<LinkProps> = ({
    onClick,
    children='Ссылка',
    href='#',
                                      className=''}) => {

    return (
        <a
            href={href}
            onClick={onClick}
            className={`${className}`}
        >
            {children}
        </a>
    );
};

export default Link;