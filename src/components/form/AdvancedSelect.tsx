"use client";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead.bs5.css";
import { useContext, useEffect, useRef, useState } from "react";
import Feedback from "react-bootstrap/Feedback";
import { Typeahead, type TypeaheadComponentProps } from "react-bootstrap-typeahead";
import FormContext from "../../core/form-context";
import Group from "./Group";
import Label from "./Label";
import type TypeaheadCore from "react-bootstrap-typeahead/types/core/Typeahead";

type ValueProps<T> = {
  onChange?: (value: T) => void,
  defaultValue?: T,
};

type AdvancedSelectProps<OT, VK, LK> = {
  label?: string,
  name: string,
  options: OT[],
  valueKey: VK,
  labelKey: LK,
  emptyLabel: string,
  required?: boolean,
  messages?: Record<string, string | undefined>,
} & (
  ({ multiple: true } & ValueProps<string[]>)
  |
  ({ multiple?: false } & ValueProps<string | undefined>)
);

const AdvancedSelect = <
  OT extends Record<string, unknown>,
  VK extends string & keyof OT,
  LK extends string & keyof OT,
>({
  label,
  name,
  options,
  valueKey,
  labelKey,
  emptyLabel,
  required = false,
  messages,
  ...props
}: AdvancedSelectProps<OT, VK, LK>) => {
  const initialValue = props.defaultValue;
  const initialArray = Array.isArray(initialValue) ? initialValue : (initialValue ? [initialValue] : []);
  const initialSelected = options.filter(o => initialArray.includes(o[valueKey] as string));
  const [selected, setSelected] = useState<OT[]>(initialSelected);
  const typeahead = useRef<TypeaheadCore>(null);
  const context = useContext(FormContext);
  const inputError = context.errors[name];

  useEffect(() => {
    if (!props.onChange) return;
    if (props.multiple) {
      props.onChange(selected.map(s => s[valueKey] as string));
    } else {
      props.onChange(selected.length ? selected[0][valueKey] as string : undefined);
    }
  }, [selected]);

  const handleChange = (selectedOptions: OT[]) => {
    setSelected(selectedOptions);
  };

  return (
    <Group id={name}>
      {label && <Label text={label} />}
      {selected.map((option, index) => (
        <input key={index} type="hidden" name={props.multiple ? `${name}[]` : name} value={option[valueKey] as string} />
      ))}
      <Typeahead
        ref={typeahead}
        onBlur={() => {
          if (typeahead.current && !selected.length && !props.multiple) {
            typeahead.current.clear();
          }
        }}
        inputProps={{ required }}
        multiple={props.multiple ?? false}
        selected={selected}
        onChange={handleChange as unknown as TypeaheadComponentProps["onChange"]}
        options={options}
        labelKey={labelKey}
        clearButton
        emptyLabel={emptyLabel}
        // minLength={1}
        highlightOnlyResult
        paginate={false}
        // maxResults={5}
        isInvalid={!!inputError}
      />
      {inputError && (
        <Feedback type="invalid">
          {(messages ? messages[inputError] : null) ?? context.messages[inputError] ?? inputError}
        </Feedback>
      )}
    </Group>
  );
};

export default AdvancedSelect;
