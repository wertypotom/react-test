import * as React from 'react';
import axios from 'axios';

const URL = 'http://hn.algolia.com/api/v1/search';

function Stories() {
    const [stories, setStories] = React.useState([]);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        handleFetch()
    }, [])

    async function handleFetch() {
        let result;

        try {
            result = await axios.get(`${URL}?query=React`);

            setStories(result.data.hits);
        } catch (error) {
            setError(error);
        }
    }

    return (
        <div>
            <button role='button' type="button" onClick={handleFetch}>
                Fetch Stories
            </button>

            {error && <span>Something went wrong ...</span>}

            <ul role='listbox'>
                {stories.map((story) => (
                    <li key={story.objectID}>
                        <a href={story.url}>{story.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Stories;