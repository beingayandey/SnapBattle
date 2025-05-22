import React from "react";
import Papa from "papaparse";
import { jsPDF } from "jspdf";
import "./ExportUserData.css";

const ExportUserData = ({ users }) => {
  const exportToCSV = () => {
    const csv = Papa.unparse(users, {
      header: true,
      columns: ["id", "name", "email", "role", "status"],
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "users.csv";
    link.click();
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Users List", 10, 10);
    let y = 20;
    users.forEach((user) => {
      doc.text(
        `ID: ${user.id}, Name: ${user.name}, Email: ${user.email}, Role: ${user.role}, Status: ${user.status}`,
        10,
        y
      );
      y += 10;
    });
    doc.save("users.pdf");
  };

  return (
    <div className="export-user-data">
      <button onClick={exportToCSV}>Export CSV</button>
      <button onClick={exportToPDF}>Export PDF</button>
    </div>
  );
};

export default ExportUserData;
