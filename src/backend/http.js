export async function fetchAllFilms() {
  const response = await fetch("http://bechdeltest.com/api/v1/getAllMovies", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      mode: "no-cors",
    },
  });
  const resData = await response.json();

  if (!response.ok) {
    const error = new Error("Failed to fetch places");
    throw error;
  }

  console.log(resData);
  return resData;
}
