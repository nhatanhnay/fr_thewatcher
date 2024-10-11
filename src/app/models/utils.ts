import { LinkedLabel } from './views';

export function redirect(item: LinkedLabel): void {
  console.log('Redirecting to:', item.url, 'from:', item.label);
  //window.location.href = url;
}
