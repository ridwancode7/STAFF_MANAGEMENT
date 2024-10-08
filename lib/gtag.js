// lib/gtag.js
import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize(process.env.NEXT_PUBLIC_GA_TRACKING_ID);
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
};
