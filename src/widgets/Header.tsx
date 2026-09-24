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
        <header className="h-header relative">
            <div className="max-w-7xl mx-auto flex justify-between items-center w-full px-4">
                <div className="flex items-center">
                    <img alt="Иконка" src="/icon.png" />
                    <Typography weight="bold" variant="h1">{pageTitle}</Typography>
                </div>

                <div className="flex items-center gap-40">
                    {auth.isAuthorized && (
                        <div className="flex gap-40">
                            <Link to="/posts/new">+ разместить объявление</Link>
                            <Link to="/profile">мои объявления</Link>
                            <Link to="/favorites">избранное</Link>
                        </div>
                    )}

                    <div className="flex items-center gap-20">
                        {auth.isAuthorized ? (
                            <>
                                <span className="font-bold" title="Вы вошли в аккаунт">
                                    {auth.currentUserName}
                                </span>
                                <Button onClick={() => {
                                    void auth.onClickSignOut();
                                    navigate('/');
                                }}>Выйти</Button>
                            </>
                        ) : (
                            <Button onClick={() => auth.openAuthModal()}>Войти</Button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
