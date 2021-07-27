import LastParticipation from './LastParticipation';

function UserLastParticipation({ userId }) {
    return (
        <LastParticipation userId={userId} route="getLastUserParticipation" />
    );
}

export default UserLastParticipation;
