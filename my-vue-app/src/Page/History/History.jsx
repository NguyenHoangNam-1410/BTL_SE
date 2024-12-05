import React, { useState, useEffect } from "react";
import "./History.css";
import NavigationBar from "../../component/NavigationBar";

function History() {
  const [historyData, setHistoryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const user_id = 2; 
  const itemsPerPage = 20; 

  const generateRandomTime = () => {
    const seconds = Math.floor(Math.random() * (60 - 30 + 1)) + 30; 
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes > 0 ? `${minutes}m ` : ""}${remainingSeconds}s`;
  };  
  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        setIsLoading(true);
        setError(null);
  
        // Sample history data
        const sampleData = [
          {fileName: "Document1.pdf", printer_id: "CANON", total_printed_side: 10, date: "2023-12-01" },
          {fileName: "Report.docx", printer_id: "CANON", total_printed_side: 15, date: "2023-12-02" },
          {fileName: "Image.docx", printer_id: "CANON", total_printed_side: 8, date: "2023-12-03" },
          {fileName: "Notes.docx", printer_id: "CANON", total_printed_side: 12, date: "2023-12-04" },
          {fileName: "Presentation.pdf", printer_id: "CANON", total_printed_side: 20, date: "2023-12-05" },
          {fileName: "Brochure.pdf", printer_id: "EPSON", total_printed_side: 25, date: "2023-12-06" },
          {fileName: "Invoice.pdf", printer_id: "EPSON", total_printed_side: 5, date: "2023-12-07" },
          {fileName: "Summary.docx", printer_id: "HP", total_printed_side: 10, date: "2023-12-08" },
          {fileName: "Draft.pdf", printer_id: "HP", total_printed_side: 6, date: "2023-12-09" },
          {fileName: "Research.docx", printer_id: "HP", total_printed_side: 18, date: "2023-12-10" },
          {fileName: "Manual.pdf", printer_id: "BROTHER", total_printed_side: 22, date: "2023-12-11" },
          {fileName: "Poster.pdf", printer_id: "BROTHER", total_printed_side: 4, date: "2023-12-12" },
          {fileName: "Flyer.pdf", printer_id: "CANON", total_printed_side: 30, date: "2023-12-13" },
          {fileName: "Assignment.docx", printer_id: "CANON", total_printed_side: 12, date: "2023-12-14" },
          {fileName: "Blueprint.pdf", printer_id: "EPSON", total_printed_side: 16, date: "2023-12-15" },
          {fileName: "Contract.pdf", printer_id: "EPSON", total_printed_side: 14, date: "2023-12-16" },
          {fileName: "Summary.docx", printer_id: "HP", total_printed_side: 8, date: "2023-12-17" },
          {fileName: "Diagram.pdf", printer_id: "HP", total_printed_side: 10, date: "2023-12-18" },
          {fileName: "Catalog.pdf", printer_id: "BROTHER", total_printed_side: 24, date: "2023-12-19" },
          {fileName: "Presentation.pdf", printer_id: "BROTHER", total_printed_side: 18, date: "2023-12-20" },
          {fileName: "Assignment.docx", printer_id: "CANON", total_printed_side: 12, date: "2023-12-14" },
          {fileName: "Blueprint.pdf", printer_id: "EPSON", total_printed_side: 16, date: "2023-12-15" },
          {fileName: "Contract.pdf", printer_id: "EPSON", total_printed_side: 14, date: "2023-12-16" },
          {fileName: "Summary.docx", printer_id: "HP", total_printed_side: 8, date: "2023-12-17" },
          {fileName: "Diagram.pdf", printer_id: "HP", total_printed_side: 10, date: "2023-12-18" },
          {fileName: "Catalog.pdf", printer_id: "BROTHER", total_printed_side: 24, date: "2023-12-19" },
          {fileName: "Presentation.pdf", printer_id: "BROTHER", total_printed_side: 18, date: "2023-12-20" },
        ];
        
  
        setHistoryData(
          sampleData.map((item) => ({
            ...item,
            duration: generateRandomTime(), 
          }))
        );
      } catch (error) {
        setError("Failed to load history data");
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchHistoryData();
  }, []);
  
  // useEffect(() => {
  //   const fetchHistoryData = async () => {
  //     try {
  //       setIsLoading(true);
  //       setError(null);

  //       const response = await fetch(`/api/print-jobs/${user_id}`);
  //       if (!response.ok) {
  //         throw new Error(`Error: ${response.statusText}`);
  //       }

  //       const data = await response.json();
  //       setHistoryData(
  //         data.map((item) => ({
  //           ...item,
  //           duration: generateRandomTime(), 
  //         }))
  //       );
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchHistoryData();
  // }, [user_id]);

  const totalPages = Math.ceil(historyData.length / itemsPerPage);

  const currentData = historyData.slice(
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <NavigationBar />
      <div className="history-page">
        <table className="history-table">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Printer</th>
              <th>No. of Pages</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index}>
                <td>{item.fileName}</td>
                <td>{item.printer_id}</td>
                <td>{item.total_printed_side}</td>
                <td>{new Date(item.print_start_time).toLocaleDateString()}</td>
                <td>{item.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-history">
          <button className="pagination-button" onClick={handlePreviousPage} disabled={currentPage === 1}>
            ◀
          </button>
          <span className="pagination-info">
            {currentPage} / {totalPages}
          </span>
          <button className="pagination-button" onClick={handleNextPage} disabled={currentPage === totalPages}>
            ▶
          </button>
        </div>
      </div>
    </>
  );
}

export default History;
