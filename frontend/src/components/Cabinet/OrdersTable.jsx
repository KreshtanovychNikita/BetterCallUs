const OrdersTable = ({ id, name, date }) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{date}</td>
    </tr>
  );
};

export default OrdersTable;
