import axios, { AxiosError } from "axios";

export async function getImage(url: string) {
  try {
    const res = await axios.get(url, {
      responseType: "blob",
    });

    const fileDescription = url.split("/")[4].split(".");
    const fileName = fileDescription[0];
    const type = fileDescription[1];

    const file = new File([res.data], fileName, { type: `image/${type}` });
    return file;
  } catch (error) {
    const axiosError = error as unknown as AxiosError;
    console.error(axiosError.status);
    console.error(axiosError.message);
    return null;
  }
}
