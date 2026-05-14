import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '2utyyftn',
    dataset: 'production',
  },
  deployment: {
    appId: 'dz8y0rtzd9qk820nx7522bm4',
  },
  mediaLibrary: {
    // set the path relative to the location of sanity.cli.ts.
    aspectsPath: 'aspects',
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})
