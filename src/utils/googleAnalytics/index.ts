import ReactGA from 'react-ga4';

interface GAUser {
    userId: string;
}

export const initializeGAUser = (userData: GAUser) => {
    ReactGA.set(userData);
};
