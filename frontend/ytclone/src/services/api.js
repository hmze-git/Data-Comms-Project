import axios from "axios";
import {MEDIA_URL} from "../services/mediaURL"


const api = axios.create({
  baseURL: `${MEDIA_URL}/api/`,
});

export default api;
