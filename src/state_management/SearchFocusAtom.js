import { atom } from 'recoil';

export const SearchFocusAtom = atom({
  key: 'SearchFocusAtom', // unique ID (with respect to other atoms/selectors)
  default: false // default value (aka initial value)
});
