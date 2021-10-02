import { getComparisonColor, isComparisonUnique } from '../../utils/utils';
import {
    SET_LOADING_COMPARISONS,
    SET_LOADING_STREAMERS,
    SET_STREAMERS,
    SET_STREAMERS_COMPARISONS,
    ON_GET_PARTICIPATIONS,
} from '../types/useStreamersChart';

const intitialState = {
    streamers: [],
    loadingStreamers: true,
    streamersComparisons: [],
    loadingComparisons: true,
};

export default function (state = intitialState, action) {
    switch (action.type) {
        case ON_GET_PARTICIPATIONS:
            const { comparisons } = action.payload.reduce(
                (acc, curr) => {
                    if (!isComparisonUnique(curr, state.streamersComparisons))
                        return acc;

                    const color = getComparisonColor(acc.alreadyUsedColors);
                    return {
                        comparisons: [...acc.comparisons, { ...curr, color }],
                        alreadyUsedColors: [...acc.alreadyUsedColors, color],
                    };
                },
                {
                    comparisons: [],
                    alreadyUsedColors: state.streamersComparisons.map(
                        (c) => c.color
                    ),
                }
            );

            return {
                ...state,
                loadingComparisons: false,
                streamersComparisons: [
                    ...state.streamersComparisons,
                    ...comparisons,
                ],
            };
        case SET_STREAMERS:
            return { ...state, streamers: action.payload };
        case SET_LOADING_STREAMERS:
            return { ...state, loadingStreamers: action.payload };
        case SET_STREAMERS_COMPARISONS:
            return { ...state, streamersComparisons: action.payload };
        case SET_LOADING_COMPARISONS:
            return { ...state, loadingComparisons: action.payload };
        default:
            return state;
    }
}
