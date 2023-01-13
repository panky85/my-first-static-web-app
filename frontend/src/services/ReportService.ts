import type { AxiosResponse } from 'axios'

import type { ReportConfig } from './../types/reportTypes'
import type { ReportEmbedConfiguration } from '../types/reportTypes'
import { apiRequest, resources } from './BaseService'

export async function getReportEmbedConfiguration(id: number): Promise<ReportEmbedConfiguration> {
  const url = resources.reports.reportEmbedConfiguration.replace(':id', id.toString())
  const response: AxiosResponse<ReportEmbedConfiguration> = await apiRequest().then((axiosInstance) => axiosInstance.get(url))
  return response.data
}

export async function getReports(): Promise<ReportConfig[]> {
  const response: AxiosResponse<ReportConfig[]> = await apiRequest().then((axiosInstance) => axiosInstance.get(resources.reports.getReports))
  return response.data
}
