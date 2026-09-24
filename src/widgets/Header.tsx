import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, matchPath } from 'react-router-dom';
import Typography from '../shared/ui/Typography';
import { ROUTES } from '../shared/config/routes';
import Button from '../shared/ui/Button';
import { authViewModel } from '../di';
import useAuthViewModel from '../presentation/hooks/useAuthViewModel';

const Header: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [pageTitle, setPageTitle] = useState('Каталог');
    const auth = useAuthViewModel(authViewModel);

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
                <div className="flex items-center">
                    <img alt="Иконка" src="/icon.png" />
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
