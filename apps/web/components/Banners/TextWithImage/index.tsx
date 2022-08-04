import Image from "next/image";
import { Grid, Text } from "ui";

const TextWithImage = ({ title, text, photo }) => {
  return (
    <Grid gap={4}>
      <Grid.Column span={6}>
        <Text as="h1" size="3xl" weight="light">
          {title}
        </Text>
        <Text size="lg" weight="light">
          {text}
        </Text>
      </Grid.Column>
      <Grid.Column span={6}>
        {photo.url && (
          <Image
            src={photo.url}
            width={photo.width}
            height={photo.height}
            alt=""
            className="w-full"
            layout="responsive"
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default TextWithImage;
