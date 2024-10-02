// lib/ga.js
import ReactGA from 'react-ga4';

export const initGA = () => {
  ReactGA.initialize(process.env.NEXT_PUBLIC_GA_TRACKING_ID);
};

export const logPageView = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname + window.location.search });
};

export const logEvent = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};

export const logException = (description, fatal = false) => {
  ReactGA.exception({ description, fatal });
};