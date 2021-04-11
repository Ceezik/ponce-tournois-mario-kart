import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { getAll } from '../../../services/users';
import { Container, Row, Col } from 'react-grid-system';
import InfiniteScroll from 'react-infinite-scroll-component';
import User from './User';
import UsersFilter from './UsersFilter';
import UsersSkeleton from './UsersSkeleton';
import UserSkeleton from './UserSkeleton';
import Error from '../../utils/Error';

const PAGE_SIZE = 20;

function UsersWrapper() {
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState(undefined);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [usernameFilter, setUsernameFilter] = useState('');

    useEffect(() => {
        setLoading(true);
        setHasMore(true);

        fetchUsers([])
            .catch((err) => setError(err.response.data))
            .finally(() => setLoading(false));
    }, [usernameFilter]);

    const fetchUsers = (currentUsers) => {
        return getAll(
            currentUsers.length / PAGE_SIZE,
            PAGE_SIZE,
            usernameFilter
        ).then((res) => {
            const { users, count } = res.data;
            if (users.length < PAGE_SIZE) {
                setHasMore(false);
            }
            setUsers([...currentUsers, ...users]);
            setCount(count);
        });
    };

    return (
        <Container className="app__container">
            <Helmet>
                <title>Utilisateurs</title>
            </Helmet>

            <Row justify="center">
                <Col xs={12} lg={8}>
                    <h1 className="title--noMarginTop">
                        Utilisateurs {count !== undefined && `(${count})`}
                    </h1>

                    <UsersFilter
                        usernameFilter={usernameFilter}
                        setUsernameFilter={setUsernameFilter}
                    />

                    {loading ? (
                        <UsersSkeleton />
                    ) : error ? (
                        <Row justify="center">
                            <Col xs="content">
                                <div className="formMessage formMessage__error">
                                    {error}
                                </div>
                            </Col>
                        </Row>
                    ) : users.length === 0 ? (
                        <Error message="Aucun utilisateur ne possède ce nom d'utilisateur." />
                    ) : (
                        <>
                            <Row>
                                <Col xs={12}>
                                    <div className="users__titleWrapper">
                                        <Row className="users__title">
                                            <Col xs={8}>Nom d'utilisateur</Col>
                                            <Col xs={4}>Admin</Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>

                            <InfiniteScroll
                                style={{ overflow: 'initial' }}
                                dataLength={users.length}
                                next={() => fetchUsers(users)}
                                hasMore={hasMore}
                                loader={<UserSkeleton />}
                            >
                                <>
                                    {users.map((user) => (
                                        <User key={user.id} user={user} />
                                    ))}
                                </>
                            </InfiniteScroll>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default UsersWrapper;
