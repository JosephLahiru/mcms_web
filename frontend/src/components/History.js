import React, {useState} from 'react'
import './History.css';

export default function History() {

    const [searchQuery, setSearchQuery] = useState("");

    const data = [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
        { id: 3, name: "Item 3" },
        { id: 4, name: "Item 4" },
        { id: 5, name: "Item 5" },
      ];

    const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()));

   
return (
    <div class="container">
      <h1>history</h1>

      <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..."/>

      <ul>
        {filteredData.map((item) => (
        <li key={item.id}>{item.name}</li>))}
        </ul>

  </div>
  );
}
