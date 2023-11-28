import axios from "axios";

export default async function getNewAccessToken() {
  try {
    const newToken = await axios.get("http://localhost:5000/refresh", {
      withCredentials: true,
    });

    return newToken.data.accessToken;
  } catch (err) {
    console.log(err);
  }
}
