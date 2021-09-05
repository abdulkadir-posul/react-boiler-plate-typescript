import axios, {CancelTokenSource } from 'axios';

export function createCancelToken(): CancelTokenSource {
  return axios.CancelToken.source();
}
