import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import LinkButton from "./LinkButton";
import type { ReactNode } from "react";

type CreateButtonProps = {
  as: (props: { href: string, className: string, children: ReactNode }) => JSX.Element,
  size?: "lg" | "sm",
  text: string,
  href: string,
};

const CreateButton = ({
  as,
  size,
  text,
  href,
}: CreateButtonProps) => (
  <LinkButton
    as={as}
    icon={faPlus}
    href={href}
    text={text}
    variant="success"
    size={size}
  />
);

export default CreateButton;
