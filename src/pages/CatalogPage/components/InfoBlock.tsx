import React from 'react';
import Typography from '../../../shared/ui/Typography.tsx';

interface InfoBlockProps {
    title: string;
    children: React.ReactNode;
}

const InfoBlock: React.FC<InfoBlockProps> = ({ title, children }) => (
    <div className='flex flex-col gap-24'>
        <Typography variant='label' weight='bold'>{title}</Typography>
        {children}
    </div>
);

export default InfoBlock;