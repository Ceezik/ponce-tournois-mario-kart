import { Row, Col } from 'react-grid-system';
import moment from 'moment';
import Form from '../../form/Form';
import Input from '../../form/Input';
import Button from '../../form/Button';

const NAME_LENGTH = 'Le nom doit faire entre 3 et 50 caractères';
const NUMBER_VALIDATION = 'Veuillez entrer un nombre compris entre 1 et 100000';

function TournamentForm({
    onSubmit,
    onCancel,
    tournament = null,
    loading,
    error,
}) {
    const formatDate = (date) => {
        return moment(date).format('YYYY-MM-DDTHH:mm');
    };

    return (
        <Form onSubmit={onSubmit}>
            {error && (
                <div className="formMessage formMessage__error">{error}</div>
            )}

            <Input
                label="Nom *"
                name="name"
                placeholder="Ave - xx"
                defaultValue={tournament && tournament.name}
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

            <Input
                label="Nombre de fleurs"
                name="nbParticipants"
                type="number"
                defaultValue={tournament && tournament.nbParticipants}
                validationSchema={{
                    min: {
                        value: 1,
                        message: NUMBER_VALIDATION,
                    },
                    max: {
                        value: 100000,
                        message: NUMBER_VALIDATION,
                    },
                }}
            />

            <Input
                label="Nombre maximum de courses *"
                name="nbMaxRaces"
                type="number"
                defaultValue={tournament ? tournament.nbMaxRaces : 24}
                validationSchema={{
                    required: 'Ce champ est obligatoire',
                    min: {
                        value: 1,
                        message: NUMBER_VALIDATION,
                    },
                    max: {
                        value: 100000,
                        message: NUMBER_VALIDATION,
                    },
                }}
            />

            <Input
                label="Date de début *"
                name="startDate"
                type="datetime-local"
                defaultValue={tournament && formatDate(tournament.startDate)}
                validationSchema={{ required: 'Ce champ est obligatoire' }}
            />

            <Input
                label="Date de fin *"
                name="endDate"
                type="datetime-local"
                defaultValue={tournament && formatDate(tournament.endDate)}
                validationSchema={{ required: 'Ce champ est obligatoire' }}
            />

            <Row justify="end">
                <Col xs="content">
                    <button
                        type="button"
                        className="btnSecondary"
                        onClick={onCancel}
                    >
                        Annuler
                    </button>
                </Col>
                <Col xs="content">
                    <Button
                        type="submit"
                        className="btnPrimary"
                        loading={loading}
                    >
                        {tournament ? 'Modifier' : 'Créer'}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}

export default TournamentForm;
