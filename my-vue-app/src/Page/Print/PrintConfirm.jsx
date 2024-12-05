import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './PrintConfirm.css';
import NavigationBar from '../../component/NavigationBar';

function PrintConfirm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { fileName, copies, paperSize, totalPages, remainingPages, locationToGetFile } = location.state || {};
  const [showModal, setShowModal] = useState(false);

  if (!fileName) {
    return <div>No file selected for print confirmation</div>;
  }

  const handleCancel = () => {
    // Truyền lại state khi quay lại PrintConfig
    navigate("/Print/PrintConfig", {
      state: {
        fileName,
        copies,
        paperSize,
        totalPages,
        remainingPages,
        locationToGetFile
      }
    });
  };

  const handleConfirm = () => {
    setShowModal(true); // Hiển thị modal khi bấm Confirm
  };

  const handleCloseModal = () => {
    setShowModal(false); // Ẩn modal
    navigate("/Print"); // Chuyển qua trang Status
  };

  return (
    <>
      <NavigationBar />
      <div className={`print-confirm-container ${showModal ? 'blur-background' : ''}`}>
        <div className="print-confirm-box">
          <h3>Print Confirmation</h3>
          <hr />
          <div className="print-details">
            <p><strong>File Name:</strong> {fileName}</p>
            <p><strong>Number of Pages:</strong> {copies}</p>
            <p><strong>Type of Page:</strong> {paperSize}</p>
            <p><strong>Number of Pages after Conversion:</strong> {totalPages}</p>
            <p><strong>Remaining Pages:</strong> {remainingPages}</p>
            <p><strong>Location to Pick Up:</strong> {locationToGetFile}</p>
          </div>
          <div className="buttons">
            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
            <button className="confirm-btn" onClick={handleConfirm}>Confirm</button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Notification</h3>
            <hr />
            <p>Print order successful, please get the document at <strong>{locationToGetFile}</strong>.</p>
            <hr />
            <button className="ok-btn" onClick={handleCloseModal}>OK</button>
          </div>
        </div>
      )}
    </>
  );
}

export default PrintConfirm;
