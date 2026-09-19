import React from 'react';
import Typography from "../../../shared/ui/Typography.tsx";
import Button from "../../../shared/ui/Button.tsx";

const SellerProfile:React.FC = () => {
    return (
        <div>
            <div className='grid grid-cols-2'>
                <div className='flex flex-col gap-14  mx-auto'>
                    <Typography weight='bold'>Иван</Typography>
                    <div className='flex items-center gap-2'>
                        <Typography>3,0</Typography>
                        <div>★★★★★</div>
                    </div>

                    <div className='flex flex-col gap-[10px] items-start'>
                        <Typography>В Книговороте с 2026г</Typography>
                        <Typography>120 объявлений</Typography>
                        <Button variant='subscribe'>Подписаться</Button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SellerProfile;