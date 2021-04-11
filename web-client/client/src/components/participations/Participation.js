import { Row, Col, Hidden } from 'react-grid-system';
import _ from 'lodash';
import AddRaceBtn from '../admin/participations/AddRaceBtn';
import ParticipationChart from './ParticipationChart';
import ParticipationRace from './ParticipationRace';
import ParticipationGoal from './ParticipationGoal';
import ParticipationPoints from './ParticipationPoints';

function Participation({
    participation,
    record = null,
    worst = null,
    average = null,
    tournamentName,
    nbMaxRaces,
    canAdd = true,
}) {
    const nbRaces = participation.Races.length;

    return (
        <>
            <Row>
                <ParticipationPoints
                    participation={participation}
                    canAdd={canAdd}
                    nbMaxRaces={nbMaxRaces}
                />

                <ParticipationGoal
                    participation={participation}
                    canAdd={canAdd}
                    nbMaxRaces={nbMaxRaces}
                />
            </Row>

            <div className="participation">
                <Hidden xs sm>
                    <ParticipationChart
                        record={record}
                        worst={worst}
                        average={average}
                        current={participation}
                        tournamentName={tournamentName}
                        nbMaxRaces={nbMaxRaces}
                        goal={participation.goal}
                    />
                </Hidden>

                {participation.Races.length > 0 && (
                    <>
                        <Row className="participation__title">
                            <Col xs={3}>Position</Col>
                            <Col xs={3}>Points</Col>
                            <Col xs={6}>Circuit</Col>
                        </Row>
                    </>
                )}

                {participation.Races.map((race) => (
                    <ParticipationRace
                        key={race.id}
                        race={race}
                        canAdd={canAdd}
                    />
                ))}

                {canAdd &&
                    [...Array(nbMaxRaces - nbRaces)].map((i, index) => (
                        <AddRaceBtn
                            key={index}
                            participationId={participation.id}
                        />
                    ))}
            </div>
        </>
    );
}

export default Participation;
