import { faCircleUser } from "@fortawesome/free-solid-svg-icons/faCircleUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";

type UserPlaceholderProps = {
  loginPageURL?: string,
};

const UserPlaceholder = ({
  loginPageURL = "/login",
}: UserPlaceholderProps) => (
  <Button href={loginPageURL} variant="outline-success" className="d-flex align-items-center">
    <FontAwesomeIcon icon={faCircleUser} size="lg" className="fa-fw fa-fade me-2" />
    <span style={{ width: 150 }}>&nbsp;</span>
  </Button>
);

export default UserPlaceholder;
