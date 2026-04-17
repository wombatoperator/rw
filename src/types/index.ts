export interface MediaFile {
  id: string;
  name: string;
  filename: string;
  type: "video" | "image" | "pdf";
  extension: string;
  size: number;
  date: string | null;
  localPath: string;
  blobUrl: string | null;
}

export interface Category {
  id: string;
  name: string;
  files: MediaFile[];
}

export interface Collection {
  id: string;
  name: string;
  categories: Category[];
}

export interface Manifest {
  collections: Collection[];
}
