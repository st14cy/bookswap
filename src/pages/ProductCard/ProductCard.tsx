import React from 'react';
import SellerProfile from "./components/SellerProfile.tsx";
import LikeControl from "../../shared/ui/LikeControl.tsx";
import Typography from "../../shared/ui/Typography.tsx";
import InfoBlock from "../CatalogPage/components/InfoBlock.tsx";


const ProductCard:React.FC = () => {
    return (
        <div className='grid grid-cols-2 gap-100'>
            <div className='flex flex-col gap-40'>
                <section className='relative'>
                    <img src="#" alt="Фото книги" width='550' height='480' />
                    <LikeControl />
                </section>

                <section>
                    <div className='flex flex-col gap-24'>
                        <InfoBlock title="Описание">
                            <Typography variant='span'>Тут ткакое-то описнаие Тут ткакое-то описнаие Тут ткакоее-то описнаие </Typography>
                        </InfoBlock>
                    </div>
                    <div className='flex flex-col gap-24'>
                        <InfoBlock title="Характеристики">
                            <div>

                            </div>
                        </InfoBlock>
                    </div>

                </section>

            </div>

            <SellerProfile></SellerProfile>
        </div>
    );
};

export default ProductCard;