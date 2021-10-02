import { useState } from 'react';
import { Row, Col, Hidden } from 'react-grid-system';
import _ from 'lodash';
import AddRaceBtn from '../admin/participations/AddRaceBtn';
import ParticipationChart from './ParticipationChart';
import ParticipationRace from './ParticipationRace';
import ParticipationGoal from './ParticipationGoal';
import ParticipationPoints from './ParticipationPoints';
import ParticipationComparisonsChart from './ParticipationComparisonsChart';
import ParticipationStreamersChart from './ParticipationStreamersChart';
import { useSelector } from 'react-redux';
import Tabs from '../utils/Tabs';

const { Tab, TabsList } = Tabs;

function Participation({
    participation,
    record = null,
    worst = null,
    average = null,
    tournamentName,
    nbMaxRaces,
    canManage = true,
    user,
}) {
    const { user: currentUser } = useSelector((state) => state.auth);
    const nbRaces = participation.Races.length;

    const CHART_TABS = [
        {
            value: 'user',
            label: user.id === currentUser?.id ? 'Moi' : user.username,
        },
        { value: 'streamers', label: 'Streamers' },
        { value: 'comparisons', label: 'Se comparer' },
    ];

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
                    <div className="participation__chartsWrapper">
                        <Tabs defaultTab="user" align="center">
                            <TabsList tabs={CHART_TABS} />

                            <Tab value="user">
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
                            </Tab>
                            <Tab value="streamers">
                                <ParticipationStreamersChart
                                    participation={participation}
                                    nbMaxRaces={nbMaxRaces}
                                    tournamentName={tournamentName}
                                    user={user}
                                />
                            </Tab>
                            <Tab value="comparisons">
                                <ParticipationComparisonsChart
                                    participation={participation}
                                    nbMaxRaces={nbMaxRaces}
                                    tournamentName={tournamentName}
                                    user={user}
                                />
                            </Tab>
                        </Tabs>
                    </div>
                </Hidden>

                {participation.Races.length > 0 && (
                    <Row className="participation__title">
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
