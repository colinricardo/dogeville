export enum CommandActionType {
  DOGE = "DOGE",
}

export interface CommandActionOption {
  isAvailable: boolean | undefined;
  label: string;
  description: string;
  fn: Function | null;
  url: string | null;
  actionType: CommandActionType;
  action: DogeAction;
}

export enum DogeAction {
  BORK = "BORK",
}
