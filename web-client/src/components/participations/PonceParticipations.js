import React from 'react';
import Participations from './Participations';
import useTitle from '../../utils/useTitle';

function PonceParticipations() {
    useTitle('Historique');

    return <Participations canAdd={false} route="getPonceParticipations" />;
}

export default PonceParticipations;
