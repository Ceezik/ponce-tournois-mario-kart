import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { canUserAdd } from '../../utils/utils';
import Participations from './Participations';

function PonceParticipations() {
    const { user } = useSelector((state) => state.auth);
    const { ponce } = useSelector((state) => state.ponce);
    const canAdd = canUserAdd(user, ponce?.id);

    return (
        <>
            <Helmet>
                <title>Historique</title>
            </Helmet>

            <Participations canAdd={canAdd} route="getPonceParticipations" />
        </>
    );
}

export default PonceParticipations;
