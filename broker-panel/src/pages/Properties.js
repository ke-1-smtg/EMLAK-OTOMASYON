import { useEffect, useState } from "react";
import axios from "axios";

function Properties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/properties")
      .then((response) => setProperties(response.data))
      .catch((error) => console.error("Emlak listesi alınamadı", error));
  }, []);

  return (
    <div>
      <h2>Emlak Listesi</h2>
      <ul>
        {properties.map((property) => (
          <li key={property.id}>{property.title} - {property.price}₺</li>
        ))}
      </ul>
    </div>
  );
}

export default Properties;
