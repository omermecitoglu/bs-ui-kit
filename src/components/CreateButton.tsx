import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import LinkButton from "./LinkButton";
import type { LinkProps } from "../types/link";
import type { ReactNode } from "react";

type CreateButtonProps = {
  as: (props: LinkProps) => ReactNode,
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
