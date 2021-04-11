import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import Participations from './Participations';

function PonceParticipations() {
    const { user } = useSelector((state) => state.auth);

    return (
        <>
            <Helmet>
                <title>Historique</title>
            </Helmet>

            <Participations
                canAdd={!!user?.isAdmin}
                route="getPonceParticipations"
            />
        </>
    );
}

export default PonceParticipations;
