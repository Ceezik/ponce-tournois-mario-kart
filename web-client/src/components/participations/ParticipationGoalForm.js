import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Form from '../form/Form';
import Input from '../form/Input';
import { Row, Col } from 'react-grid-system';
import Button from '../form/Button';
import { nullifyEmptyFields } from '../../utils/utils';

function ParticipationGoalForm({ closeForm, nbMaxRaces, participation }) {
    const { socket } = useSelector((state) => state.socket);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const maxPoints = nbMaxRaces * 15;
    const GOAL_VALIDATION = `Veuillez entrer un nombre compris entre 1 et ${maxPoints}`;

    useEffect(() => {
        socket.on('closeGoalForm', () => closeForm());

        return () => socket.off('closeGoalForm');
    }, []);

    const onSubmit = ({ goal }) => {
        setLoading(true);

        socket.emit(
            'editParticipation',
            nullifyEmptyFields({ goal, participationId: participation.id }),
            (err) => {
                setError(err);
                setLoading(false);
            }
        );
    };

    return (
        <Form className="participation__addGoalForm" onSubmit={onSubmit}>
            {error && (
                <div className="formMessage formMessage__error">{error}</div>
            )}

            <Input
                label="Objectif"
                name="goal"
                type="number"
                defaultValue={participation.goal}
                validationSchema={{
                    min: {
                        value: 1,
                        message: GOAL_VALIDATION,
                    },
                    max: {
                        value: maxPoints,
                        message: GOAL_VALIDATION,
                    },
                }}
            />

            <Row justify="end">
                <Col xs="content">
                    <Button
                        type="button"
                        className="btnSecondary"
                        primary={false}
                        onClick={closeForm}
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
                        Sauvegarder
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}

export default ParticipationGoalForm;
