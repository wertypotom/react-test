import { useState } from 'react';

function SearchComponent() {
    const [search, setSearch] = useState('');

    function handleChange(event) {
        setSearch(event.target.value);
    }

    return (
        <div>
            <Search value={search} onChange={handleChange}>
                Search:
            </Search>

            <p>Searches for {search ? search : '...'}</p>
        </div>
    );
}

function Search({ value, onChange, children }) {
    return (
        <div>
            <label for="search">{children}</label>
            <input
                role='textbox'
                id="search"
                type="text"
                value={value}
                onChange={onChange}
                placeholder="search for something"
            />
        </div>
    );
}

export default SearchComponent;