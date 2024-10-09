import React, { type ReactNode } from "react";

type SidebarProps = {
  children: ReactNode,
};

const Sidebar = ({
  children,
}: SidebarProps) => (
  <div id="admin-sidebar" className="d-none d-md-block col-md-3 col-lg-2 py-3 bg-body-tertiary border-end">
    <div className="sticky-md-top">
      {children}
    </div>
  </div>
);

export default Sidebar;
