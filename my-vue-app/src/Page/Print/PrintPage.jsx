import "./PrintPage.css";
import NavigationBar from "../../component/NavigationBar";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { IoMdPrint } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function PrintPage() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 4;
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".pdf,.doc,.docx,.xlsx", // Các file hợp lệ
    onDrop: (acceptedFiles) => {
      setErrorMessage(""); // Xóa thông báo lỗi mỗi khi người dùng tải lại tệp mới
      setUploadedFiles((prevFiles) =>
        prevFiles.concat(
          acceptedFiles.map((file) => ({
            path: file.name,
            size: file.size,
          }))
        )
      );
    },
  });

  const removeFile = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handlePrint = (fileName) => {
    // Kiểm tra định dạng tệp khi nhấn nút Print
    const validExtensions = [".pdf", ".doc", ".docx", ".xlsx"];
    const fileExtension = fileName.slice(fileName.lastIndexOf("."));

    if (!validExtensions.includes(fileExtension)) {
      setErrorMessage([
        "Invalid file type!",
        "Please upload a .pdf, .doc, .docx, or .xlsx file.",
      ]);
    } else {
      setErrorMessage(""); // Xóa thông báo lỗi nếu file hợp lệ
      navigate("/Print/PrintConfig", {
        state: { fileName }, // Truyền fileName qua state
      });
    }
  };

  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = uploadedFiles.slice(indexOfFirstFile, indexOfLastFile);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(uploadedFiles.length / filesPerPage); i++) {
    pageNumbers.push(i);
  }

  const closeModal = () => {
    setErrorMessage(""); // Đóng modal khi bấm OK
  };

  return (
    <div>
      <NavigationBar />
      <div className={`print_container ${errorMessage ? "blurred" : ""}`}>
        <div className="drag_container">
          <div className="drag" {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <img
              src="https://img.icons8.com/ios/452/upload-to-cloud.png"
              alt="upload"
            />
            <p>Drag and drop your files here</p>
            <p>-- Or --</p>
            <button>Browse</button>
          </div>
        </div>

        <div className="file_list_container">
          <h3>List of Documents</h3>
          <ul className="file_list">
            {currentFiles.map((file, index) => (
              <li key={index} className="file_item">
                <span>
                  {file.path} - {(file.size / 1024).toFixed(2)} KB
                </span>
                <div className="file_actions">
                  <button
                    className="print_button"
                    onClick={() => handlePrint(file.path)}
                  >
                    <IoMdPrint size={20} />
                  </button>
                  <button
                    className="remove_button"
                    onClick={() => removeFile(index)}
                  >
                    ✖
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {"<<"}
            </button>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={currentPage === number ? "active" : ""}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === pageNumbers.length}
            >
              {">>"}
            </button>
          </div>
        </div>
      </div>

      {/* Modal thông báo lỗi */}
      {errorMessage && (
        <div className="modal-overlay">
          <div className="modal-content">
            {Array.isArray(errorMessage) ? (
              errorMessage.map((msg, index) => <p key={index}>{msg}</p>)
            ) : (
              <p>{errorMessage}</p>
            )}
            <button className="ok-button" onClick={closeModal}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PrintPage;
