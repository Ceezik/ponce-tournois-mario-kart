import { Row, Col, Container } from 'react-grid-system';
import { NavLink } from 'react-router-dom';

function AdminHeader() {
    const LINKS = [
        { url: '/cups', name: 'Coupes/Circuits' },
        { url: '/tournaments', name: 'Tournois' },
        { url: '/users', name: 'Utilisateurs' },
        { url: '/patch-notes', name: 'Patch notes' },
    ];

    return (
        <header className="header--admin">
            <Container>
                <Row justify="center">
                    {LINKS.map((link, index) => (
                        <Col
                            key={index}
                            xs="content"
                            className="adminHeader__navListItem"
                        >
                            <NavLink
                                to={`/admin${link.url}`}
                                activeClassName="header__smNavListItem--active"
                            >
                                {link.name}
                            </NavLink>
                        </Col>
                    ))}
                </Row>
            </Container>
        </header>
    );
}

export default AdminHeader;
