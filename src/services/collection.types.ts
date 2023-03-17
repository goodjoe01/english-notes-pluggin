export interface Collection {
  id?: string
  name: string
  createdAt?: string | Date | null
  updatedAt?: string
  user?: string
}

export interface CollectionState {
  collections: Collection[];
  user?: string;
}