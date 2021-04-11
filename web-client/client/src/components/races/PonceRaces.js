import { Helmet } from 'react-helmet';
import Races from './Races';

function PonceRaces() {
    return (
        <>
            <Helmet>
                <title>Circuits joués</title>
            </Helmet>

            <Races route="getPonceRaces" />
        </>
    );
}

export default PonceRaces;
