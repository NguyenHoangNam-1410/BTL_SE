import { useState } from "react";
import NavigationBar from "../../component/NavigationBar";
import { useLocation, useNavigate } from "react-router-dom";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PrintConfig.css";

function PrintConfig() {
  const location = useLocation();
  const navigate = useNavigate();
  const { fileName } = location.state || {};

  // Hooks phải được gọi trước khi điều kiện hoặc logic khác
  const [copies, setCopies] = useState(1);
  const [paperSize, setPaperSize] = useState("A4");
  const [campus, setCampus] = useState("Lý Thường Kiệt"); // Campus state
  const [printer, setPrinter] = useState("1"); // Default printer is 1
  const [room, setRoom] = useState("B4-505"); // Default room for printer 1
  const [roomOptions, setRoomOptions] = useState([
    "B4-505", "A4-303", "B3-101", "A2-202", "C1-101"
  ]); // Room options state

  // Room configuration based on campus and printer selection
  const printersLTHK = [
    { id: 1, room: "B4-505" },
    { id: 2, room: "A4-303" },
    { id: 3, room: "B3-101" },
    { id: 4, room: "A2-202" },
    { id: 5, room: "C1-101" }
  ];
  
  const printersDAn = [
    { id: 6, room: "H1-402" },
    { id: 7, room: "H4-503" },
    { id: 8, room: "H6-102" },
    { id: 9, room: "H6-405" },
    { id: 10, room: "H1-207" }
  ];

  const currentPages = 100; // Giả sử hiện tại có 100 trang
  const totalPages = paperSize === "A3" ? copies * 2 : copies;
  const remainingPages = currentPages - totalPages;

  if (!fileName) {
    return <div>No file selected for preview</div>;
  }

  const documents = [
    { uri: `/path/to/your/files/${fileName}`, fileType: fileName.split(".").pop() }
  ];

  const handleCancel = () => {
    navigate("/Print");
  };

  const handlePrint = () => {
    // Kiểm tra điều kiện và log giá trị remainingPages
    console.log("Remaining Pages: ", remainingPages);
  
    if (remainingPages < 0) {
      toast.error("Your account doesn't have enough pages!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const locationToGetFile = `${campus} ${room}`;
      // Truyền các giá trị vào navigate
      navigate("/Print/PrintConfirm", {
        state: {
          fileName,
          copies,
          paperSize,
          totalPages,      // Truyền totalPages vào state
          remainingPages,  // Truyền remainingPages vào state
          locationToGetFile // Thêm trường locationToGetFile nếu cần
        }
      });
    }
  };

  // Cập nhật phòng và máy in khi chọn campus
  const handleCampusChange = (e) => {
    const selectedCampus = e.target.value;
    setCampus(selectedCampus);

    if (selectedCampus === "Dĩ An") {
      setRoomOptions([
        "H1-402", "H4-503", "H6-102", "H6-405", "H1-207"
      ]);
      setPrinter("6"); // Reset printer to 6 when campus changes to Dĩ An
      setRoom("H1-402"); // Reset room to the default one for printer 6
    } else {
      setRoomOptions([
        "B4-505", "A4-303", "B3-101", "A2-202", "C1-101"
      ]);
      setPrinter("1"); // Reset printer to 1 when campus changes to Lý Thường Kiệt
      setRoom("B4-505"); // Reset room to the default one for printer 1
    }
  };

  // Cập nhật thông tin phòng khi chọn máy in
  const handlePrinterChange = (e) => {
    const selectedPrinter = e.target.value;
    setPrinter(selectedPrinter);
    const printerId = parseInt(selectedPrinter, 10);

    let selectedRoom = "";
    if (campus === "Lý Thường Kiệt") {
      const selectedPrinterInfo = printersLTHK.find(p => p.id === printerId);
      selectedRoom = selectedPrinterInfo ? selectedPrinterInfo.room : "";
    } else {
      const selectedPrinterInfo = printersDAn.find(p => p.id === printerId);
      selectedRoom = selectedPrinterInfo ? selectedPrinterInfo.room : "";
    }

    setRoom(selectedRoom);
  };

  return (
    <>
      <NavigationBar />
      <ToastContainer />
      <div className="print-config-container">
        <div className="left-panel">
          <h3>Print Setup</h3>
          <div className="option">
            <label>Campus:</label>
            <select value={campus} onChange={handleCampusChange}>
              <option>Lý Thường Kiệt</option>
              <option>Dĩ An</option>
            </select>
          </div>
          <div className="option">
            <label>Printer:</label>
            <select value={printer} onChange={handlePrinterChange}>
              {campus === "Lý Thường Kiệt" ? (
                printersLTHK.map((printerInfo) => (
                  <option key={printerInfo.id} value={printerInfo.id}>
                    Printer {printerInfo.id}
                  </option>
                ))
              ) : (
                printersDAn.map((printerInfo) => (
                  <option key={printerInfo.id} value={printerInfo.id}>
                    Printer {printerInfo.id}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="option">
            <label>Room:</label>
            {/* Use CSS for better visual clarity */}
            <select className="room-select" value={room} readOnly>
              <option>{room}</option>
            </select>
          </div>
          <div className="option">
            <label>Page Range:</label>
            <select>
              <option>All Pages</option>
              <option>Even Pages</option>
              <option>Odd Pages</option>
            </select>
          </div>
          <div className="option">
            <label>Paper Size:</label>
            <select value={paperSize} onChange={(e) => setPaperSize(e.target.value)}>
              <option>A4</option>
              <option>A3</option>
            </select>
          </div>
          <div className="option">
            <label>Print Side:</label>
            <select>
              <option>Single-sided</option>
              <option>Double-sided</option>
            </select>
          </div>
          <div className="option">
            <label>Orientation:</label>
            <select>
              <option>Portrait</option>
              <option>Landscape</option>
            </select>
          </div>
          <div className="option">
            <label>Copies:</label>
            <input className="copies"
              type="number"
              min="1"
              value={copies}
              onChange={(e) => setCopies(Number(e.target.value))}
            />
          </div>
          <div className="status">
            <div className="current">Current A4 Pages: <span className="currentpage">{currentPages}</span></div>
            <div style={{ color: remainingPages < 0 ? "red" : "black" }}>
              Remaining Pages: <span className="remainpage">{remainingPages}</span>
            </div>
          </div>
          <div className="buttons">
            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
            <button className="print-btn" onClick={handlePrint}>Print</button>
          </div>
        </div>
        <div className="right-panel">
          <h3>Preview</h3>
          <DocViewer
            documents={documents}
            pluginRenderers={DocViewerRenderers}
          />
        </div>
      </div>
    </>
  );
}

export default PrintConfig;
