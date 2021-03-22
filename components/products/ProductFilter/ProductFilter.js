import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useTheme, useMediaQuery } from '@material-ui/core';
import Filter from '../../common/Filter';

export default function ProductFilter({ categoryOptions, sortOptions}) {
  const { query } = useRouter();
  const theme = useTheme();
  const isWideScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);
  const [isSortExpanded, setIsSortExpanded] = useState(false);

  useEffect(() => {
    setIsCategoryExpanded(isWideScreen);
    setIsSortExpanded(isWideScreen);
  }, [isWideScreen]);

  return (
    <section>
      <Filter
        name='cat'
        options={categoryOptions}
        selected={query['cat']}
        isExpanded={isCategoryExpanded}
        toggleExpand={() => setIsCategoryExpanded(!isCategoryExpanded)}
      />
      <Filter
        name='sort'
        options={sortOptions}
        selected={query['sort']}
        isExpanded={isSortExpanded}
        toggleExpand={() => setIsSortExpanded(!isSortExpanded)}
      />
    </section>
  );
}