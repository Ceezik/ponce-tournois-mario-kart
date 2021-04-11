import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Col, Container, Row } from 'react-grid-system';
import { Helmet } from 'react-helmet';
import PatchNoteForm from './PatchNoteForm';
import { create } from '../../../services/patchNotes';
import { addPatchNote } from '../../../redux/actions/patchNotes';

function AddPatchNoteForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = (patchNote) => {
        setLoading(true);
        setError(null);

        create(patchNote)
            .then((res) => {
                dispatch(addPatchNote(res.data));
                history.push('/admin/patch-notes');
            })
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
