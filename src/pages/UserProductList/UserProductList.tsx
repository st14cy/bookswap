
import Typography from "../../shared/ui/Typography.tsx";
import UserProductItem from "./components/UserProductItem.tsx";

const UserProductList: React.FC = () => {

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
                <label htmlFor="tab-btn-1">Активные</label>
                <input id="tab-btn-2" name="tab-btn" type="radio" value=""/>
                <label htmlFor="tab-btn-2">Архив</label>
                <div className="tab-content" id="content-1">
                   <ul>
                       <UserProductItem/>
                       <UserProductItem/>
                       <UserProductItem/>
                       <UserProductItem/>
                   </ul>
                </div>
                <div className="tab-content" id="content-2">
                    <UserProductItem/>
                    <UserProductItem/>
                    <UserProductItem/>
                    <UserProductItem/>
                </div>

            </div>
        </div>
    );
};

export default UserProductList;