import { useState, useEffect } from 'react';
import { Row, Col } from 'react-grid-system';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import AddPlayerBtn from './AddPlayerBtn';
import PodiumSkeleton from './PodiumSkeleton';
import PodiumListItem from './PodiumListItem';

function Podium({ tournamentId, canManage = false }) {
    const { socket } = useSelector((state) => state.socket);
    const [podia, setPodia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    socket.off('addPodium').on('addPodium', (podium) => {
        if (podium.TournamentId === tournamentId) {
            setPodia(_.sortBy([...podia, podium], ['position', 'player']));
        }
    });

    socket.off('editPodium').on('editPodium', (podium) => {
        if (podium.TournamentId === tournamentId) {
            const index = _.findIndex(podia, { id: podium.id });
            const newPodia = _.cloneDeep(podia);

            newPodia.splice(index, 1, podium);
            setPodia(_.sortBy(newPodia, ['position', 'player']));
        }
    });

    useEffect(() => {
        setLoading(true);

        socket.on('getPodium', (podia) => {
            setPodia(podia);
            setLoading(false);
        });

        socket.emit('getPodium', tournamentId, () => {
            setError('Impossible de récupérer le podium');
            setLoading(false);
        });

        return () => {
            socket.off('getPodium');
            socket.off('addPodium');
            socket.off('editPodium');
        };
    }, [tournamentId]);

    return loading ? (
        <PodiumSkeleton />
    ) : error ? (
        <Row justify="center">
            <Col xs="content">
                <div className="formMessage formMessagge__error">{error}</div>
            </Col>
        </Row>
    ) : (
        <>
            <Row>
                {podia.map((podium) => (
                    <PodiumListItem
                        key={podium.id}
                        podium={podium}
                        canManage={canManage}
                    />
                ))}
            </Row>
            {canManage && <AddPlayerBtn tournamentId={tournamentId} />}
        </>
    );
}

export default Podium;
