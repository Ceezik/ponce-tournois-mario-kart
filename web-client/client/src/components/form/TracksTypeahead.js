import { useSelector } from 'react-redux';
import { getSortedTracks } from '../../redux/selectors/tracks';
import Typeahead from './Typeahead';

function TracksTypeahead({ ...rest }) {
    const { loading, error } = useSelector((state) => state.tracks);
    const sortedTracks = useSelector(getSortedTracks);

    return (
        <Typeahead
            {...rest}
            options={sortedTracks.map((t) => ({
                id: t.id,
                value: t.name,
                label: t.name,
            }))}
            loading={loading}
            error={error}
            messages={{
                loading: 'Récupération des circuits ...',
                error: 'Impossible de récupérer les circuits',
                noResult: 'Aucun circuit trouvé',
            }}
        />
    );
}

export default TracksTypeahead;
