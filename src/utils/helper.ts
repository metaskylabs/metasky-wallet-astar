import { getUserProfile } from '@actions/profile';
import { handleErrorMessage } from '@utils/handleResponseToast';
import React, { useEffect, useRef } from 'react';
import { LocalStorageVariables } from '@constants/authentication';
import generateToast from '@components/Shared/GenerateToast';
import { ToastType } from '@components/Shared/Toast';
import { rarityRange } from '@components/Shared/Card/Nfts';
import { colors } from '@styles/shared';
import moment from 'moment';
import NOOB from '@constants/noob';

export const storePathValues = () => {
  if (typeof window !== `undefined`) {
    const storage = window?.sessionStorage;
    if (!storage) return;
    // Set the previous path as the value of the current path.
    const prevPath = storage.getItem(`currentPath`);
    storage.setItem(`prevPath`, prevPath as string);
    // Set the current path value by looking at the browser's location object.
    storage.setItem(`currentPath`, window.location.pathname);
  }
};

export const useIsMount = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};

export const isPanVerified = async (): Promise<boolean> => {
  try {
    const profileData = await getUserProfile();
    if (profileData.data.pan_verified) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    handleErrorMessage(error);
    return false;
  }
};

export const openInNewWindow = (
  url: string,
  height: number,
  width: number,
): boolean => {
  const newWindow = window.open(
    url,
    `_blank`,
    `height=${height},width=${width},popup=true`,
  );

  if (newWindow === null) {
    return false;
  } else {
    return true;
  }
};

export const textTruncate = (
  text: string | undefined,
  start: number,
  end: number,
): string => {
  return (
    text?.slice(0, start) +
    `.....` +
    text?.slice(text?.length - end, text?.length)
  );
};
export const STORAGE = `storage`;
export const createOrUpdateToken = (
  tokenType: LocalStorageVariables,
  token: string,
): boolean => {
  if (typeof window !== `undefined`) {
    try {
      localStorage.setItem(tokenType, token);
      window.dispatchEvent(new Event(STORAGE));
      return true;
    } catch (e) {
      return false;
    }
  } else {
    return false;
  }
};

export const getToken = (tokenType: LocalStorageVariables): string | false => {
  if (typeof window !== `undefined`) {
    const token = localStorage.getItem(tokenType);
    if (token) {
      return token;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const deleteToken = (tokenType: LocalStorageVariables): boolean => {
  if (typeof window !== `undefined`) {
    localStorage.removeItem(tokenType);
    window.dispatchEvent(new Event(STORAGE));
    return true;
  } else {
    return false;
  }
};

export const sendMessageToParent = (message: string, target = `*`) => {
  if (window.parent) {
    window.parent.postMessage(message, target);
  }
  if (window.opener) {
    window.opener.postMessage(message, target);
  }
};

export const limitDecimal = (value: string, decimalPlaces: number) => {
  const wholeNumberLength = value.indexOf(`.`);
  return value.indexOf(`.`) >= 0
    ? Number(value) >= 0.00001
      ? value.substring(0, wholeNumberLength) +
        value.substring(
          wholeNumberLength,
          wholeNumberLength + decimalPlaces + 1,
        )
      : Number(value) === 0
      ? value
      : `<0.00001`
    : value;
};

export const exponentNumberConverter = (input: number) => {
  if (Math.abs(input) < 1.0) {
    const power: number = parseInt(input.toString().split(`e-`)[1]);
    if (power) {
      input *= Math.pow(10, power - 1);
      return `0.` + new Array(power).join(`0`) + input.toString().substring(2);
    }
  } else {
    let zeroCount: number = parseInt(input.toString().split(`+`)[1]);
    if (zeroCount > 20) {
      zeroCount -= 20;
      input /= Math.pow(10, zeroCount);
      input += parseInt(new Array(zeroCount + 1).join(`0`));
    }
  }
  return input.toString();
};

export const useOutsideClick = (callback: any) => {
  const ref: React.RefObject<HTMLDivElement> = React.useRef(null);

  React.useEffect(() => {
    const handleClick = (event: Event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as HTMLDivElement)
      ) {
        callback();
      }
    };

    document.addEventListener(`click`, handleClick);

    return () => {
      document.removeEventListener(`click`, handleClick);
    };
  }, [ref]);

  return ref;
};

export const onCopy = (copyText: string, message: string) => {
  navigator.clipboard
    .writeText(copyText)
    .then(() => {
      generateToast({
        content: message,
        type: ToastType.SUCCESS,
      });
    })
    .catch(NOOB);
};

export const dateTimeFormat = (date: string | undefined | Date) => {
  return moment(date).format(`D MMM, YY | h:mm A`);
};

export const dateFormat = (date: string | number | Date | undefined) => {
  return moment(date).format(`D MMM, YY`);
};

export const tagBackground = (rarity: number) => {
  if (rarity <= rarityRange.HIGH) {
    return colors.Rarirty_Background_High;
  } else if (rarity <= rarityRange.MID) {
    return colors.Rarirty_Background_Mid;
  } else {
    return colors.Rarirty_Background_Low;
  }
};

export function formatCurrency(value: string, currency = `INR`) {
  return currency === `INR`
    ? `₹${value}`
    : Number(value) > 0.00001
    ? `${value} ${currency}`
    : Number(value) === 0
    ? `0`
    : `<0.00001`;
}
