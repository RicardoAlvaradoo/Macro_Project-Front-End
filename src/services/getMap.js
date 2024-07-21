const API_KEY= import.meta.env.VITE_API_KEY;

export const getMap = (lat1, lng1, lat2, lng2, restaurant) => {
    console.log("get map", API_KEY, lat2, lng2)
    const apiUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat1},${lng1}&zoom=14&size=400x400&markers=color:yellow%7Clabel:Y%7C${lat2},${lng2}&markers=color:red%7Clabel:R%7C${lat1},${lng1}&path=${lat1},${lng1}|${lat2},${lng2}&sensor=false&key=${API_KEY}`;  
    
    return apiUrl;
}