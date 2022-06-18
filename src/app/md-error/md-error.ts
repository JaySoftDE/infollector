export class InfollectorError {
  type: ErrorType = ErrorType.none;
  subtype: ErrorSubtype = ErrorSubtype.none;
  message: string = '';
}

export enum ErrorType {
  none,
  topic,
  title,
  page,
}

export enum ErrorSubtype {
  none,
  file,
  structure,
}
