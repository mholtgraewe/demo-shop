import ajax from './ajax';
import qs from 'qs';
import { getAllCategories } from './categories';

let CACHED_CATEGORY_OPTIONS = null;

export function getAllProducts() {
  return ajax({ url: '/products' });
}

export async function getProductById(id) {
  return await ajax({ url: `/products/${encodeURIComponent(id)}` });
}

export async function getProductBySlug(slug) {
  const productList = await ajax({
    url: '/products',
    params: { slug },
  });
  return productList?.[0] ?? null;
}

export async function findProducts({
  page = 1,
  pageSize = 6,
  term = '',
  sortBy = null,
  category = null,
}) {
  term = term.trim().substr(0, 40);

  const _where = [{
    _or: [
      { name_contains: term },
      { description_contains: term },
      { 'categories.name_contains': term },
    ],
  }];

  const categoryFilter = getFilterValue(category, await getCategoryOptions());
  if (categoryFilter) {
    _where.push({ 'categories.slug': categoryFilter });
  }

  const query = qs.stringify({ _where });

  const params = {
    _start: Math.max(page - 1, 0) * pageSize,
    _limit: pageSize,
  };

  const sortMethod = getFilterValue(sortBy, getSortOptions());
  if (sortMethod) {
    params._sort = sortMethod;
  }

  return await Promise.all([
    ajax({ url: `/products/count?${query}`, params }),
    ajax({ url: `/products?${query}`, params }),
  ]);
}

function getFilterValue(key, options) {
  const item = options.find(option => option.key === key);
  return item?.value;
}

export function getSortOptions() {
  return [
    { key: 'relevance', value: null, label: 'Relevance' },
    { key: 'date-desc', value: 'createdAt:desc', label: 'Newest Arrivals' },
    { key: 'price-asc', value: 'price:asc', label: 'Price: Low to High' },
    { key: 'price-desc', value: 'price:desc', label: 'Price: High to Low' },
  ];
}

export async function getCategoryOptions() {
  if (CACHED_CATEGORY_OPTIONS) {
    return CACHED_CATEGORY_OPTIONS;
  }

  const options = [{ key: '', value: null, label: 'All categories' }];

  const categories = await getAllCategories();
  if (categories.length > 0) {
    categories.forEach(category => {
      options.push({
        key: category.slug,
        value: category.slug,
        label: category.name,
      });
    });
  }

  return CACHED_CATEGORY_OPTIONS = options;
}
