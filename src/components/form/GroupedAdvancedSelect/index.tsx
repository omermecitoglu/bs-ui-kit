"use client";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead.bs5.css";
import { useState } from "react";
import { Typeahead, type TypeaheadComponentProps } from "react-bootstrap-typeahead";
import Group from "../Group";
import Label from "../Label";
import menu from "./menu";

type GroupedAdvancedSelectProps<OT, VK, LK, GK> = {
  label: string,
  name: string,
  options: OT[],
  valueKey: VK,
  labelKey: LK,
  groupKey: GK,
  groupNames?: Record<string, string>,
  multiple?: boolean,
  defaultValue?: string[] | string,
};

const GroupedAdvancedSelect = <
  OT extends Record<string, unknown>,
  VK extends string & keyof OT,
  LK extends string & keyof OT,
  GK extends string & keyof OT,
>({
  label,
  name,
  options,
  valueKey,
  labelKey,
  groupKey,
  groupNames = {},
  multiple = false,
  defaultValue,
}: GroupedAdvancedSelectProps<OT, VK, LK, GK>) => {
  const initialSelected = options.filter(o => {
    return Array.isArray(defaultValue) ? defaultValue.includes(o[valueKey] as string) : o[valueKey] === defaultValue;
  });
  const [selected, setSelected] = useState<OT[]>(initialSelected);

  const handleChange = (selectedOptions: OT[]) => {
    setSelected(selectedOptions);
  };

  return (
    <Group id={name}>
      <Label text={label} />
      {selected.map((option, index) => (
        <input key={index} type="hidden" name={multiple ? `${name}[]` : name} value={option[valueKey] as string} />
      ))}
      <Typeahead
        multiple={multiple}
        onChange={handleChange as unknown as TypeaheadComponentProps["onChange"]}
        options={options}
        labelKey={labelKey}
        renderMenu={menu(labelKey, groupKey, groupNames)}
        defaultSelected={initialSelected as unknown as TypeaheadComponentProps["defaultSelected"]}
        clearButton
        emptyLabel="No matches found."
        // minLength={1}
        highlightOnlyResult
        paginate={false}
        // maxResults={5}
      />
    </Group>
  );
};

export default GroupedAdvancedSelect;
