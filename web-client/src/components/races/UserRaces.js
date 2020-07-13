import React from 'react';
import Races from './Races';
import useTitle from '../../utils/useTitle';

function UserRaces() {
    useTitle('Mes circuits joués');

    return <Races route="getUserRaces" />;
}

export default UserRaces;
