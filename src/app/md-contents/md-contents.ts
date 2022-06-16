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

export const emptyTopic = {
  "topic": "",
  "foldername": ""
}

export const emptyFile = {
  "displayname": "",
  "filename": "",
  "subitems": []
}

