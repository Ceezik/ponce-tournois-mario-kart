import { Row, Col } from 'react-grid-system';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Markdown from 'react-markdown';

function PatchNote({ patchNote }) {
    return (
        <Row justify="center">
            <Helmet>
                <title>Patch note {patchNote.version}</title>
            </Helmet>

            <Col xs={12} lg={8}>
                <Row justify="end">
                    <Col xs="content">
                        <Link
                            to={`/admin/patch-notes/${patchNote.id}/edit`}
                            className="btnPrimary"
                        >
                            Modifier
                        </Link>
                    </Col>
                </Row>

                <h1 className="patchNote__title">
                    Patch note {patchNote.version}
                </h1>

                <div className="patchNote__preview">
                    <Markdown>{patchNote.content}</Markdown>
                </div>
            </Col>
        </Row>
    );
}

export default PatchNote;
