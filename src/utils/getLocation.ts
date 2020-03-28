const LOCATION_LOCAL_STORAGE_KEY = 'preferred-country';

function getLocation(): string | null {
  if (localStorage) {
    return localStorage.getItem(LOCATION_LOCAL_STORAGE_KEY);
  } else {
    return null;
  }
}

export default getLocation;