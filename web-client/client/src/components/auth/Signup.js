import { useState } from 'react';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-grid-system';
import Form from '../form/Form';
import Input from '../form/Input';
import Button from '../form/Button';
import { signup } from '../../redux/actions/auth';

const USERNAME_FORMAT =
    "Votre nom d'utilisateur ne doit contenir que des caractères alphanumériques";
const USERNAME_LENGTH =
    "Votre nom d'utilisateur doit faire entre 3 et 50 caractères";

function Signup() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();
    const { search } = useLocation();
    const { defaultUsername = '', twitchId, token } = queryString.parse(search);

    const onSignup = () => history.push('/');

    const onSubmit = ({ username }) => {
        dispatch(
            signup(
                { username, twitchId, token },
                setError,
                setLoading,
                onSignup
            )
        );
    };

    return (
        <Container className="app__container">
            <Helmet>
                <title>Première connexion</title>
            </Helmet>

            <Row justify="center">
                <Col xs={12} md={10} lg={6}>
                    <h1 className="title--noMarginTop">Première connexion</h1>
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
                            autoFocus
                            validationSchema={{
                                required: 'Ce champ est obligatoire',
                                minLength: {
                                    value: 3,
                                    message: USERNAME_LENGTH,
                                },
                                maxLength: {
                                    value: 50,
                                    message: USERNAME_LENGTH,
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9_]*$/i,
                                    message: USERNAME_FORMAT,
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
