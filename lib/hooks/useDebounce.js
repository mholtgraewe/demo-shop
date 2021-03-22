import { useCallback } from 'react';
import { debounce } from 'lodash';

export default function useDebounce(func, wait=500) {
  return useCallback(debounce(func, wait), []);
}