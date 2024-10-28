import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Button from "react-bootstrap/Button";
import attach from "../styles/attach.module.css";

type MiniDeleteButtonProps = {
  onClick: () => void,
};

const MiniDeleteButton = ({
  onClick,
}: MiniDeleteButtonProps) => (
  <Button
    variant="danger"
    size="sm"
    className={classNames("position-absolute rounded-circle p-0 m-1", attach.toTopRight)}
    onClick={onClick}
  >
    <div style={{ width: 16, height: 16, position: "relative" }}>
      <FontAwesomeIcon icon={faXmark} className={classNames("fa-fw", attach.toCenter)} />
    </div>
  </Button>
);

export default MiniDeleteButton;
