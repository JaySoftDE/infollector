export interface Topic {
  topic: string;
  foldername: string;
}

export interface MarkDownFile {
  displayname: string;
  filename: string;
  subitems: MDFSubItem[];
}

interface MDFSubItem {
  itemname: string;
  filename: string;
}

export const defaultTopic = {
  "topic": "",
  "foldername": "_default"
}

export const defaultFile = {
  "displayname": "",
  "filename": "_default",
  "subitems": []
}

