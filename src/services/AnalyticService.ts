import ReactGA from 'react-ga';
import { shouldMock } from '../config/constants';

function initialize() {
  if (shouldMock) {
    console.log('Skipping analytics init.');
    return;
  }
  ReactGA.initialize('UA-145929509-2');
  ReactGA.pageview('/');
}

export default {
  initialize,
};