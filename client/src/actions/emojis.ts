import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:8000/api/v1";

export async function getEmojis() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await axios.get(`${BASE_URL}/emojis`);
    toast.success("Emojis fetched successfuly!");
    return response;
  } catch (error) {
    console.log(error);
    toast.error("Emojis failed to fetch!");
  } finally {
    console.log("Cleanups");
  }
}
