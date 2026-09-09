import React from 'react';

interface TypographyProps {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'label' | 'caption' | 'suptitle';
    children: React.ReactNode;
    isTitle?: boolean;
    weight?: 'regular' | 'bold';
    htmlFor?: string;
    className?: string;
}

const Typography: React.FC<TypographyProps> = ({
                                                   variant = 'span',
                                                   children,
                                                   isTitle = false,
                                                   weight = 'regular',
                                                   htmlFor,
                                                   className = '',
                                               }) => {
    const getTag = () => {
        switch (variant) {
            case 'h1': return 'h1';
            case 'h2': return 'h2';
            case 'h3': return 'h3';
            case 'h4': return 'h4';
            case 'span': return 'span';
            case 'label': return 'label';
            default: return 'p';
        }
    };

    const getWeightClass = () => {
        switch (weight) {
            case 'bold': return 'font-bold';
            case 'regular': return 'font-normal';
            default: return 'font-normal';
        }
    };

    const getVariantStyles = () => {
        switch (variant) {
            case 'h1': return isTitle ? 'text-[28px] text-accent' : 'text-[28px]';
            case 'h2': return 'text-[24px] uppercase';
            case 'h3': return 'text-[20px]';
            case 'h4': return 'text-[18px]';
            case 'label': return 'text-[20px]';
            case 'caption': return 'text-[12px]';
            default: return 'text-base';
        }
    };

    const Tag = getTag();

    const labelProps = variant === 'label' && htmlFor ? { htmlFor } : {};

    return (
        <Tag
            className={`m-0 ${getVariantStyles()} ${getWeightClass()} ${className}`}
            {...labelProps}
        >
            {children}
        </Tag>
    );
};

export default Typography;