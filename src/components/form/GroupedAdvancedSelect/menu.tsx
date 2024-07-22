import { Fragment } from "react";
import { Highlighter, Menu, MenuItem, type RenderMenuProps } from "react-bootstrap-typeahead";
import { omit } from "../../../utils/object";
import type { Option, TypeaheadManagerChildProps } from "react-bootstrap-typeahead/types/types";

const menu = (
  labelKey: string,
  groupKey: string,
  groupNames: Record<string, string>,
) => {
  return (results: Option[], menuProps: RenderMenuProps, state: TypeaheadManagerChildProps) => {
    let index = 0;
    const group = Object.groupBy(results, o => {
      if (typeof o === "object" && groupKey in o) {
        return o[groupKey];
      }
    });
    const items = Object.keys(group).toSorted().map(key => (
      <Fragment key={key}>
        {index !== 0 && <Menu.Divider />}
        <Menu.Header>{key in groupNames ? groupNames[key] : key}</Menu.Header>
        {group[key] && group[key].map(i => {
          const item = (
            <MenuItem key={index} option={i} position={index}>
              <Highlighter search={state.text}>
                {typeof i === "object" && labelKey in i ? i[labelKey] : ""}
              </Highlighter>
            </MenuItem>
          );

          index += 1;
          return item;
        })}
      </Fragment>
    ));
    return (
      <Menu {...omit(menuProps, "newSelectionPrefix", "paginationText", "renderMenuItemChildren")}>
        {items}
      </Menu>
    );
  };
};

export default menu;
