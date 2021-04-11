import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-grid-system';
import Switch from '../../utils/Switch';
import { updateById } from '../../../services/users';

function User({ user }) {
    const [isAdmin, setIsAdmin] = useState(user.isAdmin);

    const update = (isAdmin) => {
        setIsAdmin(isAdmin);
        updateById({ id: user.id, isAdmin }).catch(() => setIsAdmin(!isAdmin));
    };

    return (
        <Row>
            <Col xs={12}>
                <div className="users__userWrapper">
                    <Row align="center" className="users__user">
                        <Col xs={8}>
                            <Link
                                className="primaryLink"
                                to={`/users/${user.username}`}
                            >
                                {user.username}
                            </Link>
                        </Col>
                        <Col xs={4}>
                            <Switch
                                on={isAdmin}
                                setOn={() => update(!isAdmin)}
                            />
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    );
}

export default User;
