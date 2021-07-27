import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Row, Col } from 'react-grid-system';
import { getAll } from '../../../services/cups';
import CupsSkeleton from './CupsSkeleton';
import CupsListItem from './CupsListItem';
import AddCupBtn from './AddCupBtn';
import AddCupForm from './AddCupForm';
import TracksWrapper from '../tracks/TracksWrapper';

function CupsWrapper() {
    const [cups, setCups] = useState([]);
    const [selectedCup, setSelectedCup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        getAll()
            .then((res) => {
                setCups(res.data);
                if (res.data.length > 0) {
                    setSelectedCup(res.data[0]);
                }
            })
            .catch(() => setError('Impossible de récupérer les coupes.'))
            .finally(() => setLoading(false));
    }, []);

    const addCup = (cup) => {
        setCups([...cups, cup]);
        setSelectedCup(cup);
    };

    return (
        <div className="app__container">
            <Helmet>
                <title>Coupes et circuits</title>
            </Helmet>

            {loading ? (
                <CupsSkeleton />
            ) : error ? (
                <Row justify="center">
                    <Col xs="content">
                        <div className="formMessage formMessage__error">
                            {error}
                        </div>
                    </Col>
                </Row>
            ) : creating ? (
                <Row justify="center">
                    <Col xs={12} md={8} lg={6}>
                        <h1 className="title--noMarginTop">
                            Ajouter une coupe
                        </h1>
                        <AddCupForm setCreating={setCreating} addCup={addCup} />
                    </Col>
                </Row>
            ) : (
                <>
                    <h1 className="title--noMarginTop">Coupes</h1>

                    <Row>
                        {cups.map((cup) => (
                            <CupsListItem
                                key={cup.id}
                                cup={cup}
                                isSelected={
                                    selectedCup && selectedCup.id === cup.id
                                }
                                setSelectedCup={setSelectedCup}
                            />
                        ))}

                        {cups.length < 12 &&
                            [...Array(12 - cups.length)].map((i, index) => (
                                <AddCupBtn
                                    key={index}
                                    setCreating={setCreating}
                                />
                            ))}
                    </Row>

                    {selectedCup && (
                        <div className="cupsList__tracksWrapper">
                            <TracksWrapper cup={selectedCup} />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default CupsWrapper;
