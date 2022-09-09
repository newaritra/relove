const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://relove.vercel.app/api"
    : "http://localhost:3000/api";

export { BASE_URL };
