import { useEffect, useState } from "react";
import axios from "axios";

function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/customers")
      .then((response) => setCustomers(response.data))
      .catch((error) => console.error("Müşteri listesi alınamadı", error));
  }, []);

  return (
    <div>
      <h2>Müşteri Listesi</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>{customer.first_name} {customer.last_name} - {customer.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default Customers;
