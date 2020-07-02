import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Container } from 'react-grid-system';
import AdminRoute from '../auth/AdminRoute';
import CupsWrapper from './cups/CupsWrapper';

function AdminWrapper() {
    return (
        <>
            <AdminHeader />

            <AdminRoute exact path="/admin/cups" component={CupsWrapper} />
        </>
    );
}

function AdminHeader() {
    return (
        <header>
            <Container>
                <Row justify="center">
                    <Col xs="content" className="adminHeader__navListItem">
                        <NavLink
                            to="/admin/cups"
                            activeClassName="header__smNavListItem--active"
                        >
                            Coupes/Circuits
                        </NavLink>
                    </Col>
                </Row>
            </Container>
        </header>
    );
}

export default AdminWrapper;
