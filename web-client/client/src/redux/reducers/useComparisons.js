import { getComparisonColor, isComparisonUnique } from '../../utils/utils';
import {
    ON_GET_PARTICIPATIONS,
    SET_COMPARISONS,
    SET_LOADING,
} from '../types/useComparisons';

const intitialState = {
    comparisons: [],
    loading: true,
};

export default function (state = intitialState, action) {
    switch (action.type) {
        case ON_GET_PARTICIPATIONS:
            const { comparisons: newComparisons } = action.payload.reduce(
                (acc, curr) => {
                    if (!isComparisonUnique(curr, state.comparisons))
                        return acc;

                    const color = getComparisonColor(acc.alreadyUsedColors);
                    return {
                        comparisons: [...acc.comparisons, { ...curr, color }],
                        alreadyUsedColors: [...acc.alreadyUsedColors, color],
                    };
                },
                { comparisons: [], alreadyUsedColors: [] }
            );

            return { ...state, comparisons: newComparisons, loading: false };
        case SET_COMPARISONS:
            return { ...state, comparisons: action.payload };
        case SET_LOADING:
            return { ...state, loading: action.payload };
        default:
            return state;
    }
}
