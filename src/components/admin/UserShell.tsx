import { type ReactNode, Suspense } from "react";
import { pluck } from "../../utils/object";
import UserLoader from "./UserLoader";
import type { NavItem } from "../../types/navigation";

type UserShellProps<UserType> = {
  loadUser: () => Promise<UserType | null>,
  pending: ReactNode,
  success: (user: UserType) => ReactNode,
  fallback?: ReactNode,
  userCanBeIgnored?: boolean,
  items?: NavItem<UserType>[],
};

const UserShell = <UT extends Record<string, unknown>>({
  loadUser,
  pending,
  success,
  fallback,
  userCanBeIgnored = false,
  items = [],
}: UserShellProps<UT>) => {
  const visibilityControls = pluck(items, "isVisible");
  if (userCanBeIgnored && visibilityControls.every(control => control === undefined)) {
    return success(null as unknown as UT);
  }
  return (
    <Suspense fallback={pending}>
      <UserLoader
        loadUser={loadUser}
        success={success}
        fallback={fallback}
      />
    </Suspense>
  );
};

export default UserShell;
