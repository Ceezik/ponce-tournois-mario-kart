import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Input from './Input';
import { useFormContext } from './Form';
import { getSortedTracks } from '../../redux/selectors/tracks';

function Typeahead({ ...rest }) {
    const { setValue } = useFormContext();
    const { loading, error } = useSelector((state) => state.tracks);
    const sortedTracks = useSelector(getSortedTracks);
    const suggestionsRef = useRef(null);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        const hideSuggestions = (e) => {
            if (
                showSuggestions &&
                suggestionsRef.current &&
                !suggestionsRef.current.contains(e.target)
            ) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', hideSuggestions);
        return () => document.removeEventListener('mousedown', hideSuggestions);
    }, [showSuggestions]);

    const handleChange = (e) => {
        const value = e.target.value;

        setShowSuggestions(value.length > 0);
        if (value.length > 0) {
            const regex = new RegExp(`${value}`, `i`);
            setSuggestions(
                sortedTracks.filter((i) => regex.test(i.name)).slice(0, 5)
            );
        } else {
            setSuggestions([]);
        }
    };

    const selectItem = (suggestion) => {
        setValue('trackName', suggestion.name);
        setShowSuggestions(false);
        setSuggestions([]);
    };

    return (
        <div className="typeahead">
            <Input onChange={handleChange} autoComplete="off" {...rest}>
                {showSuggestions && (
                    <div
                        className="typeahead__suggestionsWrapper"
                        ref={suggestionsRef}
                    >
                        {loading ? (
                            <p className="typeahead__message">
                                Récupération des circuits ...
                            </p>
                        ) : error ? (
                            <p className="typeahead__message">
                                Impossible de récupérer les circuits
                            </p>
                        ) : suggestions.length === 0 ? (
                            <p className="typeahead__message">
                                Aucun circuit trouvé
                            </p>
                        ) : (
                            <ul className="typeahead__suggestionsWrapper">
                                {suggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        onClick={() => selectItem(suggestion)}
                                    >
                                        {suggestion.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </Input>
        </div>
    );
}

export default Typeahead;
