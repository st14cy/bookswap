import React from 'react';
import Typography from "../../../common/Typography.tsx";
import Input from "../../../common/Input.tsx";
import Button from "../../../common/Button.tsx";

const AdForm: React.FC = () => {
    return (
        <div className='flex flex-col gap-24 max-w-7xl mx-auto '>
            <section className="flex gap-24 flex-col">
                <div className="flex flex-col gap-14">
                    <Typography variant='h4'>Название обявления</Typography>
                    <label htmlFor='name' className='visually-hidden'/>
                    <Input style='base' name='name' id='name' type='text'/>
                </div>
                <div className="flex flex-col gap-14">
                    <Typography variant='h4'>Состояние</Typography>
                    <div className='flex gap-8'>
                        <Button variant='accent' type='button'>Новое</Button>
                        <Button variant='accent' type='button'>Бу</Button>
                    </div>
                </div>
            </section>

            <section className="flex gap-24 flex-col">
                <div className="flex flex-col gap-14">
                    <Typography variant='h4'>Жанр</Typography>
                    <label htmlFor='name' className='visually-hidden'/>
                    <Input style='base' name='name' id='name' type='text'/>
                </div>
                <div className="flex flex-col gap-14">
                    <Typography variant='h4'>Автор</Typography>
                    <label htmlFor='name' className='visually-hidden'/>
                    <Input style='base' name='name' id='name' type='text'/>
                </div>
            </section>


            <section className="flex gap-24 flex-col">
                <div className="flex flex-col gap-14">
                    <Typography variant='h4'>Срок передачи</Typography>
                    <div className='flex gap-8'>
                        <Button variant='accent' type='button'>Отдать навсегда</Button>
                        <Button variant='accent' type='button'>Дать почитать</Button>
                    </div>
                </div>
                <div className='flex flex-row gap-14'>
                    <div className="flex flex-col gap-14">
                        <Typography variant='h4'>Способ получения</Typography>
                        <div className='flex gap-8'>
                            <Button variant='accent' type='button'>Постмат</Button>
                            <Button variant='accent' type='button'>Лично при втрече</Button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-14">
                        <Typography variant='h4'>Временный промежуток</Typography>
                        <div className='flex gap-8'>
                            <label htmlFor='from' className='visually-hidden'/>
                            <Input style='base' name='from' id='from' type='text' placeholder='c'/>

                            <label htmlFor='by' className='visually-hidden'/>
                            <Input style='base' name='by' id='by' type='text' placeholder='по'/>
                        </div>
                    </div>
                </div>
            </section>


            <section className="flex gap-24 flex-col">
                <div className="flex flex-col gap-14">
                    <Typography variant='h4'>Описание</Typography>
                    <label htmlFor='description' className='visually-hidden'/>
                    <Input style='base' name='description' id='description' type='text'/>
                </div>
                <div className="flex flex-col gap-14">
                    <Typography variant='h4'>Адрес</Typography>
                    <label htmlFor='address' className='visually-hidden'/>
                    <Input style='base' name='address' id='address' type='text'/>
                </div>
            </section>

            <section className="flex gap-8 flex-row">
                <Button variant='accent' type='button'>Сохранить изменения</Button>
                <Button variant='primary' type='button'>Отмена</Button>
            </section>

        </div>
    );
};

export default AdForm;