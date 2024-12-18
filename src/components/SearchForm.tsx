import React from 'react'
import Form from 'next/form'
import SearchFormReset from './SearchFormReset';
import { Search } from 'lucide-react';

const SearchForm = ({ query } : { query?: string }) => {
    return (
        <Form action="/" scroll={false} className="search-form z-10">
            <input
                className='search-input'
                placeholder='Search for startups'
                defaultValue={query}
                name='query'
            />

            <div className='flex justify-between items-center gap-1'>
                {query && (
                    <SearchFormReset />
                )}
                <button className='search-btn' type="submit">
                    <Search className='text-white size-5'/>
                </button>
            </div>
        </Form>
    )
}

export default SearchForm