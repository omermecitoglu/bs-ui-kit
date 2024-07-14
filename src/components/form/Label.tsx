import FormLabel from "react-bootstrap/FormLabel";

type LabelProps = {
  text: string,
};

const Label = ({
  text,
}: LabelProps) => (
  <FormLabel className="text-muted">
    {text}
  </FormLabel>
);

export default Label;
