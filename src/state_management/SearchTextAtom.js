import { atom } from 'recoil';

export const SearchTextAtom = atom({
  key: 'SearchTextAtom', // unique ID (with respect to other atoms/selectors)
  default: '' // default value (aka initial value)
});
