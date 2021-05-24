import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { canUserManage } from '../../utils/utils';
import Participations from './Participations';

function PonceParticipations() {
    const { user } = useSelector((state) => state.auth);
    const { ponce } = useSelector((state) => state.ponce);
    const canManage = canUserManage(user, ponce?.id);

    return (
        <>
            <Helmet>
                <title>Historique</title>
            </Helmet>

            <Participations
                canManage={canManage}
                route="getPonceParticipations"
            />
        </>
    );
}

export default PonceParticipations;
