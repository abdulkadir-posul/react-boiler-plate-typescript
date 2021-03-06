import axios, { AxiosInstance, CancelTokenSource } from 'axios';
import EventTarget from '@ungap/event-target';
import config from '../config';


export const endpoints = {
  login: '/token',
  refreshToken: '/token/refresh',
  userDetails: '/me'
};

export default class AuthService {
  
  injectedInterceptors: boolean;
  refreshingToken: boolean;
  axios: AxiosInstance;
  eventEmitter: EventTarget;
  token: string = "";
  refreshToken: string = 'true';

  constructor() {
    const baseURL = config.baseURL;
    this.injectedInterceptors = false;
    this.refreshingToken = false;

    this.axios = axios.create({
      baseURL,
    });

    this.eventEmitter = new EventTarget();

    this.verifyToken = this.verifyToken.bind(this);
  }

  /**
   * Request interceptor to verify token expiry
   * @param config
   * @returns {*}
   */
  verifyToken(config: any) {
    /**
     * TODO verify token
     */
    return config;
  }

  
  getHeaders() {
    return { ...this.axios.defaults.headers.common };
  }

  listen(type: any, fn: any) {
    return this.eventEmitter.addEventListener(type, fn);
  }

  /**
   * Set token for all request
   * @param token
   * @param refreshToken
   */
  setToken(token: string, refreshToken: string = 'true') {
    this.token = token;
    this.refreshToken = refreshToken;
    this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  /**
   * Generate config for request
   * @param cancelToken
   * @returns {{}}
   */
  getConfig({ cancelToken }: any) {
    const config: any = {};

    if (cancelToken && cancelToken.token) {
      config.cancelToken = cancelToken.token;
    }

    return config;
  }

  /*async login(username, password, cancelToken = null) {
    const config = this.getConfig({ cancelToken });
    return await this.axios.post(endpoints.login, { username, password }, config);
  }*/

  async login(username: string, password: string, cancelToken: null | CancelTokenSource = null) {
    return await Promise.resolve({data:{token: "my_token", refresh_token:true}});
  }

  /*async userDetails(cancelToken = null) {
    const config = this.getConfig({ cancelToken });

    return await this.axios.get(endpoints.userDetails, config);
  }*/

  async userDetails(cancelToken: null | CancelTokenSource = null) {
    return await Promise.resolve({data:{roles: ["admin"]}});
  }

  async generateToken(refreshToken: boolean, cancelToken: null = null) {
    const config = this.getConfig({ cancelToken });

    return await this.axios.post(endpoints.refreshToken, { refresh_token: refreshToken }, config);
  }

}
