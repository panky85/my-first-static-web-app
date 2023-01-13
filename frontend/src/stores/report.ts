import { defineStore } from 'pinia'

import type { ReportConfig } from './../types/reportTypes'

interface ReportState {
  reports: ReportConfig[]
  programs: string[]
}

export const useReportStore = defineStore('report', {
  state: (): ReportState => ({
    reports: [],
    programs: [],
  }),
  getters: {
    getReport: (state) => {
      return (id: string | number) => {
        if (Number.isInteger(id)) {
          return undefined
        }
        return state.reports.find((report) => report.id === Number(id))
      }
    },
    getReports: (state) => {
      return (program: string) => state.reports.filter((report) => report.program === program)
    },
    hasProgram: (state) => {
      return (program: string) => state.programs.includes(program)
    },
    hasReport: (state) => {
      return (id: string) => {
        if (Number.isInteger(id)) {
          return false
        }
        return state.reports.some((report) => report.id === Number(id))
      }
    },
  },
})
