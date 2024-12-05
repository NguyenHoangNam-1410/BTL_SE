import React, { useState } from "react";
import NavigationBar_Ad from "../../component/NavigationBar_Ad";
import { useLocation } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./DetailReport.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function DetailReport() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const month = queryParams.get("month");
  const year = queryParams.get("year");

  const [printers] = useState([
    { id: 1, name: "CANON", orders: 2, pages: 8 },
    { id: 2, name: "HP LaserJet", orders: 3, pages: 12 },
    { id: 3, name: "Epson EcoTank", orders: 1, pages: 5 },
    { id: 4, name: "Brother HL-L2321D", orders: 4, pages: 16 },
  ]);

  // Prepare data for the pie chart
  const pieChartData = {
    labels: printers.map((printer) => printer.name),
    datasets: [
      {
        data: printers.map((printer) => printer.orders),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  return (
    <>
      <NavigationBar_Ad />
      <div className="dreport-container">
        <h1>Detailed Statistics of {month} - {year}</h1>

        {/* Statistics Table */}
        <table className="dreport-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Printer</th>
              <th>Number of Orders</th>
              <th>Number of Pages</th>
            </tr>
          </thead>
          <tbody>
            {printers.map((printer) => (
              <tr key={printer.id}>
                <td>{printer.id}</td>
                <td>{printer.name}</td>
                <td>{printer.orders}</td>
                <td>{printer.pages}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pie Chart Section */}
        <div className="pie-chart-container">
          <h2>Orders Distribution</h2>
          <Pie data={pieChartData} />
        </div>
      </div>
    </>
  );
}

export default DetailReport;
