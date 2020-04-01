const LOCATION_LOCAL_STORAGE_KEY = 'preferred-country';

function getLocation(): string | null {
  if (localStorage) {
    return localStorage.getItem(LOCATION_LOCAL_STORAGE_KEY);
  } else {
    return null;
  }
}

function setLocation(country: string) {
  localStorage.setItem(LOCATION_LOCAL_STORAGE_KEY, country);
}

export default { getLocation, setLocation };