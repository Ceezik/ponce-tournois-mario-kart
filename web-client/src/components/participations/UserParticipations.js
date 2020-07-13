import React from 'react';
import Participations from './Participations';
import useTitle from '../../utils/useTitle';

function UserParticipations() {
    useTitle('Mon historique');

    return <Participations canAdd={true} route="getUserParticipations" />;
}

export default UserParticipations;
