import React, { useEffect } from 'react';
import Select from 'react-select';
import { Row, Col, useScreenClass } from 'react-grid-system';
import { useDispatch, useSelector } from 'react-redux';
import { setMaxItems } from '../../redux/actions/statistics';
import PaginationSkeleton from './PaginationSkeleton';
import { getMaxItemsFromScreenClass } from '../../utils/utils';

function Pagination() {
    const { maxItems, itemsPerPage } = useSelector((state) => state.statistics);
    const { loading } = useSelector((state) => state.tournaments);
    const dispatch = useDispatch();
    const screenClass = useScreenClass();

    useEffect(() => {
        dispatch(setMaxItems(getMaxItemsFromScreenClass(screenClass)));
    }, [screenClass]);

    const handleMaxItemChange = ({ value }) => {
        dispatch(setMaxItems(value));
    };

    return loading ? (
        <PaginationSkeleton />
    ) : (
        <Row justify="end">
            <Col xs="content" className="statistics__paginationWrapper">
                Afficher les
                <Select
                    className="statistics__pagination"
                    value={{ label: maxItems, value: maxItems }}
                    options={itemsPerPage.map((el) => ({
                        value: el,
                        label: el,
                    }))}
                    onChange={handleMaxItemChange}
                    isSearchable={false}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 6,
                        colors: {
                            ...theme.colors,
                            primary: '#ff56a9',
                            primary25: '#f3f3f4',
                        },
                    })}
                />
                derniers tournois
            </Col>
        </Row>
    );
}

export default Pagination;
