import { faKey } from "@fortawesome/free-solid-svg-icons/faKey";
import LinkButton from "../LinkButton";
import type { LinkProps } from "../../types/link";
import type { ReactNode } from "react";

type LoginButtonProps = {
  link: (props: LinkProps) => ReactNode,
  href: string,
  text: string,
};

const LoginButton = ({
  link: Link,
  href,
  text,
}: LoginButtonProps) => (
  <LinkButton
    as={Link}
    variant="outline-success"
    icon={faKey}
    href={href}
    text={text}
  />
);

export default LoginButton;
