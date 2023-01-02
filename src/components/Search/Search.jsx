import { useEffect, useState } from 'react';

const getUser = () => {
    return Promise.resolve({ id: '1', name: 'Robin' });
};

function SearchComponent() {
    const [search, setSearch] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            const user = await getUser();
            setUser(user);
        };

        loadUser();
    }, []);

    function handleChange(event) {
        setSearch(event.target.value);
    }

    return (
        <div>
            {user ? <p>Signed in as {user.name}</p> : null}

            <Search value={search} onChange={handleChange}>
                Search:
            </Search>

            <p>Searches for {search ? search : '...'}</p>

            <h3>Some dumb list</h3>
            <ul>
                <li role='list-item'>Element 1</li>
                <li role='list-item'>Element 2</li>
                <li role='list-item'>Element 3</li>
            </ul>
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