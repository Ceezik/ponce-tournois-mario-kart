import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-grid-system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import AddPlayerBtn from './AddPlayerBtn';
import { getPositionColor } from '../../utils/utils';
import { useSocket } from '../../utils/useSocket';
import PodiumSkeleton from './PodiumSkeleton';

function Podium({ tournamentId, canAdd = false }) {
    const { socket } = useSocket();
    const [podia, setPodia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    socket.off('addPodium').on('addPodium', (podium) => {
        setPodia(_.sortBy([...podia, podium], ['position', 'player']));
    });

    useEffect(() => {
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
        };
    }, []);

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
                    <Col key={podium.id} xs={12} lg={4}>
                        <div className="podium__player">
                            <FontAwesomeIcon
                                icon={faTrophy}
                                className="podium__playerTrophy"
                                color={getPositionColor(podium.position)}
                            />
                            {podium.player}
                        </div>
                    </Col>
                ))}
            </Row>
            {canAdd && <AddPlayerBtn tournamentId={tournamentId} />}
        </>
    );
}

export default Podium;
