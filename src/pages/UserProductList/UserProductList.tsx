import React, {useState} from 'react';
import Typography from "../../shared/ui/Typography.tsx";

const tabs = [
    { id: 'published', label: 'Опубликованные' },
    { id: 'unpublished', label: 'Снятые с публикации' },
    { id: 'drafts', label: 'Черновики' },
] as const;

type TabId = (typeof tabs)[number]['id'];

const UserProductList: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabId>('published');
    return (
        <div className="flex flex-col gap-6">
            <header className="flex flex-col items-center gap-3">
                <img
                    src="#"
                    height={130}
                    width={130}
                    className="h-[130px] w-[130px] rounded-full object-cover"
                    alt="Фото пользователя"
                />

                <div
                    className="flex items-center gap-2"
                    aria-label="Рейтинг: 3 из 5"
                >
                    <Typography>3,0</Typography>

                    <span aria-hidden="true" className="text-yellow-500">
                        ★★★☆☆
                    </span>
                </div>
            </header>

            <div className="tab">
                <input checked id="tab-btn-1" name="tab-btn" type="radio" value=""/>
                <label htmlFor="tab-btn-1">Вкладка 1</label>
                <input id="tab-btn-2" name="tab-btn" type="radio" value=""/>
                <label htmlFor="tab-btn-2">Вкладка 2</label>
                <input id="tab-btn-3" name="tab-btn" type="radio" value=""/>
                <label htmlFor="tab-btn-3">Вкладка 3</label>
                <div className="tab-content" id="content-1">
                    Содержимое 1...
                </div>
                <div className="tab-content" id="content-2">
                    Содержимое 2...
                </div>
                <div className="tab-content" id="content-3">
                    Содержимое 3...
                </div>
            </div>
        </div>
    );
};

export default UserProductList;