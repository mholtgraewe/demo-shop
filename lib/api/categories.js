import ajax from './ajax';

export function getAllCategories() {
  return ajax({ url: '/categories' });
}