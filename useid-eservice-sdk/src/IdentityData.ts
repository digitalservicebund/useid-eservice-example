import { DataGroup } from "./DataGroup";

export interface IIdentityDataValues {
  [key: string]: string | undefined;
}

export class IdentityData {
  constructor(private values: IIdentityDataValues) { }

  get(dataGroup: DataGroup): string | undefined {
    return this.values[dataGroup];
  }
}
