import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import _ from 'lodash';
import Input from './Input';
import { useFormContext } from './Form';

function Typeahead({
    name,
    options,
    loading,
    error,
    messages,
    onAsyncChange,
    ...rest
}) {
    const { setValue } = useFormContext();
    const suggestionsRef = useRef(null);
    const inputRef = useRef(null);
    const [localLoading, setLocalLoading] = useState(false);
    const [asyncFetching, setAsyncFetching] = useState(false);
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

    useEffect(() => {
        if (asyncFetching && inputRef?.current) {
            const { value } = inputRef.current;
            onAsyncChange(value).finally(() => {
                filterSuggestions(value);
                setAsyncFetching(false);
                setLocalLoading(false);
            });
        }
    }, [asyncFetching, options]);

    const debounceFilter = useCallback(
        _.debounce(() => setAsyncFetching(true), 300),
        []
    );

    const filterSuggestions = (value) => {
        setShowSuggestions(value.length > 0);
        if (value.length > 0) {
            const regex = new RegExp(`${value}`, `i`);
            setSuggestions(
                options.filter((o) => regex.test(o.value)).slice(0, 5)
            );
        } else {
            setSuggestions([]);
        }
    };

    const handleChange = async (e) => {
        const value = e.target.value;

        if (onAsyncChange) {
            setLocalLoading(true);
            debounceFilter(value);
        } else filterSuggestions(value);
    };

    const selectItem = (suggestion) => {
        setValue(name, suggestion.value);
        setShowSuggestions(false);
        setSuggestions([]);
    };

    return (
        <div className="typeahead">
            <Input
                {...rest}
                onChange={handleChange}
                onClick={handleChange}
                autoComplete="off"
                name={name}
                ref={inputRef}
            >
                {showSuggestions && (
                    <div
                        className="typeahead__suggestionsWrapper"
                        ref={suggestionsRef}
                    >
                        {loading || localLoading ? (
                            <p className="typeahead__message">
                                {messages.loading}
                            </p>
                        ) : error ? (
                            <p className="typeahead__message">
                                {messages.error}
                            </p>
                        ) : suggestions.length === 0 ? (
                            <p className="typeahead__message">
                                {messages.noResult}
                            </p>
                        ) : (
                            <ul className="typeahead__suggestionsWrapper">
                                {suggestions.map((suggestion, idx) => (
                                    <motion.li
                                        key={suggestion.id}
                                        tabIndex={0}
                                        onClick={() => selectItem(suggestion)}
                                        onKeyPress={() =>
                                            selectItem(suggestion)
                                        }
                                        initial={{ opacity: 0, x: '-30px' }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: '-10px' }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        {suggestion.label}
                                    </motion.li>
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
