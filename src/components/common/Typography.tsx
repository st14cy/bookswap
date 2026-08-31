import React from 'react';

interface TypographyProps {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'body' | 'label' | 'caption';
    children: React.ReactNode;
    isTitle?: boolean;
}

const Typography: React.FC<TypographyProps> = ({
                                                   variant = 'body',
                                                   children,
                                                   isTitle = true,
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

    const getVariantStyles = () => {
        switch (variant) {
            case 'h1':  return isTitle ? 'text-[28px] font-bold  text-accent' : 'text-28';
            case 'h4': return 'text-16 font-bold';
            case 'label': return 'text-16';
            default: return 'text-base';
        }
    };

    const Tag = getTag();

    return (
        <Tag className={`m-0 ${getVariantStyles()}`}>
            {children}
        </Tag>
    );
};

export default Typography;