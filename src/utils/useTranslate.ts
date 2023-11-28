import { useEffect, useState } from 'react';
import { lang } from '@constants';
import { getToken, STORAGE } from '@utils/helper';
import { LocalStorageVariables } from '@constants/authentication';
import { Languages } from '@constants/languages';

export interface selectedStringType {
  en: string;
  jp: string;
}
export const useTranslate = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(Languages.ENGLISH);
  const [defaultLanguage, setDefaultSelectedLanguage] = useState(
    Languages.ENGLISH,
  );
  useEffect(() => {
    const preferredLanguage = getToken(
      LocalStorageVariables.PREFERRED_LANGUAGE,
    );
    if (preferredLanguage) {
      setSelectedLanguage(preferredLanguage as Languages);
    }
  }, []);

  if (typeof window !== `undefined`) {
    window.addEventListener(STORAGE, () => {
      const preferredLanguage = getToken(
        LocalStorageVariables.PREFERRED_LANGUAGE,
      );
      if (preferredLanguage) {
        setSelectedLanguage(preferredLanguage as Languages);
      }
    });
  }
  type langType = typeof lang;
  interface Type {
    [key: string]: string;
  }
  interface LangType {
    [key: string]: Type[];
  }
  const data: LangType = lang;

  const fetchSelectedLanguageData = (
    path: string,
    lang: string = Languages.ENGLISH,
  ) => {
    try {
      for (let i = data[path].length - 1; i >= 0; i--) {
        if (data[path][i][lang]) {
          return data[path][i][lang];
        }
      }
    } catch (err) {
      return path;
    }
  };

  const translate = (path: string) => {
    let translatedString = fetchSelectedLanguageData(path, selectedLanguage);
    if (!translatedString) {
      translatedString = fetchSelectedLanguageData(path, defaultLanguage);
    }
    return translatedString || ``;
  };

  return { translate };
};
