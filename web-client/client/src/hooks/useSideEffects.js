import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default ({ sideEffects, dependencies = [] }) => {
    const { socket } = useSelector((state) => state.socket);

    useEffect(() => {
        sideEffects.forEach((sideEffect) => {
            socket.on(sideEffect.event, sideEffect.callback);
        });

        return () =>
            sideEffects.forEach((sideEffect) => {
                socket.off(sideEffect.event);
            });
    }, dependencies);
};
