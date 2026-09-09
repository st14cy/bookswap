import React from 'react';

interface LinkProps {
    onClick?: () => void,
    disabled?: boolean,
    children?:  React.ReactNode,
    href?: string,
}

const Link:React.FC<LinkProps> = ({
    onClick,
    children='Ссылка',
    href='#'}) => {
    return (
        <a href={href} onClick={onClick} className="cursor-pointer uppercase">
            {children}
        </a>
    );
};

export default Link;