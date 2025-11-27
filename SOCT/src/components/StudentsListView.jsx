import { Card } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { useState } from "react";
import { Search } from "lucide-react";
import { students } from "../data/students";

export function StudentsListView() {
  const [searchTerm, setSearchTerm] = useState("");

  // Generate mock student performance data
  const studentsWithGrades = students.slice(0, 50).map((student, index) => ({
    ...student,
    cgpa: (3.0 + Math.random() * 1.0).toFixed(2),
    attendance: Math.floor(70 + Math.random() * 30),
    status: index % 3 === 0 ? "Excellent" : index % 3 === 1 ? "Good" : "Average"
  }));

  const filteredStudents = studentsWithGrades.filter(
    student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.includes(searchTerm)
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Excellent": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Good": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Average": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2>Student List</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name or ID..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-md border border-border overflow-auto max-h-[600px]">
          <Table>
            <TableHeader className="sticky top-0 bg-card">
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>CGPA</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{student.email}</TableCell>
                  <TableCell>{student.cgpa}</TableCell>
                  <TableCell>{student.attendance}%</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(student.status)}>
                      {student.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          Showing {filteredStudents.length} of {studentsWithGrades.length} students
        </div>
      </Card>
    </div>
  );
}
