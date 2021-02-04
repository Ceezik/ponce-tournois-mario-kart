import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-grid-system';
import PatchNote from './PatchNote';
import { getById } from '../../../services/patchNotes';
import PatchNoteSkeleton from './PatchNoteSkeleton';

function PatchNoteWrapper() {
    const { patchNoteId } = useParams();
    const [patchNote, setPatchNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        getById(patchNoteId)
            .then((res) => setPatchNote(res.data))
            .catch((err) => setError(err.response.data))
            .finally(() => setLoading(false));
    }, [patchNoteId]);

    return (
        <Container className="app__container">
            {loading ? (
                <PatchNoteSkeleton />
            ) : error ? (
                <Row justify="center">
                    <Col xs="content">
                        <div className="formMessage formMessage__error">
                            {error}
                        </div>
                    </Col>
                </Row>
            ) : (
                <PatchNote patchNote={patchNote} />
            )}
        </Container>
    );
}

export default PatchNoteWrapper;
