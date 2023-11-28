import AssetsImg from '@public/images';
import { Country_Code } from '@constants/countryCode';

export const CountryData = {
  INDIA: {
    code: Country_Code.INDIA,
    name: `India`,
    icon: AssetsImg.ic_india_flag.src,
    language: `English`,
    currency: `₹ - Rupee`,
  },
  JAPAN: {
    code: Country_Code.JAPAN,
    name: `Japan`,
    icon: AssetsImg.ic_japan_flag.src,
    language: `Japanese`,
    currency: `¥ - Japanese Yen`,
  },
  GLOBAL: {
    code: Country_Code.GLOBAL,
    name: `Global`,
    icon: AssetsImg.ic_earth.src,
    language: `English`,
    currency: `$ - US Dollar`,
  },
};
