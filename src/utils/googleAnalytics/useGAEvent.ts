import ReactGA from 'react-ga4';
import { GAActions, GACategories } from './gaData';

interface Options {
    label?: string;
    value?: number;
    nonInteraction?: boolean;
}

const useGAEvent = (category: GACategories) => {
    const sendGAEvent = (
        action: GAActions,
        options?: Options,
        params?: any,
    ) => {
        ReactGA.event({ category, action, ...options }, params);
    };
    return { sendGAEvent };
};

export default useGAEvent;
