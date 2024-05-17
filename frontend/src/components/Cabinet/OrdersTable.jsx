import React from 'react';
import { NavLink } from 'react-router-dom';
const OrdersTable = ({ id, type, buyers, profit, key, date }) => {
    const handleClick = () => {
        console.log('Clicked order with id:', id);
    };
  return (
    <tr>
      <td>{id}</td>
      <td>{type}</td>
      <td>{buyers}</td>
        <td>{profit}</td>
        <td>{key}</td>
        <td>{date}</td>
    </tr>
  );
};

export default OrdersTable;
