import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Group from "../../form/Group";
import Input from "../../form/Input";
import Label from "../../form/Label";
import ModalForm from "../../form/ModalForm";

type ChangePasswordProps = {
  passwordLabel: string,
  buttonText: string,
  title: string,
  emailLabel: string,
  emailKey?: string,
  emailValue: string,
  newPasswordLabel: string,
  newPasswordKey: string,
  confirmButtonText: string,
  cancelButtonText: string,
  action: (formData: FormData) => void,
};

const ChangePassword = ({
  passwordLabel,
  buttonText,
  title,
  emailLabel,
  emailKey = "username",
  emailValue,
  newPasswordLabel,
  newPasswordKey,
  confirmButtonText,
  cancelButtonText,
  action,
}: ChangePasswordProps) => (
  <Group id="fake-password">
    <Label text={passwordLabel} />
    <InputGroup>
      <FormControl type="password" value="top-secret-password" readOnly />
      <ModalForm
        buttonText={buttonText}
        buttonVariant="outline-secondary"
        title={title}
        action={action}
        confirmText={confirmButtonText}
        cancelText={cancelButtonText}
      >
        <Group id="display-email">
          <Label text={emailLabel} />
          <FormControl
            type="email"
            autoComplete="username"
            name={emailKey}
            value={emailValue}
            readOnly
          />
        </Group>
        <Input
          label={newPasswordLabel}
          type="password"
          name={newPasswordKey}
          autoComplete="new-password"
          autoFocus
        />
      </ModalForm>
    </InputGroup>
  </Group>
);

export default ChangePassword;
