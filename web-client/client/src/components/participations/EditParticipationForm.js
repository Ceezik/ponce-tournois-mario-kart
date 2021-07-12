import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Form from '../form/Form';
import { Row, Col } from 'react-grid-system';
import Button from '../form/Button';
import { nullifyEmptyFields } from '../../utils/utils';

function EditParticipationForm({ closeForm, participation, children }) {
    const { socket } = useSelector((state) => state.socket);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        socket.on('closeEditParticipationForm', () => closeForm());

        return () => socket.off('closeEditParticipationForm');
    }, []);

    const onSubmit = (newParticipation) => {
        setLoading(true);

        socket.emit(
            'editParticipation',
            nullifyEmptyFields({
                ...newParticipation,
                participationId: participation.id,
            }),
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

            {children}

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

export default EditParticipationForm;
