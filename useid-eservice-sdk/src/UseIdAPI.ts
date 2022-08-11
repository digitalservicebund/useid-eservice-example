import { IStartSessionResponse } from "./IStartSessionResponse";
import { Identity } from "./Identity";
import axios from "axios";

export class UseIdAPI {
  public static domain = "https://useid.dev.ds4g.net";
  public static widgetSrc = `${UseIdAPI.domain}/widget.js`;

  private static apiBaseUrl = `${UseIdAPI.domain}/api/v1/identification/sessions`;

  constructor(apiKey: string) {
    axios.interceptors.request.use(config => {
      config.headers = config.headers ?? {};
      config.headers['Authorization'] = `Bearer ${apiKey}`;
      return config;
    });
  }

  async startSession(): Promise<IStartSessionResponse> {
    const response = await axios.post(UseIdAPI.apiBaseUrl);
    return {
      tcTokenUrl: response.data.tcTokenUrl,
    };
  }

  async getIdentity(eIdSessionId: string): Promise<Identity> {
    const response = await axios.get(`${UseIdAPI.apiBaseUrl}/${eIdSessionId}`);
    return new Identity(response.data);
  }
}

export interface IUseIdAPI {
  startSession(): Promise<IStartSessionResponse>;
  getIdentity(eIdSessionId: string): Promise<Identity>;
}
