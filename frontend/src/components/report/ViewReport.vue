<template>
  <div>
    <h1>{{ reportConfig?.name }}</h1>
    <PowerBIReportEmbed v-if="loaded" :embed-config="embedConfig" :phased-embedding="phasedEmbeddingFlag" :css-class-name="reportClass" @report-obj="setReportObj"> </PowerBIReportEmbed>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { IReportEmbedConfiguration } from 'powerbi-client'
import { models, Report, Page, service, Embed } from 'powerbi-client'
import { PowerBIReportEmbed } from 'powerbi-client-vue-js'

import { getReportEmbedConfiguration } from '../../services/ReportService'

import { useReportStore } from '@/stores/report'
import type { ReportConfig } from '@/types/reportTypes'
import { useAlertStore } from '../../stores/alert'

import type { ReportEmbedConfiguration } from '@/types/reportTypes'

import { handleServiceError } from '@/util/utils.js'

// Flag which specifies whether to use phase embedding or not
const phasedEmbeddingFlag = false

// CSS Class to be passed to the wrapper
const reportClass = 'report-container'

export default defineComponent({
  name: 'ViewReport',
  components: {
    PowerBIReportEmbed,
  },
  setup() {
    return { alertStore: useAlertStore(), reportStore: useReportStore() }
  },
  data() {
    return {
      // Initialize with the basic embed configurations to the wrapper to bootstrap the report on first load
      // Values for properties like embedUrl, accessToken and settings will be set when returned from the API call to get the report
      embedConfig: {
        type: 'report',
        embedUrl: undefined,
        tokenType: models.TokenType.Embed,
        accessToken: undefined,
        settings: undefined,
      } as IReportEmbedConfiguration,

      // Store Embed object from Report component
      report: Report,
      reportClass,
      phasedEmbeddingFlag,
      reportConfig: {} as ReportConfig | undefined,
      loaded: false,
    }
  },
  async created() {
    try {
      this.reportConfig = this.reportStore.getReport(this.$route.params.id as string)

      // Get the report embed configuration from the service and set the report config for the embed component
      const reportEmbedConfiguration: ReportEmbedConfiguration = await getReportEmbedConfiguration(this.reportConfig!.id)

      this.embedConfig = {
        ...this.embedConfig,
        id: reportEmbedConfiguration.id,
        embedUrl: reportEmbedConfiguration.embedUrl,
        accessToken: reportEmbedConfiguration.embedToken.token,
        settings: {
          navContentPaneEnabled: false,
          panes: {
            filters: {
              expanded: false,
              visible: false,
            },
          },
        },
      }
      this.loaded = true
    } catch (err) {
      handleServiceError(err, this.alertStore, this.$router)
    }
  },
  methods: {
    /**
     * Assign Embed Object from Report component to report
     * @param value
     */
    setReportObj(value: typeof Report) {
      this.report = value
    },
  },
})
</script>

<style>
.report-container {
  height: 75vh;
  margin: 8px auto;
  width: 90%;
}
</style>
