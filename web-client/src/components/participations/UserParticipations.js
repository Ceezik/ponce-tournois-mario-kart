import React from 'react';
import { Helmet } from 'react-helmet';
import Participations from './Participations';

function UserParticipations() {
    return (
        <>
            <Helmet>
                <title>Mon historique</title>
            </Helmet>

            <Participations canAdd={true} route="getUserParticipations" />
        </>
    );
}

export default UserParticipations;
