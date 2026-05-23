import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];

export default App;

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}
function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = { id: Date.now(), quantity, description, packed: false };
    onAddItem(newItem);
    // console.log(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item...."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function Item({ itemData, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={itemData.packed}
        onChange={() => onToggleItem(itemData.id)}
      />
      <span style={{ textDecoration: itemData.packed ? "line-through" : "" }}>
        {itemData.quantity} {itemData.description}
      </span>
      <button>❌</button>
    </li>
  );
}
function PackingList({ items, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((itemData) => (
          <Item
            itemData={itemData}
            onToggleItem={onToggleItem}
            key={itemData.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button>Clear list</button>
      </div>
    </div>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have 1 items on your list, and you already packed 0 (0%)</em>
    </footer>
  );
}
function App() {
  const [items, setItems] = useState([]);

  function handleAddNewItem(item) {
    setItems((items) => [...items, item]);
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      ),
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddNewItem} />
      <PackingList items={items} onToggleItem={handleToggleItem} />
      <Stats />
    </div>
  );
}
