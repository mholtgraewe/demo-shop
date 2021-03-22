import { useRef } from 'react';

function useComponentWillMount(func) {
  const willMount = useRef(true);

  if (willMount.current && func) func();

  willMount.current = false;
}

export default useComponentWillMount;