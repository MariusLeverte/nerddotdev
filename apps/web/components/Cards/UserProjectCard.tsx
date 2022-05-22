import { Card, Col, Image, Text } from "@nextui-org/react";
import { useState } from "react";
import { UserProject } from "../../types/sanity";
import UserProjectModal from "../Modals/UserProjectModal";

interface UserProjectCardProps {
  name: UserProject["name"];
  role: UserProject["role"]["name"];
  previewColor: UserProject["previewColor"];
  photoUrl?: string;
  about?: UserProject["about"];
}

const UserProjectCard = ({
  name,
  role,
  previewColor,
  photoUrl,
  about,
}: UserProjectCardProps) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Card
        animated
        hoverable
        clickable={!!about}
        onClick={() => setVisible(true)}
        css={{
          padding: "$5",
          backgroundColor: previewColor,
          "@md": {
            padding: "$10",
          },
        }}
      >
        <Card.Header>
          <Col span={5}>
            <Text
              size={12}
              weight="bold"
              transform="uppercase"
              color="#ffffffAA"
            >
              {role}
            </Text>
            <Text h4 color="white" size={30} css={{ lineHeight: "$xs" }}>
              {name}
            </Text>
          </Col>
        </Card.Header>
        <Card.Body
          css={{
            justifyContent: "center",
          }}
        >
          {photoUrl && (
            <Image src={photoUrl} width={200} alt={`Prosjekt ${name}`} />
          )}
        </Card.Body>
      </Card>
      {about && (
        <UserProjectModal
          visible={visible}
          onClose={() => setVisible(false)}
          name={name}
          about={about}
        />
      )}
    </>
  );
};

export default UserProjectCard;
