import FormCheck from "react-bootstrap/FormCheck";
import AdvancedSelect from "./AdvancedSelect";
import Input from "./Input";
import Select from "./Select";
import type { SchemaObject } from "@omer-x/openapi-types/schema";

type SmartFormItemProps = {
  name: string,
  schema: SchemaObject,
  isRequired?: boolean,
  showPlaceHolder?: true,
};

const SmartFormItem = ({
  name,
  schema,
  isRequired = false,
  showPlaceHolder,
}: SmartFormItemProps) => {
  if (schema.type === "string") {
    if (schema.enum) {
      return <Select label={name} name={name} options={schema.enum} />;
    }
    return (
      <Input
        label={name}
        name={name}
        type="text"
        placeholder={showPlaceHolder && schema.description}
        required={isRequired}
      />
    );
  }
  if (schema.type === "number" || schema.type === "integer") {
    return (
      <Input
        label={name}
        name={name}
        type="number"
        placeholder={showPlaceHolder && schema.description}
        min={schema.minimum}
        required={isRequired}
      />
    );
  }
  if (schema.type === "boolean") {
    return (
      <FormCheck
        label={name}
        name={name}
      />
    );
  }
  if (schema.type === "array") {
    if (Array.isArray(schema.items)) {
      // ???
    } else if (schema.items.type === "string") {
      if (schema.items.enum) {
        return (
          <AdvancedSelect
            label={name}
            name={name}
            options={schema.items.enum.map(value => ({ id: value, displayName: value }))}
            valueKey="id"
            labelKey="displayName"
            emptyLabel="No matches found."
            multiple
            defaultValue={["admin"]}
          />
        );
      } else {
        // ???
      }
    }
  }
  if (schema.type === "object") {
    return (
      <>
        {schema.properties && Object.entries(schema.properties).map(([propertyName, property]) => (
          <SmartFormItem
            key={propertyName}
            name={propertyName}
            schema={property}
            isRequired={schema.required?.includes(propertyName)}
          />
        ))}
      </>
    );
  }
  return <div className="text-danger">{schema.type}</div>;
};

export default SmartFormItem;
