import { useState, useRef, useEffect } from 'react';
import { Hidden, Row, Col } from 'react-grid-system';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faTimes,
    faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import ponceFleur from '../../assets/images/poncefleur.png';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../redux/actions/auth';

function Header() {
    return (
        <header>
            <Hidden xs sm>
                <DesktopHeader />
            </Hidden>
            <Hidden md lg xl xxl>
                <MobileHeader />
            </Hidden>
        </header>
    );
}

function DesktopHeader() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function closeDropdown(e) {
            if (
                open &&
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', closeDropdown);
        return () => document.removeEventListener('mousedown', closeDropdown);
    }, [dropdownRef, open, setOpen]);

    const close = () => setOpen(false);
    const onSignout = () => history.push('/');

    return (
        <>
            <div className="header__nav">
                <Link to="/" className="header__logo">
                    <img src={ponceFleur} alt="Ponce fleur" />
                </Link>

                <ul className="header__navList">
                    <li>
                        <NavLink
                            className="header__navListItem"
                            to="/history"
                            activeClassName="header__navListItem--active"
                        >
                            Historique
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="header__navListItem"
                            to="/races"
                            activeClassName="header__navListItem--active"
                        >
                            Circuits joués
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="header__navListItem"
                            to="/statistics"
                            activeClassName="header__navListItem--active"
                        >
                            Statistiques
                        </NavLink>
                    </li>
                    {user && user.isAdmin && (
                        <li>
                            <NavLink
                                className="header__navListItem"
                                to="/admin"
                                activeClassName="header__navListItem--active"
                            >
                                Administration
                            </NavLink>
                        </li>
                    )}
                </ul>
            </div>

            {user ? (
                <div className="header__dropdownWrapper" ref={dropdownRef}>
                    <FontAwesomeIcon
                        icon={faUserCircle}
                        size="2x"
                        className="header__profilPicture"
                        onClick={() => setOpen(!open)}
                    />
                    <AnimatePresence>
                        {open && (
                            <motion.div
                                className="header__dropdown"
                                initial={{
                                    opacity: 0,
                                    y: '-50px',
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: '-30px',
                                }}
                            >
                                <ul className="header__dropdownNavList">
                                    <NavLink
                                        to={`/users/${user.username}`}
                                        onClick={close}
                                    >
                                        <li>Profil</li>
                                    </NavLink>

                                    <NavLink to="/settings" onClick={close}>
                                        <li>Paramètres</li>
                                    </NavLink>

                                    <li
                                        onClick={() =>
                                            dispatch(signout(onSignout))
                                        }
                                    >
                                        Déconnexion
                                    </li>
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ) : (
                <TwitchButton />
            )}
        </>
    );
}

function MobileHeader() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { user } = useSelector((state) => state.auth);
    const [open, setOpen] = useState(false);

    const close = () => setOpen(false);
    const onSignout = () => history.push('/');

    return (
        <>
            <Link to="/" className="header__logo" onClick={close}>
                <img src={ponceFleur} alt="Ponce fleur" />
            </Link>

            <FontAwesomeIcon
                icon={open ? faTimes : faBars}
                className="header__hamburger"
                onClick={() => setOpen(!open)}
            />

            <AnimatePresence>
                {open && (
                    <motion.div
                        style={{ flexBasis: '100%' }}
                        initial={{
                            opacity: 0,
                            y: '-50px',
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            y: '-20px',
                        }}
                    >
                        <ul className="header__smNavList">
                            <li>
                                <NavLink
                                    to="/history"
                                    activeClassName="header__smNavListItem--active"
                                    onClick={close}
                                >
                                    Historique
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/races"
                                    activeClassName="header__smNavListItem--active"
                                    onClick={close}
                                >
                                    Circuits joués
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/statistics"
                                    activeClassName="header__smNavListItem--active"
                                    onClick={close}
                                >
                                    Statistiques
                                </NavLink>
                            </li>
                            {user && user.isAdmin && (
                                <li>
                                    <NavLink
                                        to="/admin"
                                        activeClassName="header__smNavListItem--active"
                                        onClick={close}
                                    >
                                        Administration
                                    </NavLink>
                                </li>
                            )}
                        </ul>

                        <hr />

                        {user ? (
                            <div className="header__smProfilWrapper">
                                <Row align="center">
                                    <Col xs="content">
                                        <FontAwesomeIcon
                                            icon={faUserCircle}
                                            size="2x"
                                            className="header__profilPicture"
                                            onClick={() => setOpen(!open)}
                                        />
                                    </Col>
                                    <Col>
                                        <strong>{user.username}</strong>
                                    </Col>
                                </Row>

                                <Row className="header__smProfilLinks">
                                    <Col xs={6}>
                                        <NavLink
                                            to={`/users/${user.username}`}
                                            onClick={close}
                                        >
                                            Profil
                                        </NavLink>
                                    </Col>
                                    <Col xs={6}>
                                        <NavLink to="/settings" onClick={close}>
                                            Paramètres
                                        </NavLink>
                                    </Col>
                                    <Col
                                        xs={6}
                                        onClick={() => {
                                            close();
                                            dispatch(signout(onSignout));
                                        }}
                                    >
                                        <span>Déconnexion</span>
                                    </Col>
                                </Row>
                            </div>
                        ) : (
                            <Row
                                className="header__smAuthButton"
                                justify="center"
                            >
                                <Col xs="content">
                                    <TwitchButton />
                                </Col>
                            </Row>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function TwitchButton() {
    return (
        <button
            type="button"
            className="header__authButton"
            onClick={() =>
                (window.location = `${process.env.REACT_APP_API_URL}/auth/twitch`)
            }
        >
            <svg
                width="24px"
                height="24px"
                version="1.1"
                viewBox="0 0 24 28"
                x="0px"
                y="0px"
            >
                <g fillRule="evenodd">
                    <path d="M19 6v6h-2V6h2zm-7 0h2v6h-2V6zM5 0L0 5v18h6v5l5-5h4l9-9V0H5zm17 13l-4 4h-4l-4 4v-4H6V2h16v11z"></path>
                    <path
                        d="M18 17l4-4V2H6v15h4v4l4-4h4zM12 6h2v6h-2V6zm7 0h-2v6h2V6z"
                        fill="#FFF"
                    ></path>
                </g>
            </svg>
            <span>Connexion</span>
        </button>
    );
}

export default Header;
