"use client";
import FormGroup from "react-bootstrap/FormGroup";
import type { ReactNode } from "react";

type GroupProps = {
  id: string,
  children: ReactNode,
};

const Group = ({
  id,
  children,
}: GroupProps) => (
  <FormGroup controlId={id}>
    {children}
  </FormGroup>
);

export default Group;
