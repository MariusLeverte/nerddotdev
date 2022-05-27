import { Button, Checkbox, Container, Spacer } from "@nextui-org/react";
import { useCallback, useState } from "react";
import { Repo } from "../../types/sanity";
import { generateKey } from "../../utils/key";

interface GithubReposProps {
  username: string;
  initialValue: Repo[] | undefined;
  onChange: (value: (Repo | undefined)[]) => void;
}

const GithubRepos = ({
  username,
  initialValue,
  onChange,
}: GithubReposProps) => {
  const [data, setData] = useState(initialValue);

  const fetchRepos = useCallback(async () => {
    if (!username) return;

    const response = await fetch(`/api/user/github?user=${username}`);
    const data = await response.json();

    setData(data?.repos);
  }, [username]);

  const handleOnChange = useCallback(
    (values: string[] = []) => {
      const selectedRepos = data.filter((d) => values.includes(d.name));
      onChange(selectedRepos.map((s) => ({ ...s, _key: generateKey(8) })));
    },
    [data, onChange]
  );

  if (!username) return null;

  return (
    <Container fluid css={{ padding: 0 }}>
      {data && (
        <Checkbox.Group
          isRow
          label="Repoer"
          color="success"
          value={initialValue?.map((v) => v.name)}
          onChange={handleOnChange}
        >
          {data?.map((repo) => (
            <Checkbox key={repo.name} value={repo.name}>
              {repo.name}
            </Checkbox>
          ))}
        </Checkbox.Group>
      )}
      <Spacer y={1} />
      <Button onPress={fetchRepos} disabled={!username} color="secondary">
        Hent dine Github repoer
      </Button>
    </Container>
  );
};

export default GithubRepos;
