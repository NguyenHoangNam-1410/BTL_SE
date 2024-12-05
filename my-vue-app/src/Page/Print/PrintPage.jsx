import "./PrintPage.css";
import NavigationBar from "../../component/NavigationBar";
import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";
import { FaCloudUploadAlt, FaPrint, FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function PrintPage() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [permittedFileTypes, setPermittedFileTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 4;
  const studentId = 1; // Static student ID, can be dynamic
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch permitted file types and uploaded files on mount
    fetchPermittedFileTypes();
    fetchUploadedFiles();
  }, []);

  const fetchPermittedFileTypes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/files/uploadpermit");
      const result = await response.json();
      if (result.success) {
        setPermittedFileTypes(result.data.map((type) => type.mime_type));
      } else {
        toast.error("Failed to fetch permitted file types.");
      }
    } catch (error) {
      console.error("Error fetching permitted file types:", error);
      toast.error("Error fetching permitted file types from the server.");
    }
  };

  const fetchUploadedFiles = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/files/${studentId}`);
      const result = await response.json();
      if (result.success) {
        setUploadedFiles(result.files); // Adjust based on API structure
      } else {
        toast.error("Failed to fetch uploaded files.");
      }
    } catch (error) {
      console.error("Error fetching uploaded files:", error);
      toast.error("Error fetching uploaded files from the server.");
    }
  };

  const uploadFileToServer = async (file) => {
    try {
      const response = await fetch("http://localhost:5000/api/files/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: studentId,
          file_type_id: determineFileTypeId(file),
          file_path: "D:/", // Update based on your requirements
          filename: file.name,
        }),
      });
      const result = await response.json();
      if (result.success) {
        toast.success("File uploaded successfully!");
        fetchUploadedFiles(); // Refresh file list
      } else {
        toast.error("File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file to the server.");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        if (permittedFileTypes.includes(file.type)) {
          uploadFileToServer(file); // Upload immediately if type is valid
        } else {
          toast.error(
            <>
              Invalid file type: <strong>{file.name}</strong>. Only allowed types: {permittedFileTypes.join(", ")}.
            </>
          );
        }
      });
    },
  });

  const handlePrint = (fileName) => {
    toast.success(`Preparing to print: ${fileName}`);
    navigate("/Print/PrintConfig", {
      state: { fileName },
    });
  };

  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = uploadedFiles.slice(indexOfFirstFile, indexOfLastFile);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(uploadedFiles.length / filesPerPage); i++) {
    pageNumbers.push(i);
  }

  const determineFileTypeId = (file) => {
    const fileType = permittedFileTypes.find((type) => type === file.type);
    return fileType ? permittedFileTypes.indexOf(fileType) + 1 : null;
  };

  return (
    <div>
      <NavigationBar />
      <ToastContainer />
      <div className="print_container">
        <div className="drag_container">
          <motion.div
            className="drag"
            {...getRootProps({ className: "dropzone" })}
            initial={{ opacity: 0.8, scale: 0.95 }}
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 8px rgba(0,0,0,0.3)" }}
            transition={{ duration: 0.3 }}
          >
            <input {...getInputProps()} />
            <FaCloudUploadAlt className="upload-icon" />
            <p>Drag and drop your files here</p>
            <p>-- Or --</p>
            <button>Browse</button>
          </motion.div>
        </div>

        <div className="file_list_container">
          <h3>List of Documents</h3>
          <ul className="file_list">
            {currentFiles.map((file, index) => (
              <motion.li
                key={index}
                className="file_item"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03, backgroundColor: "#f9f9f9" }}
                transition={{ duration: 0.3 }}
              >
                <span>
                  {file.filename}
                </span>
                <div className="file_actions">
                  <motion.button
                    className="print_button"
                    onClick={() => handlePrint(file.filename)}
                    whileHover={{ scale: 1.2, color: "#4caf50" }}
                  >
                    <FaPrint size={20} />
                  </motion.button>
                  <motion.button
                    className="remove_button"
                    whileHover={{ scale: 1.2, color: "#f44336" }}
                  >
                    <FaTrashAlt size={20} />
                  </motion.button>
                </div>
              </motion.li>
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
    </div>
  );
}

export default PrintPage;
