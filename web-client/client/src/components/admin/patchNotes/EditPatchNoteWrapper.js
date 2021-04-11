import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-grid-system';
import { useSelector } from 'react-redux';
import EditPatchNoteForm from './EditPatchNoteForm';
import PatchNoteFormSkeleton from './PatchNoteFormSkeleton';
import { getPatchNoteById } from '../../../redux/selectors/patchNotes';

function EditPatchNoteWrapper() {
    const { patchNoteId } = useParams();
    const { loading } = useSelector((state) => state.patchNotes);
    const patchNote = useSelector((state) =>
        getPatchNoteById(state, patchNoteId)
    );

    return (
        <Container className="app__container">
            {loading ? (
                <PatchNoteFormSkeleton />
            ) : !patchNote ? (
                <Row justify="center">
                    <Col xs="content">
                        <div className="formMessage formMessage__error">
                            Ce patch note n'existe pas
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
