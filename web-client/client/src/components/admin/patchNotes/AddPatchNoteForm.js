import React, { useState } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { Helmet } from 'react-helmet';
import PatchNoteForm from './PatchNoteForm';
import { create } from '../../../services/patchNotes';
import history from '../../../utils/history';

function AddPatchNoteForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSubmit = (patchNote) => {
        setLoading(true);

        create(patchNote)
            .then(() => history.push('/admin/patch-notes'))
            .catch((err) => {
                setError(err.response.data);
                setLoading(false);
            });
    };

    return (
        <Container className="app__container">
            <Helmet>
                <title>Créer un patch note</title>
            </Helmet>

            <Row justify="center">
                <Col xs={12} md={10} lg={6}>
                    <h1 className="title--noMarginTop">Créer un patch note</h1>

                    <PatchNoteForm
                        onSubmit={onSubmit}
                        onCancel={() => history.push('/admin/patch-notes')}
                        loading={loading}
                        error={error}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default AddPatchNoteForm;
