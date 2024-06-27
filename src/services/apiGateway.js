const API_ROOT = import.meta.env.VITE_API_URL;

export const apiGet = (url) => {
  return fetch(API_ROOT + url)
    .then(response => {
      if (!response.ok) {
        console.log("Network failure")
      }
      return response;
    })
    .then(data => data.json())
}