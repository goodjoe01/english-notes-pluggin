export type DOMMessage = {
  type: string
  videoId: string
  bookmarkId: string | null
  currentTime: number | null
}

export type DOMMessageResponse = {
  response: TBookmark[]
}

export type TBookmark = {
  id: string
  title: string,
  time: number
}