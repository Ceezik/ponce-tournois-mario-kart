import { Row, Col, Hidden } from 'react-grid-system';
import _ from 'lodash';
import AddRaceBtn from '../admin/participations/AddRaceBtn';
import ParticipationChart from './ParticipationChart';
import ParticipationRace from './ParticipationRace';
import ParticipationGoal from './ParticipationGoal';
import ParticipationPoints from './ParticipationPoints';
import ParticipationChartSkeleton from './ParticipationChartSkeleton';
import ParticipationComparison from './ParticipationComparison';

function Participation({
    participation,
    record = null,
    worst = null,
    average = null,
    tournamentName,
    nbMaxRaces,
    canManage = true,
    comparisons,
    onAddComparison,
    onRemoveComparison,
    loadingComparisons,
}) {
    const nbRaces = participation.Races.length;

    return (
        <>
            <Row>
                <ParticipationPoints
                    participation={participation}
                    canManage={canManage}
                    nbMaxRaces={nbMaxRaces}
                />

                <ParticipationGoal
                    participation={participation}
                    canManage={canManage}
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
                        tournament={{
                            id: participation.TournamentId,
                            name: tournamentName,
                        }}
                        nbMaxRaces={nbMaxRaces}
                        goal={participation.goal}
                    />

                    {comparisons !== undefined && (
                        <>
                            {loadingComparisons ? (
                                <ParticipationChartSkeleton
                                    showAddComparison={false}
                                />
                            ) : (
                                comparisons.length > 0 && (
                                    <ParticipationChart
                                        current={participation}
                                        tournament={{
                                            id: participation.TournamentId,
                                            name: tournamentName,
                                        }}
                                        nbMaxRaces={nbMaxRaces}
                                        onRemoveComparison={onRemoveComparison}
                                        comparisons={comparisons}
                                    />
                                )
                            )}

                            <ParticipationComparison
                                tournament={participation.TournamentId}
                                onAddComparison={onAddComparison}
                                comparedUsers={[
                                    ...comparisons.map((c) => c.User.id),
                                    participation.UserId,
                                ]}
                            />
                        </>
                    )}
                </Hidden>

                {participation.Races.length > 0 && (
                    <Row
                        className={`participation__title ${
                            comparisons === undefined
                                ? 'participation__title--withMargin'
                                : ''
                        }`}
                    >
                        <Col xs={2}>Num.</Col>
                        <Col xs={2}>Pos.</Col>
                        <Col xs={2}>Pts</Col>
                        <Col xs={6}>Circuit</Col>
                    </Row>
                )}

                {participation.Races.map((race, index) => (
                    <ParticipationRace
                        key={race.id}
                        race={race}
                        canManage={canManage}
                        nbRace={index + 1}
                    />
                ))}

                {canManage &&
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
