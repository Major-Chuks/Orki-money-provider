import backend from "@/services/apis";

export const fetchUserCountry = async () => {
  const response = await backend().get_user_country();

  if (response) {
    console.log(response);
  }

  return response;
};
