import { useState } from 'react';
import { Col, Row } from 'react-grid-system';
import Markdown from 'react-markdown';
import Button from '../../form/Button';
import Form from '../../form/Form';
import Input from '../../form/Input';
import Textarea from '../../form/Textarea';

const VERSION_LENGTH = 'La version doit faire moins de 50 caractères';
const VALID_VERSION = 'La version doit être valide';

function PatchNoteForm({
    onSubmit,
    onCancel,
    patchNote = null,
    error,
    loading,
}) {
    const [showPreview, setShowPreview] = useState(false);
    const [content, setContent] = useState(patchNote?.content || '');

    return (
        <Form onSubmit={onSubmit}>
            {error && (
                <div className="formMessage formMessage__error">{error}</div>
            )}

            <Input
                label="Version *"
                name="version"
                defaultValue={patchNote && patchNote.version}
                validationSchema={{
                    required: 'Ce champ est obligatoire',
                    maxLength: {
                        value: 50,
                        message: VERSION_LENGTH,
                    },
                    pattern: {
                        value: /^\d.*\.\d.*\.\d.*$/,
                        message: VALID_VERSION,
                    },
                }}
            />

            <PreviewButtons
                showPreview={showPreview}
                setShowPreview={setShowPreview}
            />

            {showPreview ? (
                <div className="patchNote__preview">
                    <Markdown>{content}</Markdown>
                </div>
            ) : (
                <Textarea
                    className="patchNoteForm__content"
                    label="Contenu *"
                    name="content"
                    defaultValue={content}
                    validationSchema={{
                        required: 'Ce champ est obligatoire',
                    }}
                    onChange={(e) => setContent(e.target.value)}
                />
            )}

            <Row justify="end">
                <Col xs="content">
                    <button
                        type="button"
                        className="btnSecondary"
                        onClick={onCancel}
                    >
                        Annuler
                    </button>
                </Col>
                <Col xs="content">
                    <Button
                        disabled={showPreview}
                        type="submit"
                        className="btnPrimary"
                        loading={loading}
                    >
                        {patchNote ? 'Modifier' : 'Créer'}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}

function PreviewButtons({ showPreview, setShowPreview }) {
    return (
        <Row className="home__buttons">
            <Col xs="content">
                <button
                    className={!showPreview ? 'btnPrimary' : 'btnSecondary'}
                    onClick={(e) => {
                        e.preventDefault();
                        setShowPreview(false);
                    }}
                >
                    Écriture
                </button>
            </Col>

            <Col xs="content">
                <button
                    className={showPreview ? 'btnPrimary' : 'btnSecondary'}
                    onClick={(e) => {
                        e.preventDefault();
                        setShowPreview(true);
                    }}
                >
                    Aperçu
                </button>
            </Col>
        </Row>
    );
}

export default PatchNoteForm;
