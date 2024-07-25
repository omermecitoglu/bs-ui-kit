"use client";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead.bs5.css";
import { useRef, useState } from "react";
import { Typeahead, type TypeaheadComponentProps } from "react-bootstrap-typeahead";
import Group from "../Group";
import Label from "../Label";
import menu from "./menu";
import type TypeaheadCore from "react-bootstrap-typeahead/types/core/Typeahead";

type GroupedAdvancedSelectProps<OT, VK, LK, GK> = {
  label: string,
  name: string,
  options: OT[],
  valueKey: VK,
  labelKey: LK,
  groupKey: GK,
  groupNames?: Record<string, string>,
  emptyLabel: string,
  multiple?: boolean,
  required?: boolean,
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
  emptyLabel,
  multiple = false,
  required = false,
  defaultValue,
}: GroupedAdvancedSelectProps<OT, VK, LK, GK>) => {
  const typeahead = useRef<TypeaheadCore>(null);
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
        ref={typeahead}
        onBlur={() => {
          if (typeahead.current && !selected.length && !multiple) {
            typeahead.current.clear();
          }
        }}
        inputProps={{ required }}
        multiple={multiple}
        onChange={handleChange as unknown as TypeaheadComponentProps["onChange"]}
        options={options}
        labelKey={labelKey}
        renderMenu={menu(labelKey, groupKey, groupNames)}
        defaultSelected={initialSelected as unknown as TypeaheadComponentProps["defaultSelected"]}
        clearButton
        emptyLabel={emptyLabel}
        // minLength={1}
        highlightOnlyResult
        paginate={false}
        // maxResults={5}
      />
    </Group>
  );
};

export default GroupedAdvancedSelect;
