// import React from "react";
// import NavigationBar_Ad from "../../component/NavigationBar_Ad";
// import "./Report.css";

// function Report() {
//   const reports = [
//     { month: "11", year: "2024", detail: "SPSS Report 11 - 2024" },
//     { month: "10", year: "2024", detail: "SPSS Report 10 - 2024" },
//     { month: "9", year: "2024", detail: "SPSS Report 9 - 2024" },
//     { month: "8", year: "2024", detail: "SPSS Report 8 - 2024" },
//     { month: "7", year: "2024", detail: "SPSS Report 7 - 2024" },
//     { month: "6", year: "2024", detail: "SPSS Report 6 - 2024" },
//     { month: "5", year: "2024", detail: "SPSS Report 5 - 2024" },
//     { month: "4", year: "2024", detail: "SPSS Report 4 - 2024" },
//   ];

//   return (
//     <>
//       <NavigationBar_Ad />
//       <div className="container">
//         <h1>System Report</h1>
//         <table>
//           <thead>
//             <tr>
//               <th>Month</th>
//               <th>Year</th>
//               <th>Detail</th>
//             </tr>
//           </thead>
//           <tbody>
//             {reports.map((report, index) => (
//               <tr key={index}>
//                 <td>{report.month}</td>
//                 <td>{report.year}</td>
//                 <td>
//                   <a href="#">{report.detail}</a>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }

// export default Report;
import React from "react";
import { Link } from "react-router-dom";
import NavigationBar_Ad from "../../component/NavigationBar_Ad";
import "./Report.css";

function Report() {
  const reports = [
    { month: "11", year: "2024", detail: "SPSS Report 11 - 2024" },
    { month: "10", year: "2024", detail: "SPSS Report 10 - 2024" },
    { month: "9", year: "2024", detail: "SPSS Report 9 - 2024" },
    { month: "8", year: "2024", detail: "SPSS Report 8 - 2024" },
    { month: "7", year: "2024", detail: "SPSS Report 7 - 2024" },
    { month: "6", year: "2024", detail: "SPSS Report 6 - 2024" },
    { month: "5", year: "2024", detail: "SPSS Report 5 - 2024" },
    { month: "4", year: "2024", detail: "SPSS Report 4 - 2024" },
  ];

  return (
    <>
      <NavigationBar_Ad />
      <div className="container">
        <h1>System Report</h1>
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Year</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index}>
                <td>{report.month}</td>
                <td>{report.year}</td>
                <td>
                  <Link
                    to={`/detail-report?month=${report.month}&year=${report.year}`}
                    className="report-link"
                  >
                    {report.detail}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Report;
