import React, {createContext, useContext, useState} from "react";

type ContextProps = {
    isLoading: boolean,
    showLoading: () => void,
    hideLoading: () => void
}

const initLoading = {
    isLoading: false,
    showLoading: () => {},
    hideLoading: () => {}
}

export const LoadingContext: React.Context<ContextProps> = createContext(initLoading);

export const LoadingProvider: React.FC = ({children}) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <LoadingContext.Provider
            value={{
                isLoading,
                showLoading: () => setIsLoading(true),
                hideLoading: () => setIsLoading(false)
            }}
        >
            {children}
        </LoadingContext.Provider>
    );
}

export const useLoadingContext = () => useContext(LoadingContext);