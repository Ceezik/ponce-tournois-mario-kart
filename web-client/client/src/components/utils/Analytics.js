import { useEffect } from 'react';
import ReactGA from 'react-ga';
import { useLocation } from 'react-router-dom';

function Analytics() {
    const location = useLocation();

    useEffect(() => ReactGA.initialize(process.env.REACT_APP_ANALYTICS_ID), []);

    useEffect(() => {
        ReactGA.set({ page: location.pathname });
        ReactGA.pageview(location.pathname);
    }, [location]);

    return <></>;
}

export default Analytics;
