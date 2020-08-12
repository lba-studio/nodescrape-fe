export const shouldMock: boolean =
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
export const backendUrl = process.env.REACT_APP_BACKEND_URL;
export const siteTitle = "NewsWatch";
