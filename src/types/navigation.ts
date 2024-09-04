import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export type NavItem<User = unknown> = {
  title: string,
  href: string,
  icon: IconDefinition,
  isVisible?: (user: User) => boolean,
};
