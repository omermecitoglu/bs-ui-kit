import { type ReactNode } from "react";
import PageTitle from "./PageTitle";

type PageSectionProps = {
  title: string,
  toolbar?: ReactNode,
  secondary?: boolean,
  children: ReactNode,
};

const PageSection = ({
  title,
  toolbar,
  secondary = false,
  children,
}: PageSectionProps) => (
  <>
    <PageTitle name={title} secondary={secondary}>
      {toolbar}
    </PageTitle>
    <section>
      {children}
    </section>
  </>
);

export default PageSection;
