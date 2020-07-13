import React from 'react';
import Races from './Races';
import useTitle from '../../utils/useTitle';

function PonceRaces() {
    useTitle('Circuits joués');

    return <Races route="getPonceRaces" />;
}

export default PonceRaces;
