import { type ReactNode } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { type SmartFormValidations, getValidations } from "../../core/smart-form";
import SmartInput from "./SmartInput";
import type { ZodObject, ZodType } from "zod/v4";

/**
 * Definition for a single property in the SmartForm.
 */
type PropertyDefinition<
  Shape extends Record<string, ZodType>,
  Key extends keyof Shape,
> = ({
  /**
   * The label to display for the form field.
   */
  label: string,
  /**
   * Additional class names for the default input component.
   */
  className?: string,
} | {
  /**
   * Optional custom component to render for this field. Receives validation rules and the Zod schema for the field.
   */
  customComponent: (validations: SmartFormValidations, zodSchema: Shape[Key]) => ReactNode,
}) & {
  /**
   * Whether this field is required.
   */
  required?: boolean,
  /**
   * Optional grid size configuration for responsive layout.
   */
  gridSize?: {
    xs?: number,
    sm?: number,
    md?: number,
    lg?: number,
    xl?: number,
    xxl?: number,
  },
};

/**
 * Props for the SmartForm component.
 */
type SmartFormProps<Shape extends Record<string, ZodType>, Keys extends keyof Shape> = {
  /**
   * The Zod object schema describing the form fields.
   */
  schema: ZodObject<Shape>,
  /**
   * Property definitions for each field to render in the form.
   */
  properties: {
    [PropKey in Keys]: PropertyDefinition<Shape, PropKey>;
  },
};

/**
 * A dynamic form component that renders inputs based on a Zod schema and property definitions.
 */
const SmartForm = <
  Shape extends Record<string, ZodType>,
  ShapeKeys extends keyof Shape,
>({
  schema,
  properties,
}: SmartFormProps<Shape, ShapeKeys>) => {
  const entries = Object.entries(properties as ArrayLike<PropertyDefinition<Shape, ShapeKeys>>);
  return (
    <>
      <Row className="row-gap-3">
        {entries.map(([propertyName, propertyDefinition]) => (
          <Col
            key={propertyName}
            xs={propertyDefinition.gridSize?.xs ?? 12}
            sm={propertyDefinition.gridSize?.sm}
            md={propertyDefinition.gridSize?.md}
            lg={propertyDefinition.gridSize?.lg}
            xl={propertyDefinition.gridSize?.xl}
            xxl={propertyDefinition.gridSize?.xxl}
          >
            {"customComponent" in propertyDefinition ? (
              <>
                {propertyDefinition.customComponent(
                  getValidations(
                    schema.shape[propertyName]._zod.def.checks,
                    propertyDefinition.required ?? (
                      !schema.shape[propertyName].safeParse(undefined).success ||
                      !schema.shape[propertyName].safeParse(null).success
                    ),
                  ),
                  schema.shape[propertyName] as Shape[ShapeKeys],
                )}
              </>
            ) : (
              <SmartInput
                {...getValidations(
                  schema.shape[propertyName]._zod.def.checks,
                  propertyDefinition.required ?? (
                    !schema.shape[propertyName].safeParse(undefined).success ||
                    !schema.shape[propertyName].safeParse(null).success
                  ),
                )}
                name={propertyName}
                label={propertyDefinition.label}
                schema={schema.shape[propertyName]}
                className={propertyDefinition.className}
              />
            )}
          </Col>
        ))}
      </Row>
    </>
  );
};

export default SmartForm;
