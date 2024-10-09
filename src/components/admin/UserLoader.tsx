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
  } catch {
    return fallback ?? success(null as unknown as UserType);
  }
};

export default UserLoader;
