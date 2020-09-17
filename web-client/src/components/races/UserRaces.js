import React from 'react';
import { Helmet } from 'react-helmet';
import Races from './Races';

function UserRaces() {
    return (
        <>
            <Helmet>
                <title>Mes circuits joués</title>
            </Helmet>

            <Races route="getUserRaces" />
        </>
    );
}

export default UserRaces;
