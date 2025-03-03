import { createFileRoute } from "@tanstack/react-router";

import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { apiActions } from "@/api";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "react-toastify";

export const Route = createFileRoute(
  "/_protected/_dashboard/_teacher/list/attendance/mark",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <AttendancePage />;
}

interface Student {
  id: string;
  name: string;
  present?: boolean;
}

interface Class {
  id: number;
  name: string;
}

interface Lesson {
  id: string;
  name: string;
  class: Class;
}

export default function AttendancePage() {
  const [selectedLesson, setSelectedLesson] = useState<string>("");
  const [students, setStudents] = useState<Student[]>();
  const [lessons, setLessons] = useState<Lesson[]>();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const teacherId = useAuthStore((state) => state.user)?.id;

  // Fetch subjects when component mounts
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await apiActions.attendance.getLessons(
          teacherId || "",
        );
        console.log(response.data);
        setLessons(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchLessons();
  }, []);

  // Fetch students when class is selected
  useEffect(() => {
    if (!selectedLesson) return;

    const fetchStudents = async () => {
      try {
        const response =
          await apiActions.attendance.getClassStudents(selectedLesson);
        setStudents(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStudents();
  }, [selectedLesson]);

  const handleAttendanceToggle = (studentId: string) => {
    setStudents((prev) =>
      prev?.map((student) =>
        student.id === studentId
          ? { ...student, present: !student.present }
          : student,
      ),
    );
  };

  const handleMarkAll = (present: boolean) => {
    setStudents((prev) => prev?.map((student) => ({ ...student, present })));
  };

  const handleSubmit = async () => {
    if (!selectedLesson || !students) return;

    try {
      const response = await apiActions.attendance.recordAttendance(
        selectedLesson,
        {
          attendanceRecords: students.map((student) => ({
            studentId: student.id,
            present: student.present || false,
          })),
        },
      );
      toast.success(response.data.message);
      setIsConfirmDialogOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 border">
      <div>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-lg font-semibold text-gray-900">
              Mark Attendance
            </h1>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Select onValueChange={setSelectedLesson} value={selectedLesson}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Select Lesson" />
                </SelectTrigger>
                <SelectContent>
                  {lessons?.map((lesson) => (
                    <SelectItem key={lesson.id} value={lesson.id.toString()}>
                      {lesson.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bulk Actions */}
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => handleMarkAll(true)}
              className="w-full sm:w-auto"
            >
              <Check className="w-4 h-4 mr-2" />
              Mark All Present
            </Button>
            <Button
              variant="outline"
              onClick={() => handleMarkAll(false)}
              className="w-full sm:w-auto"
            >
              <X className="w-4 h-4 mr-2" />
              Mark All Absent
            </Button>
          </div>

          {/* Students List */}
          <div className="mt-8">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {students?.map((student) => (
                  <li
                    key={student.id}
                    className="py-4 transition-all hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            {student.name}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant={student.present ? "default" : "outline"}
                        onClick={() => handleAttendanceToggle(student.id)}
                        className={cn(
                          "transition-all",
                          student.present
                            ? "bg-green-500 hover:bg-green-600"
                            : "hover:bg-red-50",
                        )}
                      >
                        {student.present ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <X className="w-4 h-4" />
                        )}
                        <span className="ml-2">
                          {student.present ? "Present" : "Absent"}
                        </span>
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end">
            <Button
              onClick={() => setIsConfirmDialogOpen(true)}
              className="w-full sm:w-auto"
              disabled={!selectedLesson}
            >
              Submit Attendance
            </Button>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Attendance Submission</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit the attendance? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsConfirmDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
