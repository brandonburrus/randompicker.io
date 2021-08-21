import { Table, Pane, Button, CrossIcon, Text } from "evergreen-ui";

type RandomItemProps = {
  data: {
    name: string;
  };
  onDelete?: () => void;
};

export function RandomItem(props: RandomItemProps) {
  const { data, onDelete } = props;

  return (
    <Table.Row>
      <Pane
        display="flex"
        width="100%"
        paddingY="8px"
        paddingX="16px"
        alignItems="center"
      >
        <Pane flexGrow={1}>
          <Text padding="4px">{data.name}</Text>
        </Pane>
        {onDelete && (
          <Pane flexShrink={1}>
            <Button
              onClick={onDelete}
              appearance="minimal"
              padding="4px"
              intent="danger"
            >
              <CrossIcon />
            </Button>
          </Pane>
        )}
      </Pane>
    </Table.Row>
  );
}
