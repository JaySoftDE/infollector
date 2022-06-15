export interface MarkDownFile {
  displayname: string;
  filename: string;
  subitems: MDFSubItem[];
}

interface MDFSubItem {
  itemname: string;
  filename: string;
}

export const defaultFile = {
  "displayname": "",
  "filename": "_default",
  "subitems": []
}

