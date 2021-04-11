import { Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import moment from 'moment';

function PatchNoteListItem({ patchNote }) {
    return (
        <Col xs={12} md={6} lg={3}>
            <Link to={`/admin/patch-notes/${patchNote.id}`}>
                <div className="patchNotesList__patchNote">
                    <h3 className="patchNotesList__patchNoteVersion">
                        {patchNote.version}
                    </h3>
                    <label className="patchNotesList__patchNoteDates">
                        {moment(patchNote.createdAt).format('DD MMM YYYY')}
                    </label>
                </div>
            </Link>
        </Col>
    );
}

export default PatchNoteListItem;
