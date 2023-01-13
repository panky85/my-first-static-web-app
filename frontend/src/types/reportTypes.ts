export interface ReportEmbedConfiguration {
  id: string
  embedUrl: string
  type: string
  embedToken: {
    token: string
    tokenId: string
    expiration: string
  }
}
export interface ReportConfig {
  id: number
  reportId: string
  workspaceId: string
  name: string
  program: string
}
