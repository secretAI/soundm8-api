import { MajorPitchKeys, MinorPitchKeys } from "./pitch-keys-enum";

export class PitchKeyList {
  private static major = MajorPitchKeys;
  private static minor = MinorPitchKeys;

  public static get majorKeys() {
    return this.major;
  }

  public static get minorKeys() {
    return this.minor;
  }

  public static get uniqueKeys(): string[] {
    const list: string[] = [];
    for(const key of Object.values(this.major)) {
      list.push(key);
    }
    for(const key of Object.values(this.minor)) {
      if(list.includes(key)) {
        continue;
      } else {
        list.push(key);
      }
    }

    return list;
  }
}
