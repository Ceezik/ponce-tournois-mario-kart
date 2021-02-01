import React from 'react';
import { Helmet } from 'react-helmet';
import Participations from './Participations';

function PonceParticipations() {
    return (
        <>
            <Helmet>
                <title>Historique</title>
            </Helmet>

            <Participations canAdd={false} route="getPonceParticipations" />
        </>
    );
}

export default PonceParticipations;
