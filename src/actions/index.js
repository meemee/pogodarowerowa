import { ogApiLink } from "../utils/constants";
  
export function fetchCity(name){
  return {
    type: 'FETCH_CITY',
    payload: {
      client: 'ogApi',
      request: {
        method: 'get',
        url: ogApiLink(name)
      }
    }
  }
}

export function resetCity() {
  return {type: 'RESET_CITY'}
}