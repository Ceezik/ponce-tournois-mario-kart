import React, { useState } from 'react';
import queryString from 'query-string';
import { Container, Row, Col } from 'react-grid-system';
import Form from '../form/Form';
import Input from '../form/Input';
import Button from '../form/Button';
import { useAuth } from '../../utils/useAuth';

function Signup() {
    const { defaultUsername, twitchId, token } = queryString.parse(
        window.location.search
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { signup } = useAuth();

    const onSubmit = ({ username }) => {
        signup({ username, twitchId, token }, setError, setLoading);
    };

    return (
        <Container className="app__container">
            <Row justify="center">
                <Col xs={12} md={10} lg={6}>
                    <h1>Première connexion</h1>
                    <p>
                        Veuillez choisir un nom d'utilisateur, vous pourrez le
                        modifier par la suite depuis votre profil.
                    </p>
                    <Form onSubmit={onSubmit} className="signup__form">
                        {error && (
                            <div className="formMessage formMessage__error">
                                {error}
                            </div>
                        )}

                        <Input
                            name="username"
                            label="Nom d'utilisateur"
                            validationSchema={{
                                required: 'Ce champ est obligatoire',
                                pattern: {
                                    value: /^[a-zA-Z0-9_]*$/i,
                                    message:
                                        "Votre nom d'utilisateur ne doit contenir que des caractères alphanumériques",
                                },
                            }}
                            defaultValue={defaultUsername}
                        />

                        <Row justify="end">
                            <Col xs="content">
                                <Button
                                    type="submit"
                                    className="btnPrimary"
                                    loading={loading}
                                >
                                    Valider
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Signup;
