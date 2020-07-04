import React from 'react';
import { Row, Col } from 'react-grid-system';
import Form from '../../form/Form';
import Input from '../../form/Input';
import Button from '../../form/Button';

const NAME_LENGTH = 'Le nom doit faire entre 3 et 50 caractères';
const NUMBER_VALIDATION = 'Veuillez entrer un nombre compris entre 1 et 100000';

function TournamentForm({ onSubmit, loading, error }) {
    return (
        <Form onSubmit={onSubmit}>
            {error && (
                <div className="formMessage formMessage__error">{error}</div>
            )}

            <Input
                label="Nom *"
                name="name"
                placeholder="Ave - xx"
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
                defaultValue={24}
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
                validationSchema={{ required: 'Ce champ est obligatoire' }}
            />

            <Input
                label="Date de fin *"
                name="endDate"
                type="datetime-local"
                validationSchema={{ required: 'Ce champ est obligatoire' }}
            />

            <Row justify="end">
                <Col xs="content">
                    <Button
                        type="submit"
                        className="btnPrimary"
                        loading={loading}
                    >
                        Créer
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}

export default TournamentForm;
