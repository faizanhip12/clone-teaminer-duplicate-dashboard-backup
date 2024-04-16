export interface PlaylistApi {
  isEnrolled: boolean
  channelId?: string
  thumbnail: string
  language: string
  name: any
  id?: string
  videos?: [] | any
  timeZone: string
}

export interface IPlaylist extends PlaylistApi {
  [key: string]: any
}
