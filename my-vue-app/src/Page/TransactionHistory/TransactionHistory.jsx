import React, { useState, useEffect } from "react";
import NavigationBar from "../../component/NavigationBar";
import "./TransactionHistory.css";

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const userId = 2;
  const itemsPerPage = 10;
  
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
      try {
        // Sample transaction data
        const sampleData = [
          { transaction_id: 1, transaction_date: "2023-12-01", payment_method: "BK PAY", amount_paid: -200000 },
          { transaction_id: 2, transaction_date: "2023-12-03", payment_method: "Bank Transfer", amount_paid: -150000 },
          { transaction_id: 3, transaction_date: "2023-12-05", payment_method: "Momo", amount_paid: -50000 },
          { transaction_id: 4, transaction_date: "2023-12-07", payment_method: "BK PAY", amount_paid: -300000 },
          { transaction_id: 5, transaction_date: "2023-12-10", payment_method: "Bank Transfer", amount_paid: -100000 },
          { transaction_id: 6, transaction_date: "2023-12-12", payment_method: "Momo", amount_paid: -30000 },
          { transaction_id: 7, transaction_date: "2023-12-15", payment_method: "BK PAY", amount_paid: -250000 },
          { transaction_id: 8, transaction_date: "2023-12-18", payment_method: "Bank Transfer", amount_paid: -200000 },
          { transaction_id: 9, transaction_date: "2023-12-20", payment_method: "Momo", amount_paid: -20000 },
          { transaction_id: 10, transaction_date: "2023-12-23", payment_method: "BK PAY", amount_paid: -350000 },
          { transaction_id: 11, transaction_date: "2023-12-25", payment_method: "Bank Transfer", amount_paid: -120000 },
          { transaction_id: 12, transaction_date: "2023-12-27", payment_method: "Momo", amount_paid: -10000 },
        ];

        // Simulate a slight delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        setTransactions(sampleData);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
        setError("Failed to load transaction history. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userId]);

  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const currentTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="transaction-history-container">
        <h1 className="transaction-history-title">Transaction History</h1>

        {loading && <p>Loading transactions...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && (
          <>
            <table className="transaction-history-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Method</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.map((transaction, index) => (
                  <tr key={transaction.transaction_id || index}>
                    <td>{new Date(transaction.transaction_date).toLocaleDateString()}</td>
                    <td>{transaction.payment_method}</td>
                    <td
                      className={transaction.amount_paid < 0 ? "negative-amount" : ""}
                    >
                      {transaction.amount_paid.toLocaleString("en-US", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              <button
                className="pagination-button"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                ❮
              </button>
              <span className="pagination-info">
                {currentPage}/{totalPages}
              </span>
              <button
                className="pagination-button"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                ❯
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default TransactionHistory;
