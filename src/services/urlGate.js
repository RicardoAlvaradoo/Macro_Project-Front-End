const API_ROOT = import.meta.env.VITE_API_URL;

export const apiGet = (options, url) => {

  console.log("In URL GATE",options, API_ROOT + url )
  return fetch( API_ROOT + url, options  )
    .then(response => {
      console.log("Response", response )
      if (!response.ok) {
        console.log("Network failure")
      }
      return response;
    })
   
}