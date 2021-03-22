import Axios from 'axios';

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

function buildErrorObject(message = null, code = 418) {
  return { code, message };
}

async function ajax({ url, params = {}, data = {}, method = 'GET' }) {
  try {
    const res = await axios({ method, url, params, data });
    return res?.data;
  } catch (error) {
    if (error.response) {
      const { statusText, status } = error.response;
      throw buildErrorObject(statusText, status);
    } else {
      console.error(error);
      if (error.request) {
        throw buildErrorObject('Connection error');
      } else {
        throw buildErrorObject();
      }
    }
  }
}

export default ajax;