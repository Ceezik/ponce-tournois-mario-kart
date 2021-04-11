import { useState, useCallback } from 'react';
import _ from 'lodash';

function UsersFilter({ usernameFilter, setUsernameFilter }) {
    const [username, setUsername] = useState(usernameFilter);

    const debounceFilter = useCallback(
        _.debounce((f) => setUsernameFilter(f), 300),
        []
    );

    return (
        <input
            className="users__filter"
            placeholder="Rechercher par nom d'utilisateur"
            value={username}
            onChange={(e) => {
                setUsername(e.target.value);
                debounceFilter(e.target.value);
            }}
        />
    );
}

export default UsersFilter;
