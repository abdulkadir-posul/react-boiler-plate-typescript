import { CancelToken } from 'axios';

export function createCancelToken() {
  return CancelToken.source();
}
