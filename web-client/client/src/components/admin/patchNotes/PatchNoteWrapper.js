import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-grid-system';
import { useSelector } from 'react-redux';
import PatchNote from './PatchNote';
import PatchNoteSkeleton from './PatchNoteSkeleton';
import { getPatchNoteById } from '../../../redux/selectors/patchNotes';

function PatchNoteWrapper() {
    const { patchNoteId } = useParams();
    const { loading } = useSelector((state) => state.patchNotes);
    const patchNote = useSelector((state) =>
        getPatchNoteById(state, patchNoteId)
    );

    return (
        <Container className="app__container">
            {loading ? (
                <PatchNoteSkeleton />
            ) : !patchNote ? (
                <Row justify="center">
                    <Col xs="content">
                        <div className="formMessage formMessage__error">
                            Ce patch note n'existe pas
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
