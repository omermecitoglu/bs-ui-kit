import FormSelect from "react-bootstrap/FormSelect";
import Group from "./Group";
import Label from "./Label";

type SelectProps<Option> = {
  label: string,
  name: string,
  options: Option[],
  optionName?: (option: Option) => string,
  defaultValue?: NoInfer<Option>,
  value?: NoInfer<Option>,
  onChange?: (value: NoInfer<Option>) => void,
};

const Select = <Option extends string>({
  label,
  name,
  options,
  optionName = (option => option),
  defaultValue,
  value,
  onChange,
}: SelectProps<Option>) => (
  <Group id={name}>
    <Label text={label} />
    <FormSelect
      name={name}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange && (e => onChange(e.target.value as Option))}
    >
      {options.map(option => (
        <option key={option} value={option}>
          {optionName(option)}
        </option>
      ))}
    </FormSelect>
  </Group>
);

export default Select;
