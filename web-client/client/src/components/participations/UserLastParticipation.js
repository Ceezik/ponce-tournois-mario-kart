import { Container } from 'react-grid-system';
import LastParticipation from './LastParticipation';

function UserLastParticipation({ userId }) {
    return (
        <Container className="app__container" style={{ marginTop: 0 }}>
            <LastParticipation
                userId={userId}
                route="getLastUserParticipation"
            />
        </Container>
    );
}

export default UserLastParticipation;
