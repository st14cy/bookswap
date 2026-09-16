import React from 'react';
import Typography from '../../../shared/ui/Typography.tsx';

interface InfoBlockProps {
    title: string;
    children: React.ReactNode;
}

const InfoBlock: React.FC<InfoBlockProps> = ({ title, children }) => (
    <li className='flex flex-row gap-24 '>
        <Typography variant='label'>{title}</Typography>
        {children}
    </li>
);

export default InfoBlock;