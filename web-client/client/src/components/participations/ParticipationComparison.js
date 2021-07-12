import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from 'react-grid-system';
import Form from '../form/Form';
import Button from '../form/Button';
import UsersTypeahead from '../form/UsersTypeahead';
import { useSelector } from 'react-redux';

const AddComparisonForm = ({ closeForm, onAdd, tournament, comparedUsers }) => {
    const { socket } = useSelector((state) => state.socket);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    socket.on('getParticipations', (participations) => {
        if (participations.length) onAdd(participations[0]);
        else {
            setError('Une erreur est survenue');
            setLoading(false);
        }
    });

    useEffect(() => {
        return socket.off('getParticipations');
    }, []);

    const onSubmit = ({ username }) => {
        setLoading(true);
        socket.emit('getParticipations', [{ username, tournament }], (err) => {
            setError(err);
            setLoading(false);
        });
    };

    return (
        <Col xs={12} className="participation__addComparisonForm">
            <Form onSubmit={onSubmit}>
                {error && (
                    <div className="formMessage formMessage__error">
                        {error}
                    </div>
                )}

                <UsersTypeahead
                    name="username"
                    label="Nom d'utilisateur"
                    autoFocus
                    validationSchema={{
                        required: 'Ce champ est obligatoire',
                    }}
                    excluded={comparedUsers}
                />

                <Row justify="end">
                    <Col xs="content">
                        <Button
                            type="button"
                            className="btnSecondary"
                            onClick={closeForm}
                            primary={false}
                        >
                            Annuler
                        </Button>
                    </Col>

                    <Col xs="content">
                        <Button
                            type="submit"
                            className="btnPrimary"
                            loading={loading}
                        >
                            Comparer
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Col>
    );
};

function ParticipationComparison({
    tournament,
    onAddComparison,
    comparedUsers,
}) {
    const [showForm, setShowForm] = useState(false);

    const openForm = () => {
        if (!showForm) setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
    };

    const onAdd = (participation) => {
        setShowForm(false);
        onAddComparison(participation);
    };

    useEffect(() => {
        closeForm();
    }, [tournament]);

    return (
        <Row>
            <Col xs={12} onClick={openForm}>
                <div
                    className={`participation__comparison ${
                        !showForm ? 'participation__addComparison' : ''
                    }`}
                >
                    <Row justify="center" align="center">
                        {showForm ? (
                            <AddComparisonForm
                                closeForm={closeForm}
                                onAdd={onAdd}
                                tournament={tournament}
                                comparedUsers={comparedUsers}
                            />
                        ) : (
                            <Col xs={12}>
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    className="participation__addComparisonBtn"
                                />
                                Comparer avec d'autres utilisateurs
                            </Col>
                        )}
                    </Row>
                </div>
            </Col>
        </Row>
    );
}

export default ParticipationComparison;
