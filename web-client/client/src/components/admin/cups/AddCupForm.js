import { useState } from 'react';
import { Row, Col } from 'react-grid-system';
import Form from '../../form/Form';
import Input from '../../form/Input';
import Button from '../../form/Button';
import { create } from '../../../services/cups';

const NAME_LENGTH = 'Le nom doit faire entre 3 et 50 caractères';

function AddCupForm({ setCreating, addCup }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSubmit = (cup) => {
        setLoading(true);

        create(cup)
            .then((res) => {
                addCup(res.data);
                setCreating(false);
            })
            .catch((err) => {
                setError(err.response.data);
                setLoading(false);
            });
    };

    return (
        <Form onSubmit={onSubmit} className="cupsList__addCupForm">
            {error && (
                <div className="formMessage formMessage__error">{error}</div>
            )}

            <Input
                name="name"
                label="Nom"
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

            <Row justify="end">
                <Col xs="content">
                    <Button
                        type="button"
                        className="btnSecondary"
                        primary={false}
                        onClick={() => setCreating(false)}
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
    );
}

export default AddCupForm;
