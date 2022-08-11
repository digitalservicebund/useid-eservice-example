import { DataGroup } from "./DataGroup";

export interface IIdentityValues {
  [key: string]: string | undefined;
}

export class Identity {
  constructor(private values: IIdentityValues) { }

  get(dataGroup: DataGroup): string | undefined {
    return this.values[dataGroup.toLowerCase()];
  }
}
