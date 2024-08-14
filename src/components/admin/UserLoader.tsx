import LoginButton from "./LoginButton";
import type { LinkProps } from "../../types/link";

type UserLoaderProps<UserType> = {
  loadUser: () => Promise<UserType | null>,
  userMenu: (user: UserType) => JSX.Element,
  link: (props: LinkProps) => JSX.Element,
  loginPageURL: string,
  loginButtonText: string,
};

const UserLoader = async <UserType extends Record<string, unknown>>({
  loadUser,
  userMenu,
  link,
  loginPageURL,
  loginButtonText,
}: UserLoaderProps<UserType>) => {
  try {
    const user = await loadUser();
    if (!user) throw new Error("user is null");
    return userMenu(user);
  } catch {
    return (
      <LoginButton
        link={link}
        href={loginPageURL}
        text={loginButtonText}
      />
    );
  }
};

export default UserLoader;
