import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'react-grid-system';
import { useDispatch, useSelector } from 'react-redux';
import Form from '../form/Form';
import Input from '../form/Input';
import Button from '../form/Button';
import { update } from '../../services/user';
import { updateUser } from '../../redux/actions/auth';
import Switch from '../utils/Switch';
import { switchTheme } from '../../redux/actions/settings';

const USERNAME_FORMAT =
    "Votre nom d'utilisateur ne doit contenir que des caractères alphanumériques";
const USERNAME_LENGTH =
    "Votre nom d'utilisateur doit faire entre 3 et 50 caractères";

function Settings() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { theme } = useSelector((state) => state.settings);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const onSubmit = (username) => {
        setLoading(true);

        update(username)
            .then((res) => {
                dispatch(updateUser(res.data));
                setMessage({
                    type: 'success',
                    text: "Votre nom d'utilisateur a bien été modifié",
                });
            })
            .catch((err) =>
                setMessage({ type: 'error', text: err.response.data })
            )
            .finally(() => setLoading(false));
    };

    return (
        <Container className="app__container">
            <Helmet>
                <title>Paramètres</title>
            </Helmet>

            <Row justify="center">
                <Col xs={12} md={10} lg={6}>
                    <h1 className="title--noMarginTop">Paramètres</h1>

                    <label className="inputLabel themeSwitch__label">
                        Mode sombre
                    </label>
                    <Switch
                        on={theme === 'dark'}
                        setOn={() =>
                            dispatch(
                                switchTheme(theme === 'dark' ? 'light' : 'dark')
                            )
                        }
                    />

                    <Form onSubmit={onSubmit}>
                        {message && (
                            <div
                                className={`formMessage formMessage__${message.type}`}
                            >
                                {message.text}
                            </div>
                        )}

                        <Input
                            label="Nom d'utilisateur"
                            name="username"
                            defaultValue={user.username}
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
                        />

                        <Row justify="end">
                            <Col xs="content">
                                <Button
                                    type="submit"
                                    className="btnPrimary"
                                    loading={loading}
                                >
                                    Modifier
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Settings;
