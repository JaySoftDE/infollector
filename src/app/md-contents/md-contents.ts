export class Collection {
  collection: string = '';
  path: string = '';
}

export class Topic {
  topic: string = '';
  path: string = '';
}

export class Title {
  title: string = '';
  path: string = '';
}

export class Page {
  page: string = '';
  path: string = '';
}

export enum DisplayType {
  default,
  onePage,
  multiPages,
  error,
}

export enum StructureLevel {
  page,
  title,
  topic,
  collection,
  root,
}

export enum ItemType {
  collection = 'collection',
  topic = 'topic',
  title = 'title',
  page = 'page',
}


