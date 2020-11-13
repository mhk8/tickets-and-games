import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

type Transaction = {
  id: number
  datetime: Date,
  activity: String,
  amount: number
};

type TransactionList = {
  ticketTransaction: Array<Transaction>
};

type Params = {
  userId: string;
};

function TicketHistory() {
  const [tHistory, setTHistory] = useState<Array<Transaction>>([]);
  const { userId } = useParams<Params>();
  const requestUrl = 'api/profileview/'.concat(userId);

  useEffect(() => {
    fetch(requestUrl)
      .then((res) => res.json())
      .then((data:TransactionList) => {
        setTHistory(data.ticketTransaction);
      }).catch(() => (
        setTHistory([])
      ));
  }, []);

  if (tHistory.length !== 0) {
    return (
      <table className="transaction-history-table">
        <tbody className="table-body">
          <tr>
            <th> </th>
            <th>Date</th>
            <th>Activity</th>
            <th>Amount</th>
          </tr>
          {tHistory.map((row, index) => (
            <tr key={row.id}>
              <td>{index + 1}</td>
              <td>{row.datetime}</td>
              <td>{row.activity}</td>
              <td>{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return (
    <table className="transaction-history-table">
      <tbody className="table-body" />
    </table>
  );
}

export default TicketHistory;
