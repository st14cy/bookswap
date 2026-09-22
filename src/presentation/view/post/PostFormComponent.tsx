import React, { useEffect, useMemo, useReducer } from 'react';
import type PostFormViewModelImpl from '../../view-model/post/form/PostFormViewModelImpl';
import type BaseView from '../BaseView';
import Typography from '../../../shared/ui/Typography';
import Input from '../../../shared/ui/Input';
import Button from '../../../shared/ui/Button';

interface Props {
    viewModel: PostFormViewModelImpl;
    onSuccess?: () => void;
}

const PostFormComponent: React.FC<Props> = ({ viewModel, onSuccess }) => {
    const [, forceUpdate] = useReducer((n: number) => n + 1, 0);

    const baseView: BaseView = useMemo(
        () => ({ onViewModelChanged: () => forceUpdate() }),
        [],
    );

    useEffect(() => {
        viewModel.attachView(baseView);
        return () => viewModel.detachView();
    }, [baseView, viewModel]);

    useEffect(() => {
        if (viewModel.isSuccess) onSuccess?.();
    }, [viewModel.isSuccess, onSuccess]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        viewModel.onSubmit();
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-24 max-w-7xl mx-auto">
            {/* Название */}
            <div className="flex flex-col gap-14">
                <Typography variant="label" weight="bold">Название объявления</Typography>
                <Input
                    style="base"
                    name="title"
                    id="title"
                    type="text"
                    value={viewModel.title}
                    onChange={(e) => viewModel.onChangeTitle(e.target.value)}
                />
            </div>

            {/* Название книги */}
            <div className="flex flex-col gap-14">
                <Typography variant="label" weight="bold">Название книги</Typography>
                <Input
                    style="base"
                    name="bookTitle"
                    id="bookTitle"
                    type="text"
                    value={viewModel.bookTitle}
                    onChange={(e) => viewModel.onChangeBookTitle(e.target.value)}
                />
            </div>

            {/* Состояние */}
            <div className="flex flex-col gap-14">
                <Typography variant="h3" weight="bold">Состояние</Typography>
                <div className="flex gap-8">
                    <Button
                        variant="accent"
                        type="button"
                        onClick={() => viewModel.onChangeIsNew(true)}
                    >
                        Новое
                    </Button>
                    <Button
                        variant="accent"
                        type="button"
                        onClick={() => viewModel.onChangeIsNew(false)}
                    >
                        Бу
                    </Button>
                </div>
            </div>

            {/* Автор */}
            <div className="flex flex-col gap-14">
                <Typography variant="label" weight="bold">Автор</Typography>
                <Input
                    style="base"
                    name="authorName"
                    id="authorName"
                    type="text"
                    value={viewModel.authorName}
                    onChange={(e) => viewModel.onChangeAuthorName(e.target.value)}
                />
            </div>

            {/* Condition */}
            <div className="flex flex-col gap-14">
                <Typography variant="label" weight="bold">Состояние (текст)</Typography>
                <Input
                    style="base"
                    name="condition"
                    id="condition"
                    type="text"
                    value={viewModel.condition}
                    onChange={(e) => viewModel.onChangeCondition(e.target.value)}
                />
            </div>

            {/* Срок передачи */}
            <div className="flex flex-col gap-14">
                <Typography variant="h3" weight="bold">Срок передачи</Typography>
                <div className="flex gap-8">
                    <Button
                        variant="accent"
                        type="button"
                        onClick={() => viewModel.onChangeIsForever(true)}
                    >
                        Отдать навсегда
                    </Button>
                    <Button
                        variant="accent"
                        type="button"
                        onClick={() => viewModel.onChangeIsForever(false)}
                    >
                        Дать почитать
                    </Button>
                </div>
            </div>

            {/* Способ получения */}
            <div className="flex flex-col gap-14">
                <Typography variant="h3" weight="bold">Способ получения</Typography>
                <div className="flex gap-8">
                    <Button
                        variant="accent"
                        type="button"
                        onClick={() => viewModel.onChangeIsPostamat(true)}
                    >
                        Постамат
                    </Button>
                    <Button
                        variant="accent"
                        type="button"
                        onClick={() => viewModel.onChangeIsPostamat(false)}
                    >
                        Лично при встрече
                    </Button>
                </div>
            </div>

            {/* Жанр */}
            <div className="flex flex-col gap-14">
                <Typography variant="label" weight="bold">ID жанра (GUID)</Typography>
                <Input
                    style="base"
                    name="genreId"
                    id="genreId"
                    type="text"
                    value={viewModel.genreId}
                    onChange={(e) => viewModel.onChangeGenreId(e.target.value)}
                />
            </div>

            {/* Описание */}
            <div className="flex flex-col gap-14">
                <Typography variant="label" weight="bold">Описание</Typography>
                <Input
                    style="base"
                    name="description"
                    id="description"
                    type="text"
                    value={viewModel.description}
                    onChange={(e) => viewModel.onChangeDescription(e.target.value)}
                />
            </div>

            {/* Город */}
            <div className="flex flex-col gap-14">
                <Typography variant="label" weight="bold">Город</Typography>
                <Input
                    style="base"
                    name="city"
                    id="city"
                    type="text"
                    value={viewModel.city}
                    onChange={(e) => viewModel.onChangeCity(e.target.value)}
                />
            </div>

            {/* Улица */}
            <div className="flex flex-col gap-14">
                <Typography variant="label" weight="bold">Улица</Typography>
                <Input
                    style="base"
                    name="street"
                    id="street"
                    type="text"
                    value={viewModel.street}
                    onChange={(e) => viewModel.onChangeStreet(e.target.value)}
                />
            </div>

            {/* Дом */}
            <div className="flex flex-col gap-14">
                <Typography variant="label" weight="bold">Дом</Typography>
                <Input
                    style="base"
                    name="houseNumber"
                    id="houseNumber"
                    type="text"
                    value={viewModel.houseNumber}
                    onChange={(e) => viewModel.onChangeHouseNumber(e.target.value)}
                />
            </div>

            {/* OwnerId */}
            <div className="flex flex-col gap-14">
                <Typography variant="label" weight="bold">ID владельца (GUID)</Typography>
                <Input
                    style="base"
                    name="ownerId"
                    id="ownerId"
                    type="text"
                    value={viewModel.ownerId}
                    onChange={(e) => viewModel.onChangeOwnerId(e.target.value)}
                />
            </div>

            {/* Ошибка */}
            {viewModel.isShowError && (
                <div style={{ color: 'red' }}>{viewModel.errorMessage}</div>
            )}

            {/* Кнопки */}
            <div className="flex flex-row gap-8">
                <Button type="submit" variant="accent" disabled={viewModel.isLoading}>
                    {viewModel.isLoading ? 'Сохранение...' : 'Сохранить изменения'}
                </Button>
                <Button type="button" onClick={() => window.history.back()}>
                    Отмена
                </Button>
            </div>
        </form>
    );
};

export default PostFormComponent;