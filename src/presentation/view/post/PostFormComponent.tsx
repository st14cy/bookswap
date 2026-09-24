import React, { useEffect, useMemo, useReducer } from 'react';
import type PostFormViewModelImpl from '../../view-model/post/form/PostFormViewModelImpl';
import type BaseView from '../BaseView';
import Typography from '../../../shared/ui/Typography';
import Input from '../../../shared/ui/Input';
import Button from '../../../shared/ui/Button';
import Autocomplete from '../../../shared/ui/Autocomplete';
import Combobox from '../../../shared/ui/Combobox';
import RadioGroup, { type RadioOption } from '../../../shared/ui/RadioGroup';
import type { BookSuggestion } from '../../../domain/entity/book/BookSuggestion';

interface Props {
    viewModel: PostFormViewModelImpl;
    onSuccess?: () => void;
}

const CONDITION_OPTIONS: RadioOption<boolean>[] = [
    { value: true, label: 'Новое' },
    { value: false, label: 'Б/у' },
];

const TERM_OPTIONS: RadioOption<boolean>[] = [
    { value: true, label: 'Отдать навсегда' },
    { value: false, label: 'Дать почитать' },
];

const DELIVERY_OPTIONS: RadioOption<boolean>[] = [
    { value: true, label: 'Постамат' },
    { value: false, label: 'Лично при встрече' },
];

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
        void viewModel.loadGenres();
        if (viewModel.isEditMode) void viewModel.loadPost();
    }, [viewModel]);

    useEffect(() => {
        if (viewModel.isSuccess) onSuccess?.();
    }, [viewModel.isSuccess, onSuccess]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        viewModel.onSubmit();
    };

    if (viewModel.isPostLoading) {
        return <Typography>Загрузка объявления...</Typography>;
    }

    if (viewModel.postLoadError) {
        return (
            <div role="alert" className="flex flex-col items-start gap-8 text-accent">
                {viewModel.postLoadError}
                <Button onClick={() => void viewModel.loadPost()}>Повторить</Button>
            </div>
        );
    }

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
                <Typography variant="label" weight="bold" htmlFor="bookTitle">Название книги</Typography>
                <Autocomplete<BookSuggestion>
                    id="bookTitle"
                    name="bookTitle"
                    label="Название книги"
                    placeholder="Начните вводить название"
                    value={viewModel.bookTitle}
                    onChange={viewModel.onChangeBookTitle}
                    fetchSuggestions={viewModel.suggestBookTitles}
                    onSelect={viewModel.onSelectBookSuggestion}
                    getKey={(b, i) => `${b.title}|${b.author}|${i}`}
                    renderItem={renderBookSuggestion}
                />
            </div>

            {/* Состояние */}
            <div className="flex flex-col gap-14">
                <Typography variant="h3" weight="bold">Состояние</Typography>
                <RadioGroup
                    name="isNew"
                    label="Состояние"
                    options={CONDITION_OPTIONS}
                    value={viewModel.isNew}
                    onChange={viewModel.onChangeIsNew}
                />
            </div>

            {/* Автор */}
            <div className="flex flex-col gap-14">
                <Typography variant="label" weight="bold" htmlFor="authorName">Автор</Typography>
                <Autocomplete<BookSuggestion>
                    id="authorName"
                    name="authorName"
                    label="Автор"
                    placeholder="Начните вводить имя автора"
                    value={viewModel.authorName}
                    onChange={viewModel.onChangeAuthorName}
                    fetchSuggestions={viewModel.suggestAuthors}
                    onSelect={viewModel.onSelectAuthorSuggestion}
                    getKey={(a, i) => `${a.author}|${i}`}
                    renderItem={renderAuthorSuggestion}
                />
            </div>

            {/* Срок передачи */}
            <div className="flex flex-col gap-14">
                <Typography variant="h3" weight="bold">Срок передачи</Typography>
                <RadioGroup
                    name="isForever"
                    label="Срок передачи"
                    options={TERM_OPTIONS}
                    value={viewModel.isForever}
                    onChange={viewModel.onChangeIsForever}
                />
            </div>

            {/* Способ получения */}
            <div className="flex flex-col gap-14">
                <Typography variant="h3" weight="bold">Способ получения</Typography>
                <RadioGroup
                    name="isPostamat"
                    label="Способ получения"
                    options={DELIVERY_OPTIONS}
                    value={viewModel.isPostamat}
                    onChange={viewModel.onChangeIsPostamat}
                />
            </div>

            {/* Жанр */}
            <div className="flex flex-col gap-14">
                <Typography variant="label" weight="bold" htmlFor="genreId">Жанр</Typography>
                <Combobox
                    id="genreId"
                    label="Жанр"
                    placeholder="Выберите жанр"
                    options={viewModel.genres}
                    selectedId={viewModel.genreId}
                    onSelect={viewModel.onChangeGenreId}
                    isLoading={viewModel.isGenresLoading}
                    error={viewModel.genresError}
                    onRetry={() => void viewModel.loadGenres()}
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

            {/* Ошибка */}
            {viewModel.isShowError && (
                <div style={{ color: 'red' }}>{viewModel.errorMessage}</div>
            )}

            {/* Кнопки */}
            <div className="flex flex-row gap-8">
                <Button type="submit" variant="accent" disabled={viewModel.isLoading}>
                    {viewModel.isLoading
                        ? 'Сохранение...'
                        : viewModel.isEditMode ? 'Сохранить изменения' : 'Разместить объявление'}
                </Button>
                <Button type="button" onClick={() => window.history.back()}>
                    Отмена
                </Button>
            </div>
        </form>
    );
};

const renderBookSuggestion = (b: BookSuggestion) => (
    <div className="flex items-center gap-10">
        {b.coverUrl
            ? <img src={b.coverUrl} alt="" className="w-8 h-12 object-cover rounded shrink-0" loading="lazy" />
            : <div className="w-8 h-12 rounded bg-gray shrink-0" />}
        <div className="min-w-0">
            <div className="font-bold truncate">{b.title}</div>
            <div className="text-black/60 truncate">
                {[b.author, b.year].filter(Boolean).join(' · ')}
            </div>
        </div>
    </div>
);

const renderAuthorSuggestion = (a: BookSuggestion) => (
    <div className="min-w-0">
        <div className="font-bold truncate">{a.author}</div>
        {a.title && <div className="text-black/60 truncate">Известная книга: {a.title}</div>}
    </div>
);

export default PostFormComponent;