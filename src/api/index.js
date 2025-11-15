import axios from 'axios';

export const getPlacesData = async (type, sw, ne) => {
  try {
    // ✅ If 'hotels' type requested, fetch 'restaurants' instead
    const requestType = type === "hotels" ? "restaurants" : type;

    const { data: { data } } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${requestType}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
          limit: '30',
          currency: 'USD',
          subcategory: 'hotel,bb,specialty',
          adults: '1',
        },
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_TRAVELAPI_KEY,
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        },
      }
    );

    console.log(`${requestType.toUpperCase()} API data:`, data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
