import React from "react";
import Button from "../../../shared/ui/Button.tsx";
import Input from "../../../shared/ui/Input.tsx";


const SearchBar: React.FC = () => {
    return (
        <form className='flex w-full max-w-7xl items-center gap-12 bg-gray rounded-12 mt-4 py-12 px-[20px]'>
            <label htmlFor='search' className='visually-hidden'></label>
            <Input style='search' name='search' id='search' type='text' placeholder='Поиск'/>
            <Button variant='searchAccent'>
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12.3794 12.3926L16.8045 16.8045M14.2537 7.87687C14.2537 11.3987 11.3987 14.2537 7.87687 14.2537C4.35502 14.2537 1.5 11.3987 1.5 7.87687C1.5 4.35502 4.35502 1.5 7.87687 1.5C11.3987 1.5 14.2537 4.35502 14.2537 7.87687Z"
                        stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </Button>
        </form>
    )
}
export default SearchBar;