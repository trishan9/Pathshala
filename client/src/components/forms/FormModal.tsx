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

  const deleteActionMap = {
    teacher: deleteTeacher,
    student: deleteStudent,
    subject: deleteSubject,
    class: deleteClass,
    event: deleteEvent,
    announcement: deleteAnnouncement,
    exam: deleteExam,
    assignment: deleteAssignment
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
    //@ts-ignore
    const mutater = deleteActionMap[table];

    const handleDelete = (id: string | number) => {
      mutater.mutate(id);
    };

    return type === "delete" && id ? (
      <div className="p-4 flex flex-col gap-4">
        <span className="text-center font-medium">
          All data will be lost. Are you sure you want to delete this {table}?
        </span>
        <button
          className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center"
          onClick={() => handleDelete(id)}
        >
          Delete
        </button>
      </div>
    ) : type === "create" || type === "update" || type === "view" ? (
      //@ts-ignore
      forms[table](setOpen, type, data, relatedData)
    ) : (
      "Form not found!"
    );
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <img src={`/${type}.png`} alt="" width={16} height={16} />
      </button>

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
