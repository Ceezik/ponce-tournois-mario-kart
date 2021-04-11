import { Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import moment from 'moment';

function TournamentsListItem({ tournament }) {
    return (
        <Col xs={12} md={6} lg={3}>
            <Link to={`/admin/tournaments/${tournament.id}`}>
                <div className="tournamentsList__tournament">
                    <h3 className="tournamentsList__tournamentName">
                        {tournament.name}
                    </h3>
                    <label className="tournamentsList__tournamentDates">
                        {moment(tournament.startDate).format('DD MMM YYYY')}
                    </label>
                </div>
            </Link>
        </Col>
    );
}

export default TournamentsListItem;
