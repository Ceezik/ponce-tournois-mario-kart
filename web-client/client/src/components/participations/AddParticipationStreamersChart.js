import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from 'react-grid-system';
import Form from '../form/Form';
import Button from '../form/Button';
import UsersTypeahead from '../form/UsersTypeahead';
import { useSelector } from 'react-redux';

const AddComparisonForm = ({
    closeForm,
    onAdd,
    tournament,
    comparedStreamers,
}) => {
    const { socket } = useSelector((state) => state.socket);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    socket.on('addToStreamersChart', (streamersChart) => {
        setLoading(false);
        onAdd(streamersChart);
    });

    useEffect(() => {
        return socket.off('addToStreamersChart');
    }, []);

    const onSubmit = ({ username }) => {
        setLoading(true);
        socket.emit('addToStreamersChart', { username, tournament }, (err) => {
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
                    excluded={comparedStreamers}
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

function AddParticipationStreamersChart({
    tournament,
    onAddStreamer,
    comparedStreamers,
}) {
    const [showForm, setShowForm] = useState(false);

    const openForm = () => {
        if (!showForm) setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
    };

    const onAdd = (streamer) => {
        setShowForm(false);
        onAddStreamer(streamer);
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
                                comparedStreamers={comparedStreamers}
                            />
                        ) : (
                            <Col xs={12}>
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    className="participation__addComparisonBtn"
                                />
                                Comparer avec d'autres streamers
                            </Col>
                        )}
                    </Row>
                </div>
            </Col>
        </Row>
    );
}

export default AddParticipationStreamersChart;
