import { useState } from 'react';
import { Col, Row } from 'react-grid-system';
import Markdown from 'react-markdown';
import Button from '../../form/Button';
import Form from '../../form/Form';
import Input from '../../form/Input';
import Textarea from '../../form/Textarea';
import Tabs from '../../utils/Tabs';

const { Tab, TabsList } = Tabs;

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
                autoFocus
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

            <Tabs
                defaultTab="write"
                onTabChange={(tab) => setShowPreview(tab === 'preview')}
            >
                <TabsList
                    tabs={[
                        { label: 'Écriture', value: 'write' },
                        { label: 'Aperçu', value: 'preview' },
                    ]}
                />

                <Tab value="write">
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
                </Tab>
                <Tab value="preview">
                    <div className="patchNote__preview">
                        <Markdown>{content}</Markdown>
                    </div>
                </Tab>
            </Tabs>

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

export default PatchNoteForm;
