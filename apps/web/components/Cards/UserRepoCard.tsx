import { Card, Col, Link, Text } from "@nextui-org/react";
import { Repo } from "../../types/sanity";

const UserRepoCard = (props: Omit<Repo, "_type" | "_key">) => {
  return (
    <Card hoverable bordered>
      <Card.Header>
        <Col>
          <Text
            size={12}
            weight="bold"
            transform="uppercase"
            css={{
              textGradient: "45deg, $blue600 -20%, $pink600 50%",
            }}
          >
            {props.language}
          </Text>
          <Text h4 transform="uppercase">
            {props.name}
          </Text>
        </Col>
      </Card.Header>
      <Text>{props.description}</Text>
      <Card.Footer>
        <Link target="_blank" href={props.html_url}>
          Se på Github
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default UserRepoCard;
