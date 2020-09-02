import enLocale from "i18n-iso-countries/langs/en.json";
import countries from "i18n-iso-countries";
countries.registerLocale(enLocale);

const LOCATION_LOCAL_STORAGE_KEY = "preferred-country";

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

function toPrettyName(countryCode: string) {
  return countries.getName(countryCode.toUpperCase(), "en");
}

export default { getLocation, setLocation, toPrettyName };
