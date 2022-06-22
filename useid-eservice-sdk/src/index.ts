import { IStartSessionResponse } from "./IStartSessionResponse";
import { IdentityData, IIdentityDataValues } from "./IdentityData";
import { DataGroup } from "./DataGroup";
export { DataGroup };

export class UseIdAPI {
  public static domain = "https://useid.dev.ds4g.net";
  public static widgetSrc = `${UseIdAPI.domain}/widget.js`;

  private static apiUrl = `${UseIdAPI.domain}/api/v1`;
  private readonly apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  // For now, the functions are mocking the behaviour
  private mockDataGroups: DataGroup[] = [];
  private sessionId?: string;

  async startSession(refreshAddress: string, dataGroups: DataGroup[]): Promise<IStartSessionResponse> {
    console.log("Requesting attributes", dataGroups);
    this.mockDataGroups = dataGroups;
    // Fetching data from server...
    this.sessionId = "96747088-55fa-411d-9993-092a0606ef89";
    return {
      tcTokenURL: UseIdAPI.apiUrl + `/provider/result/getTcToken.html;jsessionid=B6CDEDF68B4DAD7555187A1070770A8F`,
      sessionId: this.sessionId
    };
  }

  async getIdentityData(sessionId: string): Promise<IdentityData> {
    if (sessionId !== this.sessionId) {
      throw new Error("Identification Session Not Found");
    }
    // Fetching data from server...
    const values: IIdentityDataValues = {};
    this.mockDataGroups.forEach((value) => {
      values[value] = `Placeholder for ${Object.keys(DataGroup)[Object.values(DataGroup).indexOf(value)]}`;
    });
    return new IdentityData(values);
  }
}
