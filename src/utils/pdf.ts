import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Student, Major } from "../types";

export const exportStudentsToPDF = (students: Student[], majors: Major[], title: string) => {
  const doc = new jsPDF();
  
  doc.setFontSize(18);
  doc.text(title, 14, 22);
  doc.setFontSize(11);
  doc.setTextColor(100);
  
  const tableData = students.map((s, index) => {
    const major = majors.find(m => m.id === s.majorId);
    const totalPaid = Object.values(s.payments).reduce((a, b) => a + b, 0);
    return [
      index + 1,
      s.id,
      s.name,
      major?.abbreviation || "",
      `Niveau ${s.level}`,
      totalPaid.toLocaleString() + " FCFA"
    ];
  });

  autoTable(doc, {
    startY: 30,
    head: [["#", "Matricule", "Nom", "Filière", "Niveau", "Total Payé"]],
    body: tableData,
  });

  doc.save(`${title.replace(/\s+/g, "_")}.pdf`);
};

export const exportRoomPlanToPDF = (roomName: string, seatingPlan: (Student | null)[][][], title: string) => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text(`${title} - ${roomName}`, 14, 20);

  let currentY = 30;

  seatingPlan.forEach((row, rowIndex) => {
    if (currentY > 250) {
      doc.addPage();
      currentY = 20;
    }
    
    doc.setFontSize(12);
    doc.text(`Rangée ${rowIndex + 1}`, 14, currentY);
    currentY += 5;

    const rowData = row.map((bench, benchIndex) => {
      const s1 = bench[0] ? `${bench[0].name} (${bench[0].id})` : "VIDE";
      const s2 = bench[1] ? `${bench[1].name} (${bench[1].id})` : "VIDE";
      return [`Banc ${benchIndex + 1}`, s1, s2];
    });

    autoTable(doc, {
      startY: currentY,
      head: [["Banc", "Étudiant 1", "Étudiant 2"]],
      body: rowData,
      theme: 'grid',
      margin: { left: 14 },
    });
    
    const finalY = (doc as any).lastAutoTable?.finalY;
    currentY = (finalY || currentY) + 10;
  });

  doc.save(`Plan_Salle_${roomName.replace(/\s+/g, "_")}.pdf`);
};