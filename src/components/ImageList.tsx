import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import attach from "../styles/attach.module.css";
import ResponsiveBox from "./ResponsiveBox";

/* eslint-disable jsx-a11y/img-redundant-alt */

type ImageListProps = {
  collection: string[],
  publicURL: string,
  limit: number,
  ratio?: number,
  onDelete: (item: string) => void,
};

const ImageList = ({
  collection,
  publicURL,
  limit,
  ratio = 56.25, // 16:9
  onDelete,
}: ImageListProps) => (
  <Row className="mt-3 row-gap-3">
    {collection.map(item => (
      <Col key={item} xs={12 / Math.min(3, limit)}>
        <ResponsiveBox height={ratio}>
          <img
            src={item.startsWith("./") ? publicURL.replace("*", item.slice(2)) : item}
            alt={`Uploaded image (${item})`}
            width="800"
            height="600"
            className="w-100 h-100 bg-dark object-fit-cover border border-secondary rounded overflow-hidden"
          />
          <Button
            variant="danger"
            size="sm"
            className={classNames("position-absolute rounded-circle p-0 m-1", attach.toTopRight)}
            onClick={() => onDelete(item)}
          >
            <div style={{ width: 16, height: 16, position: "relative" }}>
              <FontAwesomeIcon icon={faXmark} className={classNames("fa-fw", attach.toCenter)} />
            </div>
          </Button>
        </ResponsiveBox>
      </Col>
    ))}
  </Row>
);

export default ImageList;
