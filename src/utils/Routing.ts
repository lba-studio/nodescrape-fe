import { createBrowserHistory, Location } from 'history';
import ReactGA from 'react-ga';

const history = createBrowserHistory();
ReactGA.initialize('UA-145929509-1');
track(history.location);

history.listen((location, action) => {
  track(location);
});

function shouldTrack(): boolean {
  return window.location.hostname !== 'localhost';
}

function track(location: Location) {
  if (shouldTrack()) {
    ReactGA.pageview(location.pathname);
  } else {
    console.debug('Skipping tracking using GA.');
    return;
  }
}

function goTo(route: string): void {
  console.log(`Redirecting to ${route}...`);
  history.push(route);
}

export default { goTo, history };