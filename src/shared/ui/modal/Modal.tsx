import React, { useEffect } from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        if (!isOpen) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl p-6 min-w-[320px] max-w-md w-full relative">
                <button
                    type="button"
                    aria-label="Close"
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl leading-none"
                    onClick={onClose}
                >
                    ×
                </button>

                {children}
            </div>
        </div>
    );
};

export default Modal;