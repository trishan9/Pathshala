import { Dispatch, SetStateAction, useEffect, useState } from "react";
import TeacherForm from "./TeacherForm";
import StudentForm from "./StudentForm";
import { useDeleteTeacher } from "@/hooks/useTeachers";
import { FormContainerProps } from "./FormContainer";
import { useDeleteStudent } from "@/hooks/useStudents";
import { useDeleteSubject } from "@/hooks/useSubjects";
import SubjectForm from "./SubjectForm";
import { useDeleteClass } from "@/hooks/useClasses";
import ClassForm from "./ClassForm";
import AnnouncementForm from "./AnnouncementForm";
import EventForm from "./EventForm";
import { useDeleteEvent } from "@/hooks/useEvents";
import { useDeleteAnnouncement } from "@/hooks/useAnnouncements";
import ExamForm from "./ExamForm";
import AssignmentForm from "./AssignmentForm";
import { useDeleteExam } from "@/hooks/useExams";
import { useDeleteAssignment } from "@/hooks/useAssignments";
import { useDeleteResult } from "@/hooks/useResults";
import ResultForm from "./ResultForm";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

const forms: {
  [key: string]: (
    setOpen: Dispatch<SetStateAction<boolean>>,
    type: "create" | "update",
    data?: any,
    relatedData?: any,
  ) => JSX.Element;
} = {
  teacher: (setOpen, type, data, relatedData) => (
    <TeacherForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  student: (setOpen, type, data, relatedData) => (
    <StudentForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  subject: (setOpen, type, data, relatedData) => (
    <SubjectForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  class: (setOpen, type, data, relatedData) => (
    <ClassForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  announcement: (setOpen, type, data, relatedData) => (
    <AnnouncementForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  event: (setOpen, type, data, relatedData) => (
    <EventForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  exam: (setOpen, type, data, relatedData) => (
    <ExamForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  assignment: (setOpen, type, data, relatedData) => (
    <AssignmentForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  result: (setOpen, type, data, relatedData) => (
    <ResultForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
};

const FormModal = ({
  table,
  type,
  data,
  id,
  relatedData,
}: FormContainerProps & { relatedData?: any }) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "delete"
        ? "bg-lamaPurple"
        : "bg-lamaSky";

  const deleteTeacher = useDeleteTeacher();
  const deleteStudent = useDeleteStudent();
  const deleteSubject = useDeleteSubject();
  const deleteClass = useDeleteClass();
  const deleteEvent = useDeleteEvent();
  const deleteAnnouncement = useDeleteAnnouncement();
  const deleteExam = useDeleteExam();
  const deleteAssignment = useDeleteAssignment();
  const deleteResult = useDeleteResult();

  const deleteActionMap = {
    teacher: deleteTeacher,
    student: deleteStudent,
    subject: deleteSubject,
    class: deleteClass,
    event: deleteEvent,
    announcement: deleteAnnouncement,
    exam: deleteExam,
    assignment: deleteAssignment,
    result: deleteResult,
  };

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.documentElement.style.overflowY = "hidden";
    } else {
      document.documentElement.style.overflowY = "auto";
    }

    return () => {
      document.documentElement.style.overflowY = "auto";
    };
  }, [open]);

  const Form = () => {
    return forms[table](setOpen, type, data, relatedData);
  };

  //@ts-expect-error "sdsd"
  const mutater = deleteActionMap[table];

  const handleDelete = (id: string | number) => {
    mutater.mutate(id);
  };

  return (
    <>
      {type === "create" && (
        <button
          className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
          onClick={() => setOpen(true)}
        >
          <img src={`/${type}.png`} alt="" width={16} height={16} />
        </button>
      )}

      {type === "update" && (
        <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
          <Pencil className="h-4 w-4" />
        </Button>
      )}

      {type === "delete" && id && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="icon" className="text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogTitle>Delete Confirmation</AlertDialogTitle>

            <AlertDialogDescription>
              All data will be lost. Are you sure you want to delete this{" "}
              {table}?
            </AlertDialogDescription>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>

              <Button variant="destructive" onClick={() => handleDelete(id)}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {open && (
        <div className="w-screen h-screen fixed left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />

            <button
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <img src="/close.png" alt="" width={14} height={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
