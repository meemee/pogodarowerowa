export let ogApiKey = 'f9ab4d68c5d844d1b342d8ab712ab1f9';
export let ogApiUrl = 'https://api.opencagedata.com/geocode/v1/json';

export const ogApiLink = querry => `${ogApiUrl}?key=${ogApiKey}&q=${querry}&pretty=1`;