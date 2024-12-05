import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../component/NavigationBar";
import './Dashboard.css';

function Dashboard() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const userId = 2; 

    useEffect(() => {
        // Simulating API call with sample data
        const fetchUserData = async () => {
            try {
                const sampleData = {
                    user_name: "Nguyen Van A",
                    student_id: "2252000",
                    semester_name: "20241",
                    default_page_allocated: 100,
                    page_balance: 65,
                };

                // Simulating a slight delay
                await new Promise((resolve) => setTimeout(resolve, 500));
                setUserData(sampleData);
            } catch (err) {
                console.error("Failed to fetch user data:", err);
                setError("Failed to load user data");
            }
        };

        fetchUserData();
    }, [userId, navigate]);
    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const response = await fetch(`/api/users/${userId}`);
    //             if (!response.ok) {
    //                 throw new Error(`Error: ${response.statusText}`);
    //             }
    //             const data = await response.json();
    //             setUserData(data);
    //         } catch (err) {
    //             console.error("Failed to fetch user data:", err);
    //             setError(err.message);
    //         }
    //     };

    //     fetchUserData();
    // }, [userId, navigate]);

    const handlePagePurchase = () => {
        navigate("/page-purchase");
    };

    const handleTransactionHistory = () => {
        navigate("/transaction-history");
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <NavigationBar />
            <div className="dashboard">
                <h1 className="dashboard-title">Student Dashboard</h1>
                
                <section className="student-info">
                    <h2>👤 Student Information</h2>
                    <p><strong>Full Name:</strong> {userData.user_name}</p>
                    <p><strong>ID:</strong> {userData.student_id}</p>
                    <p><strong>Current Semester:</strong> {userData.semester_name || "N/A"}</p>
                    <p><strong>Default Page Allocated:</strong> {userData.default_page_allocated || 0}</p>
                </section>

                <section className="balance-info">
                    <h2>📂 Balance Information</h2>
                    <div className="balance-display">
                        <span className="balance-amount">{userData.page_balance}</span>
                        <span className="balance-label">Current Balance</span>
                    </div>
                    <button className="page-purchase-button" onClick={handlePagePurchase}>Page Purchase</button>
                    <button className="transaction-link" onClick={handleTransactionHistory}>
                        View Transaction History
                    </button>
                </section>
            </div>
        </>
    );
}

export default Dashboard;
