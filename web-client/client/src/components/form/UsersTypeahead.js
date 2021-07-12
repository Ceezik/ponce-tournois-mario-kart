import { useEffect, useState } from 'react';
import Typeahead from './Typeahead';
import { getAll } from '../../services/users';

function UsersTypeahead({ excluded, ...rest }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => fetchUsers(), []);

    const fetchUsers = (username) => {
        setLoading(true);

        return getAll({ page: 0, pageSize: 5, username, excluded })
            .then((res) => {
                setUsers(res.data.users);
                if (error) setError(null);
            })
            .catch((err) => setError(err.response.data))
            .finally(() => setLoading(false));
    };

    return (
        <Typeahead
            defaultValue=""
            {...rest}
            options={users.map((u) => ({
                id: u.id,
                value: u.username,
                label: u.username,
            }))}
            onAsyncChange={fetchUsers}
            loading={loading}
            error={error}
            messages={{
                loading: 'Récupération des utilisateurs ...',
                error: 'Impossible de récupérer les utilisateurs',
                noResult: 'Aucun utilisateur trouvé',
            }}
        />
    );
}

export default UsersTypeahead;
