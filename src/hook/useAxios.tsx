import axios from "axios";
import { API_URL } from "./useEnv";

export const useAxios = () => axios.create({baseURL: API_URL})