"use client";
import { useState } from "react";

interface TodoItem {
  id: string;
  name: string;
  checked: boolean;
};

const DEFAULT_ITEMS: TodoItem[] = [
  { id: "1", name: "apple", checked: false },
  { id: "2", name: "banana", checked: false },
  { id: "3", name: "peach", checked: false },
];
const TodoListPage = () => {
  const [items, setItems] = useState<TodoItem[]>(DEFAULT_ITEMS);
  const [newItem, setNewItem] = useState("");
  const addItemToList = () => {
    if (newItem === "") return;
    const item: TodoItem = { id: "" + (items.length + 1), name: newItem, checked: false };
    setItems((prevItems) => [item, ...prevItems]);
  };
  const toggleChecked = (index: number) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = {
        ...updatedItems[index],
        checked: !updatedItems[index].checked,
      };
      return updatedItems;
    });
  };

  const deleteItems = () => {
    setItems((prevItems) => prevItems.filter((item) => !item.checked));
  };
  return (
    <>
      <input
        type="text"
        placeholder="Enter item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      ></input>
      <button onClick={() => addItemToList()}>add</button>
      <ul>
        {items.map((i, idx) => (
          <li key={i.id}>
            <input
              type="checkbox"
              checked={i.checked}
              onChange={() => toggleChecked(idx)}
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
