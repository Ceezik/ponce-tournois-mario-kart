import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-grid-system';
import EditPatchNoteForm from './EditPatchNoteForm';
import { getById } from '../../../services/patchNotes';
import PatchNoteFormSkeleton from './PatchNoteFormSkeleton';

function EditPatchNoteWrapper() {
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
                <PatchNoteFormSkeleton />
            ) : error ? (
                <Row justify="center">
                    <Col xs="content">
                        <div className="formMessage formMessage__error">
                            {error}
                        </div>
                    </Col>
                </Row>
            ) : (
                <EditPatchNoteForm patchNote={patchNote} />
            )}
        </Container>
    );
}

export default EditPatchNoteWrapper;
