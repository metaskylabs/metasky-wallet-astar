import Cookies from 'universal-cookie';

const COOKIE_PATH = `/`;
const hostValues =
  typeof window === `undefined` ? null : window.location.hostname.split(`.`);
const environment: string | undefined | null =
  hostValues === null
    ? null
    : hostValues[0] === `localhost`
    ? `stage`
    : hostValues[0].split(`-`)[1] ?? `prod`;
const COOKIE_DOMAIN =
  hostValues === null ? null : hostValues.slice(-2).join(`.`);
const ACCESS_COOKIE_NAME =
  environment === `stage` ? `accessTokenStage` : `accessToken`;
const REFRESH_COOKIE_NAME =
  environment === `stage` ? `refreshTokenStage` : `refreshToken`;
const COOKIE_OWNER =
  environment === `stage` ? `cookieOwnerStage` : `cookieOwner`;

const cookies = new Cookies();

export function clearAllCookies() {
  if (COOKIE_DOMAIN !== null) {
    cookies.remove(ACCESS_COOKIE_NAME, {
      path: COOKIE_PATH,
      domain: COOKIE_DOMAIN,
    });
    cookies.remove(REFRESH_COOKIE_NAME, {
      path: COOKIE_PATH,
      domain: COOKIE_DOMAIN,
    });
    cookies.remove(COOKIE_OWNER, {
      path: COOKIE_PATH,
      domain: COOKIE_DOMAIN,
    });
  }
}

export function removeAccessToken() {
  clearAllCookies();
}

export function removeRefreshToken() {
  clearAllCookies();
}

export function setAccessTokenCookie(accessToken: string) {
  try {
    if (COOKIE_DOMAIN !== null) {
      const decode = JSON.parse(atob(accessToken.split(`.`)[1]));
      cookies.set(ACCESS_COOKIE_NAME, accessToken, {
        path: COOKIE_PATH,
        domain: COOKIE_DOMAIN,
        expires: new Date(decode.exp * 1000),
      });
      cookies.set(COOKIE_OWNER, `wallet-service`, {
        path: COOKIE_PATH,
        domain: COOKIE_DOMAIN,
        expires: new Date(decode.exp * 1000),
      });
    }
  } catch (err) {
    throw new Error(`Invalid token`);
  }
}

export function setRefreshTokenCookie(refreshToken: string) {
  try {
    if (COOKIE_DOMAIN !== null) {
      const decode = JSON.parse(atob(refreshToken.split(`.`)[1]));
      cookies.set(REFRESH_COOKIE_NAME, refreshToken, {
        path: COOKIE_PATH,
        domain: COOKIE_DOMAIN,
        expires: new Date(decode.exp * 1000),
      });
      cookies.set(COOKIE_OWNER, `wallet-service`, {
        path: COOKIE_PATH,
        domain: COOKIE_DOMAIN,
        expires: new Date(decode.exp * 1000),
      });
    }
  } catch (err) {
    throw new Error(`Invalid token`);
  }
}

export function getAccessToken(): string | undefined {
  try {
    const cookieOwner = cookies.get(COOKIE_OWNER);
    const accessToken = cookies.get(ACCESS_COOKIE_NAME);
    if (accessToken) {
      const decode = JSON.parse(atob(accessToken.split(`.`)[1]));
      if (
        cookieOwner === `wallet-service` ||
        (!(cookieOwner === `wallet-service`) && !decode.isExternalWalletUser)
      ) {
        if (COOKIE_DOMAIN !== null && cookieOwner !== `wallet-service`) {
          cookies.set(COOKIE_OWNER, `wallet-service`, {
            path: COOKIE_PATH,
            domain: COOKIE_DOMAIN,
            expires: new Date(decode.exp * 1000),
          });
        }
        return accessToken;
      } else {
        return undefined;
      }
    }
    return undefined;
  } catch (err) {
    clearAllCookies();
    return undefined;
  }
}

export function getRefreshToken(): string | undefined {
  return cookies.get(REFRESH_COOKIE_NAME);
}
