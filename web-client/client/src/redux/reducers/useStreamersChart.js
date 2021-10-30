import { getComparisonColor, isComparisonUnique } from '../../utils/utils';
import {
    SET_LOADING_COMPARISONS,
    SET_LOADING_STREAMERS,
    SET_STREAMERS,
    SET_STREAMERS_COMPARISONS,
    ON_GET_PARTICIPATIONS,
    RESET_STATE,
} from '../types/useStreamersChart';

const initialState = {
    streamers: [],
    loadingStreamers: true,
    streamersComparisons: [],
    loadingComparisons: true,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case RESET_STATE:
            return initialState;
        case ON_GET_PARTICIPATIONS:
            const streamersComparisons = state.streamersComparisons.filter(
                (c) => !action.payload.some((p) => p.UserId === c.UserId)
            );

            const { comparisons } = action.payload.reduce(
                (acc, curr) => {
                    if (!isComparisonUnique(curr, streamersComparisons))
                        return acc;

                    const color = getComparisonColor(acc.alreadyUsedColors);
                    return {
                        comparisons: [...acc.comparisons, { ...curr, color }],
                        alreadyUsedColors: [...acc.alreadyUsedColors, color],
                    };
                },
                {
                    comparisons: [],
                    alreadyUsedColors: streamersComparisons.map((c) => c.color),
                }
            );

            return {
                ...state,
                loadingComparisons: false,
                streamersComparisons: [...streamersComparisons, ...comparisons],
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
