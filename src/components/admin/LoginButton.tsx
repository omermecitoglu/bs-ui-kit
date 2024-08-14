import { faKey } from "@fortawesome/free-solid-svg-icons/faKey";
import LinkButton from "../LinkButton";
import type { LinkProps } from "../../types/link";

type LoginButtonProps = {
  link: (props: LinkProps) => JSX.Element,
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
