import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, matchPath } from 'react-router-dom';
import Typography from '../shared/ui/Typography';
import { ROUTES } from '../shared/config/routes';
import Button from '../shared/ui/Button';
import { authViewModel, cartViewModel, notificationsViewModel } from '../di';
import useAuthViewModel from '../presentation/hooks/useAuthViewModel';
import useCartViewModel from '../presentation/hooks/useCartViewModel';
import useNotificationsViewModel from '../presentation/hooks/useNotificationsViewModel';

const Header: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [pageTitle, setPageTitle] = useState('Каталог');
    const auth = useAuthViewModel(authViewModel);
    const cart = useCartViewModel(cartViewModel);
    const notifications = useNotificationsViewModel(notificationsViewModel);

    useEffect(() => {
        let foundTitle = 'Страница не найдена';
        for (const key in ROUTES) {
            const route = ROUTES[key as keyof typeof ROUTES];
            if (matchPath(route.path, location.pathname)) {
                foundTitle = route.title;
                break;
            }
        }
        setPageTitle(foundTitle);
    }, [location.pathname]);

    return (
        <header className="relative z-10 -mb-[6px] flex items-center justify-center pt-[56px]">
            <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
                <div className="flex items-center gap-14">
                    <Link to="/" aria-label="На главную" className="transition-colors hover:text-accent">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M7 7C7 6.44772 7.44772 6 8 6H16C16.5523 6 17 6.44772 17 7C17 7.55228 16.5523 8 16 8H8C7.44772 8 7 7.55228 7 7Z" fill="currentColor"/>
                            <path d="M8 9C7.44772 9 7 9.44771 7 10C7 10.5523 7.44772 11 8 11H13C13.5523 11 14 10.5523 14 10C14 9.44771 13.5523 9 13 9H8Z" fill="currentColor"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M7 23H19C20.6569 23 22 21.6569 22 20V4C22 2.34315 20.6569 1 19 1H7C4.23858 1 2 3.23858 2 6V18C2 20.7055 4.27504 23 7 23ZM4 6C4 4.34315 5.34315 3 7 3H19C19.5523 3 20 3.44772 20 4V14.1707C19.6872 14.0602 19.3506 14 19 14H7C5.87439 14 4.83566 14.3719 4 14.9996V6ZM20 17C20 16.4477 19.5523 16 19 16H7C5.5135 16 4.04148 17.0532 4.04148 18.5C4.04148 19.9162 5.5135 21 7 21H19C19.5523 21 20 20.5523 20 20V17Z" fill="currentColor"/>
                        </svg>
                    </Link>
                    <Typography weight="bold" variant="h1">{pageTitle}</Typography>
                </div>

                <div className="flex items-center gap-40">
                    {auth.isAuthorized && (
                        <div className="flex gap-40">
                            <Link to="/posts/new">+ РАЗМЕСТИТЬ ОБЪЯВЛЕНИЕ</Link>
                            <Link to="/profile">МОИ ОБЪЯВЛЕНИЯ</Link>
                            <Link to="/favorites" className="transition-colors hover:text-accent">
                                <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 8.04969C0 9.98758 0.329897 12.9689 3.29897 15.6522C5.93814 18.0373 14.6804 23.4037 15.0103 23.7019C15.3402 23.8509 15.6701 24 16 24C16.3299 24 16.6598 23.8509 16.9897 23.7019C17.3196 23.4037 26.0619 18.1863 28.701 15.6522C31.6701 12.9689 32 9.98758 32 8.04969C32 3.57764 28.0412 0 23.0928 0C20.4536 0 17.8144 1.34162 16.1649 3.42857C14.5155 1.34162 11.8763 0 8.90722 0C4.12371 0 0 3.57764 0 8.04969Z" fill="currentColor"/>
                            </svg>
                            </Link>
                            <Link to="/cart" aria-label="Корзина" className="relative transition-colors hover:text-accent">
                                <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1.5H4.5L7.6 16.2C7.75 16.9 8.37 17.4 9.1 17.4H22.3C23 17.4 23.6 16.93 23.78 16.25L26.5 5.5H6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <circle cx="10" cy="21.5" r="1.9" fill="currentColor"/>
                                    <circle cx="21.5" cy="21.5" r="1.9" fill="currentColor"/>
                                </svg>
                                {cart.count > 0 && (
                                    <span className="absolute -top-2 -right-3 min-w-5 h-5 px-1 rounded-full bg-accent text-white text-xs leading-5 text-center">
                                        {cart.count}
                                    </span>
                                )}
                            </Link>
                            <Link to="/notifications" aria-label="Уведомления" className="relative transition-colors hover:text-accent">
                                <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 1.5C8.13 1.5 5 4.63 5 8.5V13.6L2.3 18.2C1.9 18.87 2.38 19.7 3.16 19.7H20.84C21.62 19.7 22.1 18.87 21.7 18.2L19 13.6V8.5C19 4.63 15.87 1.5 12 1.5Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
                                    <path d="M9 22.5C9.5 23.7 10.65 24.5 12 24.5C13.35 24.5 14.5 23.7 15 22.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                                </svg>
                                {notifications.unreadCount > 0 && (
                                    <span className="absolute -top-2 -right-3 min-w-5 h-5 px-1 rounded-full bg-accent text-white text-xs leading-5 text-center">
                                        {notifications.unreadCount > 99 ? '99+' : notifications.unreadCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    )}
                    {auth.isAuthorized ? (
                        <Button  className="h-[52px] shrink-0 px-0 flex items-center justify-center"
                                 onClick={() => {
                                 void auth.onClickSignOut();
                                 navigate('/');
                             }}>Выйти</Button>
                    ) : (
                         <Button variant='accent'
                                 className="h-[52px] shrink-0 px-0 flex items-center justify-center"
                                 onClick={() => auth.openAuthModal()}>Войти</Button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
