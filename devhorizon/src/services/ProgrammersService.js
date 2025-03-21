import axios from "../utils/axios"
import { errorHandler } from "../utils/axiosErrorHandler"

export async function fetchProgrammers() {
  try {
    let { data } = await axios.get("programmers");
    return data.data; //por la paginacion de laravel//
  } catch (error) {
    throw errorHandler(error)
  }
}