import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { getAll } from '../../../services/patchNotes';
import PatchNoteListItem from './PatchNoteListItem';
import PatchNotesSkeleton from './PatchNotesSkeleton';

function PatchNotes() {
    const [patchNotes, setPatchNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAll()
            .then((res) => setPatchNotes(res.data))
            .catch((err) => setError(err.response.data))
            .finally(() => setLoading(false));
    }, []);

    return (
        <Container className="app__container">
            <Helmet>
                <title>Patch notes</title>
            </Helmet>

            {loading ? (
                <PatchNotesSkeleton />
            ) : error ? (
                <Row justify="center">
                    <Col xs="content">
                        <div className="formMessage formMessage__error">
                            {error}
                        </div>
                    </Col>
                </Row>
            ) : (
                <>
                    <Row justify="end">
                        <Col xs="content">
                            <Link
                                to="/admin/patch-notes/create"
                                className="btnPrimary"
                            >
                                Créer un patch note
                            </Link>
                        </Col>
                    </Row>

                    <h1 className="patchNotesList__title">Patch notes</h1>

                    <Row>
                        {patchNotes.map((patchNote) => (
                            <PatchNoteListItem
                                key={patchNote.id}
                                patchNote={patchNote}
                            />
                        ))}
                    </Row>
                </>
            )}
        </Container>
    );
}
export default PatchNotes;
