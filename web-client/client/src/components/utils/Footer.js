import { Row, Col, Container, useScreenClass } from 'react-grid-system';
import { Link } from 'react-router-dom';
import ponceFleur from '../../assets/images/poncefleur.png';

function ExternalLink({ href, children }) {
    return (
        <a
            className="primaryLink"
            target="_blank"
            rel="noopener noreferrer"
            href={href}
        >
            {children}
        </a>
    );
}

function Footer() {
    const screenClass = useScreenClass();
    const isSmall = ['xs', 'sm', 'md'].includes(screenClass);

    return (
        <footer>
            <Container fluid>
                <Row align="center" justify="around">
                    <Col
                        xs={12}
                        lg={5}
                        style={{ textAlign: isSmall ? 'center' : 'start' }}
                    >
                        2020 - 2021 © Développé par{' '}
                        <ExternalLink
                            href="https://twitter.com/ceezik"
                            external
                        >
                            Ceezik
                        </ExternalLink>
                    </Col>

                    <Col xs={12} lg={2}>
                        <Link to="/">
                            <img
                                className="footer__logo"
                                src={ponceFleur}
                                alt="Ponce fleur"
                                style={isSmall ? { margin: '1em 0' } : {}}
                            />
                        </Link>
                    </Col>

                    <Col
                        className="footer__links"
                        xs={12}
                        lg={5}
                        style={{ textAlign: isSmall ? 'center' : 'end' }}
                    >
                        <Link className="primaryLink" to="/cgu">
                            CGU
                        </Link>
                        <ExternalLink
                            href="https://github.com/Ceezik/ponce-tournois-mario-kart"
                            external
                        >
                            Code source
                        </ExternalLink>
                        <ExternalLink
                            href="https://github.com/Ceezik/ponce-tournois-mario-kart/issues?q=is%3Aopen+is%3Aissue++label%3Aenhancement+"
                            external
                        >
                            Roadmap
                        </ExternalLink>
                        <ExternalLink
                            href="https://github.com/Ceezik/ponce-tournois-mario-kart/issues?q=is%3Aopen+is%3Aissue+label%3Abug"
                            external
                        >
                            Bugs connus
                        </ExternalLink>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
