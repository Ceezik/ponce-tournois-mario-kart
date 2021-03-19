import React, { useState } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import PatchNoteForm from './PatchNoteForm';
import { updateById } from '../../../services/patchNotes';
import history from '../../../utils/history';
import { editPatchNote } from '../../../redux/actions/patchNotes';

function EditPatchNoteForm({ patchNote }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const onSubmit = (newPatchNote) => {
        setLoading(true);
        setError(null);

        updateById(patchNote.id, newPatchNote)
            .then((res) => {
                dispatch(editPatchNote(res.data));
                history.push(`/admin/patch-notes/${patchNote.id}`);
            })
            .catch((err) => {
                setError(err.response.data);
                setLoading(false);
            });
    };

    return (
        <Container className="app__container">
            <Helmet>
                <title>Modifier un patch note</title>
            </Helmet>

            <Row justify="center">
                <Col xs={12} md={10} lg={6}>
                    <h1 className="title--noMarginTop">
                        Modifier un patch note
                    </h1>

                    <PatchNoteForm
                        onSubmit={onSubmit}
                        onCancel={() =>
                            history.push(`/admin/patch-notes/${patchNote.id}`)
                        }
                        patchNote={patchNote}
                        loading={loading}
                        error={error}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default EditPatchNoteForm;
