import { Helmet } from 'react-helmet';
import { NavLink, Switch } from 'react-router-dom';
import { Row, Col, Container } from 'react-grid-system';
import AdminRoute from '../auth/AdminRoute';
import CupsWrapper from './cups/CupsWrapper';
import AddTournamentForm from './tournaments/AddTournamentForm';
import TournamentsWrapper from './tournaments/TournamentsWrapper';
import TournamentWrapper from './tournaments/TournamentWrapper';
import EditTournamentWrapper from './tournaments/EditTournamentWrapper';
import UsersWrapper from './users/UsersWrapper';
import PatchNotes from './patchNotes/PatchNotes';
import AddPatchNoteForm from './patchNotes/AddPatchNoteForm';
import PatchNoteWrapper from './patchNotes/PatchNoteWrapper';
import EditPatchNoteWrapper from './patchNotes/EditPatchNoteWrapper';

function AdminWrapper() {
    return (
        <>
            <Helmet>
                <title>Administration</title>
            </Helmet>
            <AdminHeader />

            <Switch>
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
                <AdminRoute
                    exact
                    path="/admin/tournaments/:tournamentId"
                    component={TournamentWrapper}
                />
                <AdminRoute
                    exact
                    path="/admin/tournaments/:tournamentId/edit"
                    component={EditTournamentWrapper}
                />
                <AdminRoute
                    exact
                    path="/admin/users"
                    component={UsersWrapper}
                />
                <AdminRoute
                    exact
                    path="/admin/patch-notes"
                    component={PatchNotes}
                />
                <AdminRoute
                    exact
                    path="/admin/patch-notes/create"
                    component={AddPatchNoteForm}
                />
                <AdminRoute
                    exact
                    path="/admin/patch-notes/:patchNoteId"
                    component={PatchNoteWrapper}
                />
                <AdminRoute
                    exact
                    path="/admin/patch-notes/:patchNoteId/edit"
                    component={EditPatchNoteWrapper}
                />
            </Switch>
        </>
    );
}

function AdminHeader() {
    const LINKS = [
        { url: '/cups', name: 'Coupes/Circuits' },
        { url: '/tournaments', name: 'Tournois' },
        { url: '/users', name: 'Utilisateurs' },
        { url: '/patch-notes', name: 'Patch notes' },
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
