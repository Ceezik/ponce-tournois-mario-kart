import { Row, Col } from 'react-grid-system';
import Form from '../../form/Form';
import Input from '../../form/Input';
import Button from '../../form/Button';
import Typeahead from '../../form/Typeahead';

const POSITION_VALIDATION = 'Veuillez entrer un nombre compris entre 1 et 12';

function RaceForm({ onSubmit, error, loading, closeForm, race = null }) {
    return (
        <Col xs={12}>
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
                            defaultValue={race && race.position}
                        />
                    </Col>
                    <Col xs={8}>
                        <Typeahead
                            name="trackName"
                            label="Circuit"
                            validationSchema={{
                                required: 'Ce champ est obligatoire',
                            }}
                            defaultValue={race && race.Track.name}
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
                            {race ? 'Modifier' : 'Ajouter'}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Col>
    );
}

export default RaceForm;
