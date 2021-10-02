import React from 'react';

export function createContext() {
    const Context = React.createContext(undefined);

    const useContext = () => React.useContext(Context);

    return [Context.Provider, useContext, Context];
}
