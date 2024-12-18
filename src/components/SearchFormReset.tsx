'use client';

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

const SearchFormReset = () => {
    const router = useRouter();
    const reset = () => {
        const form = document.querySelector('.search-form') as HTMLFormElement;
        form?.reset();
        router.push('/')
    };

    return (
        <button className="search-btn" type="reset" onClick={reset}>
            <X className='text-white size-5'/>
        </button>
    )
}

export default SearchFormReset