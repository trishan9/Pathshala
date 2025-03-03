import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, X, Search, Loader2 } from "lucide-react";
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
import { Input } from "@/components/ui/input";
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

interface AttendanceStats {
  total: number;
  present: number;
  absent: number;
}

export default function AttendancePage() {
  const [selectedLesson, setSelectedLesson] = useState<string>("");
  const [students, setStudents] = useState<Student[]>();
  const [filteredStudents, setFilteredStudents] = useState<Student[]>();
  const [lessons, setLessons] = useState<Lesson[]>();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stats, setStats] = useState<AttendanceStats>({
    total: 0,
    present: 0,
    absent: 0,
  });
  const teacherId = useAuthStore((state) => state.user)?.id;

  // Calculate attendance statistics
  useEffect(() => {
    if (students) {
      const total = students.length;
      const present = students.filter((s) => s.present).length;
      setStats({
        total,
        present,
        absent: total - present,
      });
    }
  }, [students]);

  // Filter students based on search query
  useEffect(() => {
    if (students) {
      const filtered = students.filter((student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredStudents(filtered);
    }
  }, [students, searchQuery]);

  // Fetch lessons when component mounts
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setIsLoading(true);
        const response = await apiActions.attendance.getLessons(
          teacherId || "",
        );
        if (response.data?.data) {
          setLessons(response.data.data);
        } else {
          toast.error("No lessons found");
        }
      } catch (err) {
        toast.error("Failed to fetch lessons");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (teacherId) {
      fetchLessons();
    }
  }, [teacherId]);

  // Fetch students when class is selected
  useEffect(() => {
    if (!selectedLesson) return;

    const fetchStudents = async () => {
      try {
        setIsLoading(true);
        const response =
          await apiActions.attendance.getClassStudents(selectedLesson);
        if (response.data?.data) {
          // Initialize all students as absent by default
          const studentsWithAttendance = response.data.data.map((student) => ({
            ...student,
            present: false,
          }));
          setStudents(studentsWithAttendance);
          setFilteredStudents(studentsWithAttendance);
        } else {
          toast.error("No students found in this class");
        }
      } catch (err) {
        toast.error("Failed to fetch students");
        console.error(err);
      } finally {
        setIsLoading(false);
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
    if (!selectedLesson || !students) {
      toast.error("Please select a lesson and ensure students are loaded");
      return;
    }

    if (students.length === 0) {
      toast.error("No students to mark attendance for");
      return;
    }

    try {
      setIsSubmitting(true);
      const attendanceRecords = students.map((student) => ({
        studentId: student.id,
        present: student.present || false,
      }));

      const response = await apiActions.attendance.recordAttendance(
        selectedLesson,
        { attendanceRecords },
      );

      if (response.data?.message) {
        toast.success(response.data.message);
        setIsConfirmDialogOpen(false);

        // Reset the form after successful submission
        setSelectedLesson("");
        setStudents(undefined);
        setFilteredStudents(undefined);
        setSearchQuery("");
      } else {
        toast.error("Failed to record attendance");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to record attendance");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = selectedLesson && students && students.length > 0;

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 border">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-lg font-semibold text-gray-900">
            Mark Today's Attendance
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Select
              onValueChange={setSelectedLesson}
              value={selectedLesson}
              disabled={isLoading || isSubmitting}
            >
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select Lesson" />
              </SelectTrigger>
              <SelectContent>
                {lessons?.map((lesson) => (
                  <SelectItem key={lesson.id} value={lesson.id}>
                    {lesson.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedLesson && (
          <>
            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-green-600 text-sm font-medium">
                  Present
                </div>
                <div className="text-2xl font-bold text-green-700">
                  {stats.present}
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-red-600 text-sm font-medium">Absent</div>
                <div className="text-2xl font-bold text-red-700">
                  {stats.absent}
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-blue-600 text-sm font-medium">Total</div>
                <div className="text-2xl font-bold text-blue-700">
                  {stats.total}
                </div>
              </div>
            </div>

            {/* Search and Bulk Actions */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={isLoading || isSubmitting}
                />
              </div>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => handleMarkAll(true)}
                  className="w-full sm:w-auto"
                  disabled={isLoading || isSubmitting || !students?.length}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Mark All Present
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleMarkAll(false)}
                  className="w-full sm:w-auto"
                  disabled={isLoading || isSubmitting || !students?.length}
                >
                  <X className="w-4 h-4 mr-2" />
                  Mark All Absent
                </Button>
              </div>
            </div>

            {/* Students List */}
            <div className="mt-8">
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredStudents && filteredStudents.length > 0 ? (
                <div className="flow-root">
                  <ul className="-my-5 divide-y divide-gray-200">
                    {filteredStudents.map((student) => (
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
                            disabled={isSubmitting}
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
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {searchQuery
                    ? "No students found matching your search"
                    : "No students available"}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
              <Button
                onClick={() => setIsConfirmDialogOpen(true)}
                className="w-full sm:w-auto"
                disabled={!canSubmit || isSubmitting || isLoading}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Attendance"
                )}
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Attendance Submission</DialogTitle>
            <DialogDescription>
              You are about to submit today's attendance.
              <div className="mt-2">
                <strong>Summary:</strong>
                <ul className="mt-1 space-y-1">
                  <li>Present: {stats.present} students</li>
                  <li>Absent: {stats.absent} students</li>
                  <li>Total: {stats.total} students</li>
                </ul>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsConfirmDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={cn(
                "min-w-[100px]",
                isSubmitting && "cursor-not-allowed",
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Confirm"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
