import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import MiniDeleteButton from "./MiniDeleteButton";
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
          <MiniDeleteButton onClick={() => onDelete(item)} />
        </ResponsiveBox>
      </Col>
    ))}
  </Row>
);

export default ImageList;
