import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function ParticipationChartLegends({
    series,
    hiddenSeries,
    onShow,
    onHide,
    onRemove,
}) {
    return (
        <div className="participation__chartLegends">
            {series.map((serie) => {
                const isHidden = hiddenSeries.includes(serie.name);

                return (
                    <div
                        key={serie.name}
                        className="participation__chartLegendWrapper"
                    >
                        <div
                            className={`participation__chartLegend ${
                                isHidden
                                    ? 'participation__chartLegend--hidden'
                                    : ''
                            }`}
                            onClick={() =>
                                isHidden
                                    ? onShow(serie.name)
                                    : onHide(serie.name)
                            }
                        >
                            <div
                                className="participation__chartLegendColor"
                                style={{ backgroundColor: serie.color }}
                            />

                            {serie.name}
                            {serie.tournament && ` (${serie.tournament})`}
                        </div>

                        {serie.deletable && (
                            <FontAwesomeIcon
                                icon={faTrashAlt}
                                className="participation__chartLegendDelete"
                                onClick={() => onRemove(serie.name)}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default ParticipationChartLegends;
