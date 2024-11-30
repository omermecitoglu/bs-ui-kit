import SmartFormItem from "./SmartFormItem";
import type { SchemaObject } from "@omer-x/openapi-types/schema";

type SmartFormProps = {
  schema: SchemaObject,
  showPlaceHolders?: true,
};

const SmartForm = ({
  schema,
  showPlaceHolders,
}: SmartFormProps) => {
  if (schema.type !== "object") return null;

  return (
    <div className="d-flex flex-column gap-3">
      {schema.properties && Object.entries(schema.properties).map(([propertyName, property]) => (
        <SmartFormItem
          key={propertyName}
          name={propertyName}
          schema={property}
          isRequired={schema.required?.includes(propertyName)}
          showPlaceHolder={showPlaceHolders}
        />
      ))}
    </div>
  );
};

export default SmartForm;
