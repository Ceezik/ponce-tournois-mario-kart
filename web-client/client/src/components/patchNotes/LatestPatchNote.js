import React, { useEffect } from 'react';
import moment from 'moment';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Row, Col } from 'react-grid-system';
import Markdown from 'react-markdown';

function LatestPatchNote({ patchNote, onClose }) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => (document.body.style.overflow = 'auto');
    }, []);

    return (
        <motion.div
            className="latestPatchNote__overlay"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="latestPatchNote__modal"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
            >
                <Row justify="end">
                    <Col>
                        <h1 className="latestPatchNote__title">
                            Nouveautés du{' '}
                            {moment(patchNote.createdAt).format('DD MMMM YYYY')}
                        </h1>
                        <h4 className="latestPatchNote__subtitle">
                            Version {patchNote.version}
                        </h4>
                    </Col>
                    <Col
                        xs="content"
                        className="latestPatchNote__close"
                        onClick={onClose}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </Col>
                </Row>

                <div className="latestPatchNote__content">
                    <Markdown>{patchNote.content}</Markdown>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default LatestPatchNote;
