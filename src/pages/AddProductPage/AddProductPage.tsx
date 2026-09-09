import React from 'react';
import Typography from "../../shared/ui/Typography.tsx";
import Input from "../../shared/ui/Input.tsx";
import Button from "../../shared/ui/Button.tsx";

const AddProductPage: React.FC = () => {
    return (
        <form>
            <div className='flex flex-col gap-24 max-w-7xl mx-auto '>
                <section className="flex gap-24 flex-col">
                    <div className="flex flex-col gap-14">
                        <Typography variant='label' weight='bold' htmlFor='title'>
                            Название объявления
                        </Typography>
                        <Input style='base' name='name' id='name' type='text'/>
                    </div>
                    <div className="flex flex-col gap-14">
                        <Typography variant='h3' weight='bold'>Состояние</Typography>
                        <div className='flex gap-8'>
                            <Button variant='accent' type='button'>Новое</Button>
                            <Button variant='accent' type='button'>Бу</Button>
                        </div>
                    </div>
                </section>

                <section className="flex gap-24 flex-col">
                    <div className="flex flex-col gap-14">
                        <Typography variant='label' weight='bold' htmlFor='name'>
                            Название объявления
                        </Typography>
                        <Input style='base' name='name' id='name' type='text'/>
                    </div>
                    <div className="flex flex-col gap-14">
                        <Typography variant='label' weight='bold' htmlFor='author'>
                            Название объявления
                        </Typography>
                        <Input style='base' name='author' id='author' type='text'/>
                    </div>
                </section>


                <section className="flex gap-24 flex-col">
                    <div className="flex flex-col gap-14">
                        <Typography variant='h3' weight='bold'>Срок передачи</Typography>
                        <div className='flex gap-8'>
                            <Button variant='accent' type='button'>Отдать навсегда</Button>
                            <Button variant='accent' type='button'>Дать почитать</Button>
                        </div>
                    </div>
                    <div className='flex flex-row gap-14'>
                        <div className="flex flex-col gap-14">
                            <Typography variant='h3' weight='bold'>Способ получения</Typography>
                            <div className='flex gap-8'>
                                <Button variant='accent' type='button'>Постмат</Button>
                                <Button variant='accent' type='button'>Лично при втрече</Button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-14">
                            <Typography variant='h3' weight='bold'>Временный промежуток</Typography>
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
                        <Typography variant='label' weight='bold' htmlFor='description'>
                          Описнаие
                        </Typography>
                        <Input style='base' name='description' id='description' type='text'/>
                    </div>
                    <div className="flex flex-col gap-14">
                        <Typography variant='label' weight='bold' htmlFor='address'>
                            Адрес
                        </Typography>
                        <Input style='base' name='address' id='address' type='text'/>
                    </div>
                </section>

                <form className='flex flex-row gap-8'>
                    <Button type="submit" variant='accent'>Сохранить изменения</Button>
                    <Button type="submit">Отмена</Button>
                </form>
            </div>
        </form>
    );
};

export default AddProductPage;