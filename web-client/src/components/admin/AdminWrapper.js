import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Container } from 'react-grid-system';
import AdminRoute from '../auth/AdminRoute';
import CupsWrapper from './cups/CupsWrapper';
import AddTournamentForm from './tournaments/AddTournamentForm';
import TournamentsWrapper from './tournaments/TournamentsWrapper';

function AdminWrapper() {
    return (
        <>
            <AdminHeader />

            <AdminRoute exact path="/admin/cups" component={CupsWrapper} />
            <AdminRoute
                exact
                path="/admin/tournaments"
                component={TournamentsWrapper}
            />
            <AdminRoute
                exact
                path="/admin/tournaments/create"
                component={AddTournamentForm}
            />
        </>
    );
}

function AdminHeader() {
    const LINKS = [
        { url: '/cups', name: 'Coupes/Circuits' },
        { url: '/tournaments', name: 'Tournois' },
    ];

    return (
        <header>
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

export default AdminWrapper;
