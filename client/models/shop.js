import fetch from 'isomorphic-fetch'


export function fetchShops() {
  return fetch('http://pet-shop.api.mks.io/shops/1')
    .then(function(data){
      // Fetch's .json() method is asynchronous
      return data.json()
    })
}


