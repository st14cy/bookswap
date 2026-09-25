import React, { useState } from 'react';


interface LikeControlProps {
    isLiked?: boolean;
    onToggle?: () => void;
    disabled?: boolean;
}

const LikeControl: React.FC<LikeControlProps> = ({ isLiked, onToggle, disabled = false }) => {
    const [localLiked, setLocalLiked] = useState(false);
    const liked = isLiked ?? localLiked;

    const handleChange = () => {
        if (onToggle) onToggle();
        else setLocalLiked((v) => !v);
    };

    return (
        <label title={liked ? 'Убрать из избранного' : 'В избранное'} className={`
            w-46 h-46 
            bg-white rounded-full 
            absolute 
            right-4 bottom-[-15px]  
            flex items-center justify-center 
            cursor-pointer
            shadow-lg hover:shadow-xl 
            transition-all duration-300
            hover:scale-105 active:scale-80
        `}>
            <input
                type="checkbox"
                className="visually-hidden"
                aria-label={liked ? 'Убрать из избранного' : 'Добавить в избранное'}
                checked={liked}
                disabled={disabled}
                onChange={handleChange}/>
            <HeartIcon    className="w-18 h-24" filled={liked} />
        </label>
    );
};

const HeartIcon: React.FC<{
    className: string;
    filled: boolean }> = ({className, filled}) => (
    <svg
        className={className}
        viewBox="0 0 24 24"
        fill={filled ? 'var(--color-accent)' : 'var(--color-accent-6)'}>
        <path d="M0 6.03727C0 7.49068 0.247422 9.72671 2.47423 11.7391C4.45361 13.5279 11.0103 17.5528 11.2577 17.7764C11.5052 17.8882 11.7526 18 12 18C12.2474 18 12.4948 17.8882 12.7423 17.7764C12.9897 17.5528 19.5464 13.6398 21.5258 11.7391C23.7526 9.72671 24 7.49068 24 6.03727C24 2.68323 21.0309 0 17.3196 0C15.3402 0 13.3608 1.00621 12.1237 2.57143C10.8866 1.00621 8.90722 0 6.68041 0C3.09278 0 0 2.68323 0 6.03727Z" />
    </svg>
);


export default LikeControl;

