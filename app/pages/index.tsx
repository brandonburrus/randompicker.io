import { ChangeEvent, FormEvent, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import {
  Button,
  Card,
  Dialog,
  Heading,
  Pane,
  Table,
  Text,
  TextInputField,
} from "evergreen-ui";
import styles from "../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../redux/store";
import { Item } from "../item.interface";
import { addItem, removeItem } from "../redux/actions";
import { RandomItem } from "../components/RandomItem";

const Home: NextPage = () => {
  const items = useSelector<AppState, Item[]>((state) => state.items);
  const dispatch = useDispatch();

  const [inputFieldText, setInputFieldText] = useState("");
  const [randomItem, setRandomItem] = useState<Item | null>(null);
  const [showRandomItem, setShowRandomItem] = useState(false);

  const addItemToList = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      addItem({
        name: inputFieldText,
      })
    );
    setInputFieldText("");
  };

  const pickRandomItem = () => {
    const randIdx = Math.floor(Math.random() * items.length);
    setRandomItem(items[randIdx]);
    setShowRandomItem(true);
  };

  const deleteItemFromList = (item: Item) => {
    dispatch(removeItem({ id: item.id }));
  };

  return (
    <>
      <Head>
        <title>Random Picker</title>
      </Head>
      <div className={styles.gridContainer}>
        <Pane
          is="header"
          border="default"
          padding="16px"
          display="flex"
          alignItems="center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/dice.png" alt="dice icon" width="28px" height="28px" />
          <Heading size={700} marginLeft="10px">
            Random Picker
          </Heading>
        </Pane>
        <Pane
          is="main"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Card
            flexGrow={1}
            display="block"
            maxWidth="500px"
            minHeight="450px"
            padding="16px"
          >
            <form onSubmit={addItemToList}>
              <TextInputField
                label="Add an Item"
                description="Enter an item for your list you would like to randomly pick from"
                value={inputFieldText}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setInputFieldText(event.target.value)
                }
              />
            </form>
            {items.length > 0 && (
              <Table>
                <Table.Body>
                  {items.map((item) => (
                    <RandomItem
                      key={item.id}
                      data={item}
                      onDelete={() => deleteItemFromList(item)}
                    />
                  ))}
                </Table.Body>
              </Table>
            )}
            {items.length > 0 && (
              <Pane display="flex" justifyContent="center" marginTop="16px">
                <Button
                  disabled={items.length < 2}
                  onClick={pickRandomItem}
                  appearance="primary"
                  size="medium"
                >
                  Pick Random!
                </Button>
              </Pane>
            )}
          </Card>
          <Dialog
            isShown={showRandomItem}
            title="Random Picker"
            onCloseComplete={() => setShowRandomItem(false)}
            hasFooter={false}
          >
            <Text>{randomItem?.name ?? "An item as not selected"}</Text>
          </Dialog>
        </Pane>
        <Pane is="footer">
          <Text textAlign="center" display="block">
            Copyright &copy; {new Date().getFullYear()} Brandon Burrus
          </Text>
        </Pane>
      </div>
    </>
  );
};

export default Home;
