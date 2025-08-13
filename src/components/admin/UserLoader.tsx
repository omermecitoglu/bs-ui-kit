import type { ReactNode } from "react";

type UserLoaderProps<UserType> = {
  loadUser: () => Promise<UserType | null>,
  success: (user: UserType) => ReactNode,
  fallback?: ReactNode,
};

const UserLoader = async <UserType extends Record<string, unknown>>({
  loadUser,
  success,
  fallback,
}: UserLoaderProps<UserType>) => {
  try {
    const user = await loadUser();
    if (!user) throw new Error("user is null");
    return success(user);
  } catch (error) {
    if (error && typeof error === "object" && "digest" in error) {
      if (error.digest === "NEXT_HTTP_ERROR_FALLBACK;401") {
        throw error;
      }
      if (error.digest === "NEXT_HTTP_ERROR_FALLBACK;403") {
        throw error;
      }
    }
    return fallback ?? success(null as unknown as UserType);
  }
};

export default UserLoader;
