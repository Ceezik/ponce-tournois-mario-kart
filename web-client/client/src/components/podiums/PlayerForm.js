import { Row, Col } from 'react-grid-system';
import Form from '../form/Form';
import Input from '../form/Input';
import Button from '../form/Button';

const POSITION_VALIDATION = 'Veuillez entrer un nombre compris entre 1 et 3';
const NAME_LENGTH = 'Le nom doit faire entre 3 et 50 caractères';

function PlayerForm({ onSubmit, closeForm, error, loading, podium = null }) {
    return (
        <Col xs={12} className="podium__addPlayerForm">
            <Form onSubmit={onSubmit}>
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
                            autoFocus
                            defaultValue={podium && podium.position}
                            validationSchema={{
                                required: 'Ce champ est obligatoire',
                                min: {
                                    value: 1,
                                    message: POSITION_VALIDATION,
                                },
                                max: {
                                    value: 3,
                                    message: POSITION_VALIDATION,
                                },
                            }}
                        />
                    </Col>
                    <Col xs={8}>
                        <Input
                            name="player"
                            label="Joueur"
                            defaultValue={podium && podium.player}
                            validationSchema={{
                                required: 'Ce champ est obligatoire',
                                minLength: {
                                    value: 3,
                                    message: NAME_LENGTH,
                                },
                                maxLength: {
                                    value: 50,
                                    message: NAME_LENGTH,
                                },
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
                            {podium ? 'Modifier' : 'Ajouter'}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Col>
    );
}

export default PlayerForm;
