import React from 'react';
import Typography from "../../../shared/ui/Typography.tsx";
import Button from "../../../shared/ui/Button.tsx";

const SellerProfile:React.FC = () => {
    return (
        <div>
            <div className='grid grid-cols-2'>
                <div>

                    <div>
                        <Typography weight='bold'>Иван</Typography>
                    </div>


                    <div className='flex items-center gap-2'>
                        <Typography>3,0</Typography>
                        <div>★★★★★</div>
                    </div>


                    <div className='flex gap-4'>
                        <Typography>В Книговороте с 2026г</Typography>
                        <Typography>120 объявлений</Typography>
                    </div>


                    <div className='flex gap-2'>
                        <Button variant='subscribe'>Подписаться</Button>
                        <Button variant='primary'>Написать</Button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SellerProfile;