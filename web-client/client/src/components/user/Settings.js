import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Row, Col } from 'react-grid-system';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import Form from '../form/Form';
import Input from '../form/Input';
import Button from '../form/Button';
import {
    update,
    addEditor as _addEditor,
    removeEditor as _removeEditor,
} from '../../services/user';
import { addEditor, removeEditor, updateUser } from '../../redux/actions/auth';
import Switch from '../utils/Switch';
import { switchTheme } from '../../redux/actions/settings';
import UsersTypeahead from '../form/UsersTypeahead';

const USERNAME_FORMAT =
    "Votre nom d'utilisateur ne doit contenir que des caractères alphanumériques";
const USERNAME_LENGTH =
    "Votre nom d'utilisateur doit faire entre 3 et 50 caractères";

function ThemeSwitcher() {
    const dispatch = useDispatch();
    const { theme } = useSelector((state) => state.settings);

    return (
        <>
            <label className="inputLabel themeSwitch__label">Mode sombre</label>
            <Switch
                on={theme === 'dark'}
                setOn={() =>
                    dispatch(switchTheme(theme === 'dark' ? 'light' : 'dark'))
                }
            />
        </>
    );
}

function UsernameForm() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
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
        <Form onSubmit={onSubmit}>
            {message && (
                <div className={`formMessage formMessage__${message.type}`}>
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
    );
}

function ManagerEditorItem({ entity, onDelete }) {
    return (
        <div className="managersEditors__item">
            <Row justify="between">
                <Col xs="content">
                    <Link
                        className="primaryLink"
                        to={`/users/${entity.username}`}
                    >
                        {entity.username}
                    </Link>
                </Col>
                {onDelete && (
                    <Col
                        xs="content"
                        className="managersEditors__delete"
                        onClick={onDelete}
                    >
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </Col>
                )}
            </Row>
        </div>
    );
}

function AddEditorForm({ closeForm }) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSubmit = ({ username }) => {
        setLoading(true);

        _addEditor({ username })
            .then((res) => {
                dispatch(addEditor(res.data));
                closeForm();
            })
            .catch((err) => {
                setError(err.response.data);
                setLoading(false);
            });
    };

    return (
        <Form onSubmit={onSubmit}>
            {error && (
                <div className="formMessage formMessage__error">{error}</div>
            )}

            <UsersTypeahead
                name="username"
                label="Nom d'utilisateur"
                autoFocus
                validationSchema={{
                    required: 'Ce champ est obligatoire',
                }}
                excluded={[user.id, ...user.Editors.map((e) => e.id)]}
            />

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
    );
}

function AddEditorBtn() {
    const [showForm, setShowForm] = useState(false);

    const openForm = () => {
        if (!showForm) setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
    };

    return (
        <div
            className={`managersEditors__item ${
                !showForm ? 'managersEditors__addEditor' : ''
            }`}
            onClick={openForm}
        >
            {showForm ? (
                <AddEditorForm closeForm={closeForm} />
            ) : (
                <div>
                    <FontAwesomeIcon
                        icon={faPlus}
                        className="managersEditors__addEditorBtn"
                    />
                    Ajouter un utilisateur
                </div>
            )}
        </div>
    );
}

function Managers() {
    const { user } = useSelector((state) => state.auth);

    return (
        <>
            {user.Managers.length > 0 && (
                <>
                    <p>
                        Vous pouvez éditer les données des utilisateurs suivants
                        :
                    </p>

                    {user.Managers.map((manager) => (
                        <ManagerEditorItem key={manager.id} entity={manager} />
                    ))}
                </>
            )}
        </>
    );
}

function Editors() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onDelete = (editor) => {
        _removeEditor(editor.id).then(() => dispatch(removeEditor(editor.id)));
    };

    return (
        <>
            <p>Les utilisateurs suivants peuvent modifier vos données :</p>

            {user.Editors.map((editor) => (
                <ManagerEditorItem
                    key={editor.id}
                    entity={editor}
                    onDelete={() => onDelete(editor)}
                />
            ))}

            <AddEditorBtn />
        </>
    );
}

function OBSPluginSettings() {
    const [showNbPoints, setShowNbPoints] = useState(true);
    const [showRaces, setShowRaces] = useState(false);
    const [hasGenerated, setHasGenerated] = useState(false);

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (hasGenerated !== true) return;

        const timeout = setTimeout(() => {
            setHasGenerated(false);
        }, 3000);

        return () => clearTimeout(timeout);
    }, [hasGenerated]);

    const generateLink = () => {
        const link = `${window.location.host}/plugins/obs/points?userId=${user.id}&showNbPoints=${showNbPoints}&showRaces=${showRaces}`;
        navigator.clipboard?.writeText?.(link);
        setHasGenerated(true);
    };

    return (
        <div>
            <p>
                Permet d'affiche en temps réel vos points et vos courses du
                dernier tournoi sur votre stream ! <br /> Gérez les paramètres
                ci-dessous puis générez un lien à mettre dans une source
                "Navigateur" de votre OBS. N'oubliez pas d'enlever le fond vert
                avec un filtre "Chroma key" 😉
            </p>

            <br />

            <Row align="center">
                <Col xs="content">
                    <Switch
                        on={showNbPoints}
                        setOn={() => setShowNbPoints((v) => !v)}
                    />
                </Col>
                <Col xs="content">
                    <label className="inputLabel">
                        Afficher le nombre de points
                    </label>
                </Col>
            </Row>

            <br />

            <Row align="center">
                <Col xs="content">
                    <Switch
                        on={showRaces}
                        setOn={() => setShowRaces((v) => !v)}
                    />
                </Col>
                <Col xs="content">
                    <label className="inputLabel">
                        Afficher les positions des courses
                    </label>
                </Col>
            </Row>

            <Row justify="end">
                <Col xs="content">
                    <button className="btnPrimary" onClick={generateLink}>
                        {hasGenerated ? 'Lien copié !' : 'Générer mon lien'}
                    </button>
                </Col>
            </Row>
        </div>
    );
}

function Settings() {
    return (
        <div className="app__container">
            <Helmet>
                <title>Paramètres</title>
            </Helmet>

            <Row justify="center">
                <Col xs={12} md={10} lg={6}>
                    <h1 className="title--noMarginTop">Paramètres</h1>
                    <div className="settings__part">
                        <ThemeSwitcher />
                    </div>
                    <div className="settings__part">
                        <UsernameForm />
                    </div>

                    <h1 className="title--noMarginTop">Intégration OBS</h1>
                    <div className="settings__part">
                        <OBSPluginSettings />
                    </div>

                    <h1 className="title--noMarginTop">Éditeurs des données</h1>
                    <div className="settings__part">
                        <Managers />
                    </div>
                    <div className="settings__part">
                        <Editors />
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Settings;
