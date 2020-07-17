import React, { useState } from 'react';
import { Col, Row } from 'react-grid-system';
import Switch from '../../utils/Switch';

function User({ user }) {
    const [isAdmin, setIsAdmin] = useState(user.isAdmin);

    return (
        <Row>
            <Col xs={12}>
                <div className="users__userWrapper">
                    <Row align="center" className="users__user">
                        <Col xs={8}>{user.username}</Col>
                        <Col xs={4}>
                            <Switch
                                on={isAdmin}
                                setOn={() => setIsAdmin(!isAdmin)}
                            />
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    );
}

export default User;
