// pages/Reports.jsx
import { useRef } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Button from "../components/ui/Button";

const mockData = [
  { name: "John Doe", email: "john@example.com", amount: "$200" },
  { name: "Jane Smith", email: "jane@example.com", amount: "$150" },
];

export default function Reports() {
  const tableRef = useRef();

  const exportToPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Name", "Email", "Amount"]],
      body: mockData.map((row) => [row.name, row.email, row.amount]),
    });
    doc.save("report.pdf");
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(mockData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reports");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(data, "report.xlsx");
  };

  return (
    <div className="p-4">
      <div className="flex justify-end gap-3 mb-4">
        <Button onClick={exportToPDF}>Export to PDF</Button>
        <Button onClick={exportToExcel}>Export to Excel</Button>
      </div>

      <table
        ref={tableRef}
        className="min-w-full bg-white border border-gray-300 rounded"
      >
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Amount</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((row, idx) => (
            <tr key={idx}>
              <td className="p-2 border">{row.name}</td>
              <td className="p-2 border">{row.email}</td>
              <td className="p-2 border">{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
