
import NavigationBar from "../../component/NavigationBar";
import { useLocation } from 'react-router-dom';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer'; // Thêm thư viện này
import "./PrintConfig.css";

function PrintConfig() {
  const location = useLocation();
  const { fileName } = location.state || {}; // Lấy đường dẫn file từ state

  if (!fileName) {
    return <div>No file selected for preview</div>; // Thông báo nếu không có file
  }

  const documents = [
    { uri: `/path/to/your/files/${fileName}`, fileType: fileName.split('.').pop() } // Dùng fileName từ PrintPage
  ];

  return (
    <>
      <NavigationBar />
      <div className="print-config-container">
        <div className="left-panel">
          <h3>Print Setup</h3>
          <div className="option">
            <label>Base:</label>
            <select>
              <option>Lý Thường Kiệt</option>
              <option>Dĩ An</option>
            </select>
          </div>
          <div className="option">
            <label>Printer:</label>
            <select>
              <option>Printer 1</option>
              <option>Printer 2</option>
              <option>Printer 3</option>
              <option>Printer 4</option>
              <option>Printer 5</option>
            </select>
          </div>
          <div className="option">
            <label>Room:</label>
            <select>
              <option>B4-505</option>
              <option>A4-303</option>
              <option>B3-101</option>
              <option>A2-202</option>
              <option>C1-101</option>
            </select>
          </div>
          <div className="option">
            <label>Page Range:</label>
            <select>
              <option>All Pages</option>
              <option>Even Pages</option>
              <option>Odd Pages</option>
              <option>Custom Pages</option>
            </select>
          </div>
          <div className="option">
            <label>Paper Size:</label>
            <select>
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
