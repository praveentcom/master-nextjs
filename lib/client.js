const sanityClient = require('@sanity/client')

export default sanityClient({
  projectId: 'f5yyz0gc',
  dataset: 'production',
  apiVersion: '2021-08-31',
  useCdn: true
});