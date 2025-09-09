"use client";
import { useState } from "react";

const DEFAULT_ITEMS = [
  { id: "1", name: "apple", checked: false },
  { id: "2", name: "banana", checked: false },
  { id: "3", name: "peach", checked: false },
];
const TodoListPage = () => {
  const [items, setItems] = useState(DEFAULT_ITEMS);
  const [addItem, setAddItem] = useState("");
  const addItemToList = () => {
    if (addItem === "") return;
    const newitems = [
      { id: "" + (items.length + 1), name: addItem, checked: false },
      ...items,
    ];
    setItems(newitems);
  };
  const setChecked = (idx: number) => {
    const newItem = { ...items[idx], checked: !items[idx].checked };
    const newItems = [...items];
    newItems[idx] = newItem;
    setItems(newItems);
  };

  const deleteItems = () => {
    const newitems = items.filter(i=>!i.checked);
    setItems(newitems);
  };
  return (
    <>
      <input
        type="text"
        value={addItem}
        onChange={(e) => setAddItem(e.target.value)}
      ></input>
      <button onClick={() => addItemToList()}>add</button>
      <ul>
        {items.map((i, idx) => (
          <li key={i.id}>
            <input
              type="checkbox"
              checked={i.checked}
              onChange={() => setChecked(idx)}
            ></input>
            {i.name}
          </li>
        ))}
      </ul>
      <button onClick={() => deleteItems()}>delete</button>
    </>
  );
};

export default TodoListPage;
