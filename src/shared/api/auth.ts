import { $host, setAuthToken } from "./requestSetup";

export const auth = async (username: string): Promise<string> => {
  try {
    const response = await $host.get(
      `/auth?user=${encodeURIComponent(username)}`
    );

    const authHeader = response.headers.authorization;
    if (!authHeader) {
      throw new Error("No authorization token received");
    }

    const token = authHeader.replace("Bearer ", "");

    setAuthToken(token);

    return token;
  } catch (error) {
    console.error("Authentication error:", error);
    throw new Error("Authentication failed");
  }
};
