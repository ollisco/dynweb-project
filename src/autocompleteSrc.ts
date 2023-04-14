import axios from 'axios'
import { GEOAPIFY_KEY } from './apiconf'

async function getSuggestions(value: string) {
  try {
    const response = await axios.get('https://api.geoapify.com/v1/geocode/autocomplete', {
      params:{
        apiKey: GEOAPIFY_KEY,
        text: value,
        filter: 'countrycode:se', // only search for swedish adresses
        lang: 'sv',
        format: 'json'
      }
    })
    console.log(response);
    return response.data.results.map((item: { formatted: string; }) => {return item.formatted})
  } catch (error) {
    console.error(error)
    return []
  }
}

export { getSuggestions }
