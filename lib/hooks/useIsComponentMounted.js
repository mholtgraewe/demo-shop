import { useRef, useEffect } from 'react';

export default function useIsComponentMounted() {
  const isMounted = useRef(true);

  useEffect(() => {
    return () => isMounted.current = false;
  }, [])

  return isMounted;
}