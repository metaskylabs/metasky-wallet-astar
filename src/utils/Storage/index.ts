export const isCookiesDisabled = () => {
  if (typeof window === `undefined`) return true;
  document.cookie = `ThirdPartyCookie=yes;`;
  if (document.cookie.indexOf(`ThirdPartyCookie=`) < 0) {
    return true;
  }
  return false;
};

export const saveParamsInCookies = (queryData: any, queryKey: string[]) => {
  Object.keys(queryData).map((key, index) => {
    if (queryKey.includes(key)) {
      if (typeof window === `undefined`) return true;
      document.cookie = `${key}=${queryData[key]};path=/`;
    }
  });
};
