import { useState } from 'react';
import { Col, Row } from 'react-grid-system';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PatchNoteForm from './PatchNoteForm';
import { updateById } from '../../../services/patchNotes';
import { editPatchNote } from '../../../redux/actions/patchNotes';

function EditPatchNoteForm({ patchNote }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();

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
        <div className="app__container">
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
        </div>
    );
}

export default EditPatchNoteForm;
