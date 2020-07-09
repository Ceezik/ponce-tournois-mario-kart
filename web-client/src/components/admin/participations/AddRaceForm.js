import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-grid-system';
import _ from 'lodash';
import Form from '../../form/Form';
import Input from '../../form/Input';
import Button from '../../form/Button';
import Typeahead from '../../form/Typeahead';
import { useTracks } from '../../../utils/useTracks';
import { useSocket } from '../../../utils/useSocket';
import { getNbPointsFromPosition } from '../../../utils/utils';

const POSITION_VALIDATION = 'Veuillez entrer un nombre compris entre 1 et 12';

function AddRaceForm({ closeForm, participationId }) {
    const { tracks } = useTracks();
    const { socket } = useSocket();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        socket.on('closeAddRaceForm', () => closeForm());

        return () => socket.off('closeAddRaceForm');
    }, []);

    const onSubmit = ({ position, trackName }) => {
        const track = _.find(tracks, ['name', trackName]);

        if (track) {
            setLoading(true);

            socket.emit(
                'addRace',
                {
                    position: parseInt(position),
                    nbPoints: getNbPointsFromPosition(position),
                    trackId: track.id,
                    participationId,
                },
                (err) => {
                    setError(err);
                    setLoading(false);
                }
            );
        } else {
            setError("Ce circuit n'existe pas");
        }
    };

    return (
        <Col xs={11}>
            <Form className="participation__addRaceForm" onSubmit={onSubmit}>
                {error && (
                    <div className="formMessage formMessage__error">
                        {error}
                    </div>
                )}

                <Row>
                    <Col xs={4}>
                        <Input
                            name="position"
                            label="Position"
                            type="number"
                            validationSchema={{
                                required: 'Ce champ est obligatoire',
                                min: {
                                    value: 1,
                                    message: POSITION_VALIDATION,
                                },
                                max: {
                                    value: 12,
                                    message: POSITION_VALIDATION,
                                },
                            }}
                        />
                    </Col>
                    <Col xs={8}>
                        <Typeahead
                            name="trackName"
                            label="Circuit"
                            validationSchema={{
                                required: 'Ce champ est obligatoire',
                            }}
                        />
                    </Col>
                </Row>

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
                            Ajouter
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Col>
    );
}

export default AddRaceForm;
