import { CEconfig } from './logic/config';

const dictionaries = {
  de: () => import('@/dictionaries/de.json').then((module) => module.default),
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
};

// Deep merge function
const deepMerge = (target, source) => {
  for (const key in source) {
    if (
      source[key] instanceof Object &&
      key in target &&
      target[key] instanceof Object
    ) {
      deepMerge(target[key], source[key]);
    } else if (!(key in target)) {
      target[key] = source[key];
    }
  }
  return target;
};

// Function to get dictionary with fallback
export const getDictionary = async (locale) => {
  const defaultLocale = CEconfig.lang.default;
  const selectedLoader = dictionaries[locale] || dictionaries[defaultLocale];

  const [selectedDict, defaultDict] = await Promise.all([
    selectedLoader(),
    dictionaries[defaultLocale](),
  ]);

  return deepMerge(selectedDict, defaultDict);
};