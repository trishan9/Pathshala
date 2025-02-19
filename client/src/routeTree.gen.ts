/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as RegisterImport } from './routes/register'
import { Route as LoginImport } from './routes/login'
import { Route as ProtectedImport } from './routes/_protected'
import { Route as ProtectedIndexImport } from './routes/_protected/index'
import { Route as ProtectedDashboardImport } from './routes/_protected/_dashboard'
import { Route as ProtectedDashboardTeacherImport } from './routes/_protected/_dashboard/_teacher'
import { Route as ProtectedDashboardStudentImport } from './routes/_protected/_dashboard/_student'
import { Route as ProtectedDashboardStaffImport } from './routes/_protected/_dashboard/_staff'
import { Route as ProtectedDashboardAdminImport } from './routes/_protected/_dashboard/_admin'
import { Route as ProtectedDashboardListResultsIndexImport } from './routes/_protected/_dashboard/list/results/index'
import { Route as ProtectedDashboardListExamsIndexImport } from './routes/_protected/_dashboard/list/exams/index'
import { Route as ProtectedDashboardListEventsIndexImport } from './routes/_protected/_dashboard/list/events/index'
import { Route as ProtectedDashboardListAssignmentsIndexImport } from './routes/_protected/_dashboard/list/assignments/index'
import { Route as ProtectedDashboardListAnnouncementsIndexImport } from './routes/_protected/_dashboard/list/announcements/index'
import { Route as ProtectedDashboardTeacherTeacherIndexImport } from './routes/_protected/_dashboard/_teacher/teacher/index'
import { Route as ProtectedDashboardStudentStudentIndexImport } from './routes/_protected/_dashboard/_student/student/index'
import { Route as ProtectedDashboardAdminAdminIndexImport } from './routes/_protected/_dashboard/_admin/admin/index'
import { Route as ProtectedDashboardTeacherListAttendanceIndexImport } from './routes/_protected/_dashboard/_teacher/list/attendance/index'
import { Route as ProtectedDashboardStaffListTeachersIndexImport } from './routes/_protected/_dashboard/_staff/list/teachers/index'
import { Route as ProtectedDashboardStaffListStudentsIndexImport } from './routes/_protected/_dashboard/_staff/list/students/index'
import { Route as ProtectedDashboardStaffListLessonsIndexImport } from './routes/_protected/_dashboard/_staff/list/lessons/index'
import { Route as ProtectedDashboardStaffListClassesIndexImport } from './routes/_protected/_dashboard/_staff/list/classes/index'
import { Route as ProtectedDashboardAdminListSubjectsIndexImport } from './routes/_protected/_dashboard/_admin/list/subjects/index'
import { Route as ProtectedDashboardStaffListTeachersIdImport } from './routes/_protected/_dashboard/_staff/list/teachers/$id'
import { Route as ProtectedDashboardStaffListStudentsIdImport } from './routes/_protected/_dashboard/_staff/list/students/$id'

// Create Virtual Routes

const ProtectedDashboardAnnouncementsLazyImport = createFileRoute(
  '/_protected/_dashboard/announcements',
)()

// Create/Update Routes

const RegisterRoute = RegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const ProtectedRoute = ProtectedImport.update({
  id: '/_protected',
  getParentRoute: () => rootRoute,
} as any)

const ProtectedIndexRoute = ProtectedIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => ProtectedRoute,
} as any)

const ProtectedDashboardRoute = ProtectedDashboardImport.update({
  id: '/_dashboard',
  getParentRoute: () => ProtectedRoute,
} as any)

const ProtectedDashboardAnnouncementsLazyRoute =
  ProtectedDashboardAnnouncementsLazyImport.update({
    id: '/announcements',
    path: '/announcements',
    getParentRoute: () => ProtectedDashboardRoute,
  } as any).lazy(() =>
    import('./routes/_protected/_dashboard/announcements.lazy').then(
      (d) => d.Route,
    ),
  )

const ProtectedDashboardTeacherRoute = ProtectedDashboardTeacherImport.update({
  id: '/_teacher',
  getParentRoute: () => ProtectedDashboardRoute,
} as any)

const ProtectedDashboardStudentRoute = ProtectedDashboardStudentImport.update({
  id: '/_student',
  getParentRoute: () => ProtectedDashboardRoute,
} as any)

const ProtectedDashboardStaffRoute = ProtectedDashboardStaffImport.update({
  id: '/_staff',
  getParentRoute: () => ProtectedDashboardRoute,
} as any)

const ProtectedDashboardAdminRoute = ProtectedDashboardAdminImport.update({
  id: '/_admin',
  getParentRoute: () => ProtectedDashboardRoute,
} as any)

const ProtectedDashboardListResultsIndexRoute =
  ProtectedDashboardListResultsIndexImport.update({
    id: '/list/results/',
    path: '/list/results/',
    getParentRoute: () => ProtectedDashboardRoute,
  } as any)

const ProtectedDashboardListExamsIndexRoute =
  ProtectedDashboardListExamsIndexImport.update({
    id: '/list/exams/',
    path: '/list/exams/',
    getParentRoute: () => ProtectedDashboardRoute,
  } as any)

const ProtectedDashboardListEventsIndexRoute =
  ProtectedDashboardListEventsIndexImport.update({
    id: '/list/events/',
    path: '/list/events/',
    getParentRoute: () => ProtectedDashboardRoute,
  } as any)

const ProtectedDashboardListAssignmentsIndexRoute =
  ProtectedDashboardListAssignmentsIndexImport.update({
    id: '/list/assignments/',
    path: '/list/assignments/',
    getParentRoute: () => ProtectedDashboardRoute,
  } as any)

const ProtectedDashboardListAnnouncementsIndexRoute =
  ProtectedDashboardListAnnouncementsIndexImport.update({
    id: '/list/announcements/',
    path: '/list/announcements/',
    getParentRoute: () => ProtectedDashboardRoute,
  } as any)

const ProtectedDashboardTeacherTeacherIndexRoute =
  ProtectedDashboardTeacherTeacherIndexImport.update({
    id: '/teacher/',
    path: '/teacher/',
    getParentRoute: () => ProtectedDashboardTeacherRoute,
  } as any)

const ProtectedDashboardStudentStudentIndexRoute =
  ProtectedDashboardStudentStudentIndexImport.update({
    id: '/student/',
    path: '/student/',
    getParentRoute: () => ProtectedDashboardStudentRoute,
  } as any)

const ProtectedDashboardAdminAdminIndexRoute =
  ProtectedDashboardAdminAdminIndexImport.update({
    id: '/admin/',
    path: '/admin/',
    getParentRoute: () => ProtectedDashboardAdminRoute,
  } as any)

const ProtectedDashboardTeacherListAttendanceIndexRoute =
  ProtectedDashboardTeacherListAttendanceIndexImport.update({
    id: '/list/attendance/',
    path: '/list/attendance/',
    getParentRoute: () => ProtectedDashboardTeacherRoute,
  } as any)

const ProtectedDashboardStaffListTeachersIndexRoute =
  ProtectedDashboardStaffListTeachersIndexImport.update({
    id: '/list/teachers/',
    path: '/list/teachers/',
    getParentRoute: () => ProtectedDashboardStaffRoute,
  } as any)

const ProtectedDashboardStaffListStudentsIndexRoute =
  ProtectedDashboardStaffListStudentsIndexImport.update({
    id: '/list/students/',
    path: '/list/students/',
    getParentRoute: () => ProtectedDashboardStaffRoute,
  } as any)

const ProtectedDashboardStaffListLessonsIndexRoute =
  ProtectedDashboardStaffListLessonsIndexImport.update({
    id: '/list/lessons/',
    path: '/list/lessons/',
    getParentRoute: () => ProtectedDashboardStaffRoute,
  } as any)

const ProtectedDashboardStaffListClassesIndexRoute =
  ProtectedDashboardStaffListClassesIndexImport.update({
    id: '/list/classes/',
    path: '/list/classes/',
    getParentRoute: () => ProtectedDashboardStaffRoute,
  } as any)

const ProtectedDashboardAdminListSubjectsIndexRoute =
  ProtectedDashboardAdminListSubjectsIndexImport.update({
    id: '/list/subjects/',
    path: '/list/subjects/',
    getParentRoute: () => ProtectedDashboardAdminRoute,
  } as any)

const ProtectedDashboardStaffListTeachersIdRoute =
  ProtectedDashboardStaffListTeachersIdImport.update({
    id: '/list/teachers/$id',
    path: '/list/teachers/$id',
    getParentRoute: () => ProtectedDashboardStaffRoute,
  } as any)

const ProtectedDashboardStaffListStudentsIdRoute =
  ProtectedDashboardStaffListStudentsIdImport.update({
    id: '/list/students/$id',
    path: '/list/students/$id',
    getParentRoute: () => ProtectedDashboardStaffRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_protected': {
      id: '/_protected'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof ProtectedImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterImport
      parentRoute: typeof rootRoute
    }
    '/_protected/_dashboard': {
      id: '/_protected/_dashboard'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof ProtectedDashboardImport
      parentRoute: typeof ProtectedImport
    }
    '/_protected/': {
      id: '/_protected/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof ProtectedIndexImport
      parentRoute: typeof ProtectedImport
    }
    '/_protected/_dashboard/_admin': {
      id: '/_protected/_dashboard/_admin'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof ProtectedDashboardAdminImport
      parentRoute: typeof ProtectedDashboardImport
    }
    '/_protected/_dashboard/_staff': {
      id: '/_protected/_dashboard/_staff'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof ProtectedDashboardStaffImport
      parentRoute: typeof ProtectedDashboardImport
    }
    '/_protected/_dashboard/_student': {
      id: '/_protected/_dashboard/_student'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof ProtectedDashboardStudentImport
      parentRoute: typeof ProtectedDashboardImport
    }
    '/_protected/_dashboard/_teacher': {
      id: '/_protected/_dashboard/_teacher'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof ProtectedDashboardTeacherImport
      parentRoute: typeof ProtectedDashboardImport
    }
    '/_protected/_dashboard/announcements': {
      id: '/_protected/_dashboard/announcements'
      path: '/announcements'
      fullPath: '/announcements'
      preLoaderRoute: typeof ProtectedDashboardAnnouncementsLazyImport
      parentRoute: typeof ProtectedDashboardImport
    }
    '/_protected/_dashboard/_admin/admin/': {
      id: '/_protected/_dashboard/_admin/admin/'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof ProtectedDashboardAdminAdminIndexImport
      parentRoute: typeof ProtectedDashboardAdminImport
    }
    '/_protected/_dashboard/_student/student/': {
      id: '/_protected/_dashboard/_student/student/'
      path: '/student'
      fullPath: '/student'
      preLoaderRoute: typeof ProtectedDashboardStudentStudentIndexImport
      parentRoute: typeof ProtectedDashboardStudentImport
    }
    '/_protected/_dashboard/_teacher/teacher/': {
      id: '/_protected/_dashboard/_teacher/teacher/'
      path: '/teacher'
      fullPath: '/teacher'
      preLoaderRoute: typeof ProtectedDashboardTeacherTeacherIndexImport
      parentRoute: typeof ProtectedDashboardTeacherImport
    }
    '/_protected/_dashboard/list/announcements/': {
      id: '/_protected/_dashboard/list/announcements/'
      path: '/list/announcements'
      fullPath: '/list/announcements'
      preLoaderRoute: typeof ProtectedDashboardListAnnouncementsIndexImport
      parentRoute: typeof ProtectedDashboardImport
    }
    '/_protected/_dashboard/list/assignments/': {
      id: '/_protected/_dashboard/list/assignments/'
      path: '/list/assignments'
      fullPath: '/list/assignments'
      preLoaderRoute: typeof ProtectedDashboardListAssignmentsIndexImport
      parentRoute: typeof ProtectedDashboardImport
    }
    '/_protected/_dashboard/list/events/': {
      id: '/_protected/_dashboard/list/events/'
      path: '/list/events'
      fullPath: '/list/events'
      preLoaderRoute: typeof ProtectedDashboardListEventsIndexImport
      parentRoute: typeof ProtectedDashboardImport
    }
    '/_protected/_dashboard/list/exams/': {
      id: '/_protected/_dashboard/list/exams/'
      path: '/list/exams'
      fullPath: '/list/exams'
      preLoaderRoute: typeof ProtectedDashboardListExamsIndexImport
      parentRoute: typeof ProtectedDashboardImport
    }
    '/_protected/_dashboard/list/results/': {
      id: '/_protected/_dashboard/list/results/'
      path: '/list/results'
      fullPath: '/list/results'
      preLoaderRoute: typeof ProtectedDashboardListResultsIndexImport
      parentRoute: typeof ProtectedDashboardImport
    }
    '/_protected/_dashboard/_staff/list/students/$id': {
      id: '/_protected/_dashboard/_staff/list/students/$id'
      path: '/list/students/$id'
      fullPath: '/list/students/$id'
      preLoaderRoute: typeof ProtectedDashboardStaffListStudentsIdImport
      parentRoute: typeof ProtectedDashboardStaffImport
    }
    '/_protected/_dashboard/_staff/list/teachers/$id': {
      id: '/_protected/_dashboard/_staff/list/teachers/$id'
      path: '/list/teachers/$id'
      fullPath: '/list/teachers/$id'
      preLoaderRoute: typeof ProtectedDashboardStaffListTeachersIdImport
      parentRoute: typeof ProtectedDashboardStaffImport
    }
    '/_protected/_dashboard/_admin/list/subjects/': {
      id: '/_protected/_dashboard/_admin/list/subjects/'
      path: '/list/subjects'
      fullPath: '/list/subjects'
      preLoaderRoute: typeof ProtectedDashboardAdminListSubjectsIndexImport
      parentRoute: typeof ProtectedDashboardAdminImport
    }
    '/_protected/_dashboard/_staff/list/classes/': {
      id: '/_protected/_dashboard/_staff/list/classes/'
      path: '/list/classes'
      fullPath: '/list/classes'
      preLoaderRoute: typeof ProtectedDashboardStaffListClassesIndexImport
      parentRoute: typeof ProtectedDashboardStaffImport
    }
    '/_protected/_dashboard/_staff/list/lessons/': {
      id: '/_protected/_dashboard/_staff/list/lessons/'
      path: '/list/lessons'
      fullPath: '/list/lessons'
      preLoaderRoute: typeof ProtectedDashboardStaffListLessonsIndexImport
      parentRoute: typeof ProtectedDashboardStaffImport
    }
    '/_protected/_dashboard/_staff/list/students/': {
      id: '/_protected/_dashboard/_staff/list/students/'
      path: '/list/students'
      fullPath: '/list/students'
      preLoaderRoute: typeof ProtectedDashboardStaffListStudentsIndexImport
      parentRoute: typeof ProtectedDashboardStaffImport
    }
    '/_protected/_dashboard/_staff/list/teachers/': {
      id: '/_protected/_dashboard/_staff/list/teachers/'
      path: '/list/teachers'
      fullPath: '/list/teachers'
      preLoaderRoute: typeof ProtectedDashboardStaffListTeachersIndexImport
      parentRoute: typeof ProtectedDashboardStaffImport
    }
    '/_protected/_dashboard/_teacher/list/attendance/': {
      id: '/_protected/_dashboard/_teacher/list/attendance/'
      path: '/list/attendance'
      fullPath: '/list/attendance'
      preLoaderRoute: typeof ProtectedDashboardTeacherListAttendanceIndexImport
      parentRoute: typeof ProtectedDashboardTeacherImport
    }
  }
}

// Create and export the route tree

interface ProtectedDashboardAdminRouteChildren {
  ProtectedDashboardAdminAdminIndexRoute: typeof ProtectedDashboardAdminAdminIndexRoute
  ProtectedDashboardAdminListSubjectsIndexRoute: typeof ProtectedDashboardAdminListSubjectsIndexRoute
}

const ProtectedDashboardAdminRouteChildren: ProtectedDashboardAdminRouteChildren =
  {
    ProtectedDashboardAdminAdminIndexRoute:
      ProtectedDashboardAdminAdminIndexRoute,
    ProtectedDashboardAdminListSubjectsIndexRoute:
      ProtectedDashboardAdminListSubjectsIndexRoute,
  }

const ProtectedDashboardAdminRouteWithChildren =
  ProtectedDashboardAdminRoute._addFileChildren(
    ProtectedDashboardAdminRouteChildren,
  )

interface ProtectedDashboardStaffRouteChildren {
  ProtectedDashboardStaffListStudentsIdRoute: typeof ProtectedDashboardStaffListStudentsIdRoute
  ProtectedDashboardStaffListTeachersIdRoute: typeof ProtectedDashboardStaffListTeachersIdRoute
  ProtectedDashboardStaffListClassesIndexRoute: typeof ProtectedDashboardStaffListClassesIndexRoute
  ProtectedDashboardStaffListLessonsIndexRoute: typeof ProtectedDashboardStaffListLessonsIndexRoute
  ProtectedDashboardStaffListStudentsIndexRoute: typeof ProtectedDashboardStaffListStudentsIndexRoute
  ProtectedDashboardStaffListTeachersIndexRoute: typeof ProtectedDashboardStaffListTeachersIndexRoute
}

const ProtectedDashboardStaffRouteChildren: ProtectedDashboardStaffRouteChildren =
  {
    ProtectedDashboardStaffListStudentsIdRoute:
      ProtectedDashboardStaffListStudentsIdRoute,
    ProtectedDashboardStaffListTeachersIdRoute:
      ProtectedDashboardStaffListTeachersIdRoute,
    ProtectedDashboardStaffListClassesIndexRoute:
      ProtectedDashboardStaffListClassesIndexRoute,
    ProtectedDashboardStaffListLessonsIndexRoute:
      ProtectedDashboardStaffListLessonsIndexRoute,
    ProtectedDashboardStaffListStudentsIndexRoute:
      ProtectedDashboardStaffListStudentsIndexRoute,
    ProtectedDashboardStaffListTeachersIndexRoute:
      ProtectedDashboardStaffListTeachersIndexRoute,
  }

const ProtectedDashboardStaffRouteWithChildren =
  ProtectedDashboardStaffRoute._addFileChildren(
    ProtectedDashboardStaffRouteChildren,
  )

interface ProtectedDashboardStudentRouteChildren {
  ProtectedDashboardStudentStudentIndexRoute: typeof ProtectedDashboardStudentStudentIndexRoute
}

const ProtectedDashboardStudentRouteChildren: ProtectedDashboardStudentRouteChildren =
  {
    ProtectedDashboardStudentStudentIndexRoute:
      ProtectedDashboardStudentStudentIndexRoute,
  }

const ProtectedDashboardStudentRouteWithChildren =
  ProtectedDashboardStudentRoute._addFileChildren(
    ProtectedDashboardStudentRouteChildren,
  )

interface ProtectedDashboardTeacherRouteChildren {
  ProtectedDashboardTeacherTeacherIndexRoute: typeof ProtectedDashboardTeacherTeacherIndexRoute
  ProtectedDashboardTeacherListAttendanceIndexRoute: typeof ProtectedDashboardTeacherListAttendanceIndexRoute
}

const ProtectedDashboardTeacherRouteChildren: ProtectedDashboardTeacherRouteChildren =
  {
    ProtectedDashboardTeacherTeacherIndexRoute:
      ProtectedDashboardTeacherTeacherIndexRoute,
    ProtectedDashboardTeacherListAttendanceIndexRoute:
      ProtectedDashboardTeacherListAttendanceIndexRoute,
  }

const ProtectedDashboardTeacherRouteWithChildren =
  ProtectedDashboardTeacherRoute._addFileChildren(
    ProtectedDashboardTeacherRouteChildren,
  )

interface ProtectedDashboardRouteChildren {
  ProtectedDashboardAdminRoute: typeof ProtectedDashboardAdminRouteWithChildren
  ProtectedDashboardStaffRoute: typeof ProtectedDashboardStaffRouteWithChildren
  ProtectedDashboardStudentRoute: typeof ProtectedDashboardStudentRouteWithChildren
  ProtectedDashboardTeacherRoute: typeof ProtectedDashboardTeacherRouteWithChildren
  ProtectedDashboardAnnouncementsLazyRoute: typeof ProtectedDashboardAnnouncementsLazyRoute
  ProtectedDashboardListAnnouncementsIndexRoute: typeof ProtectedDashboardListAnnouncementsIndexRoute
  ProtectedDashboardListAssignmentsIndexRoute: typeof ProtectedDashboardListAssignmentsIndexRoute
  ProtectedDashboardListEventsIndexRoute: typeof ProtectedDashboardListEventsIndexRoute
  ProtectedDashboardListExamsIndexRoute: typeof ProtectedDashboardListExamsIndexRoute
  ProtectedDashboardListResultsIndexRoute: typeof ProtectedDashboardListResultsIndexRoute
}

const ProtectedDashboardRouteChildren: ProtectedDashboardRouteChildren = {
  ProtectedDashboardAdminRoute: ProtectedDashboardAdminRouteWithChildren,
  ProtectedDashboardStaffRoute: ProtectedDashboardStaffRouteWithChildren,
  ProtectedDashboardStudentRoute: ProtectedDashboardStudentRouteWithChildren,
  ProtectedDashboardTeacherRoute: ProtectedDashboardTeacherRouteWithChildren,
  ProtectedDashboardAnnouncementsLazyRoute:
    ProtectedDashboardAnnouncementsLazyRoute,
  ProtectedDashboardListAnnouncementsIndexRoute:
    ProtectedDashboardListAnnouncementsIndexRoute,
  ProtectedDashboardListAssignmentsIndexRoute:
    ProtectedDashboardListAssignmentsIndexRoute,
  ProtectedDashboardListEventsIndexRoute:
    ProtectedDashboardListEventsIndexRoute,
  ProtectedDashboardListExamsIndexRoute: ProtectedDashboardListExamsIndexRoute,
  ProtectedDashboardListResultsIndexRoute:
    ProtectedDashboardListResultsIndexRoute,
}

const ProtectedDashboardRouteWithChildren =
  ProtectedDashboardRoute._addFileChildren(ProtectedDashboardRouteChildren)

interface ProtectedRouteChildren {
  ProtectedDashboardRoute: typeof ProtectedDashboardRouteWithChildren
  ProtectedIndexRoute: typeof ProtectedIndexRoute
}

const ProtectedRouteChildren: ProtectedRouteChildren = {
  ProtectedDashboardRoute: ProtectedDashboardRouteWithChildren,
  ProtectedIndexRoute: ProtectedIndexRoute,
}

const ProtectedRouteWithChildren = ProtectedRoute._addFileChildren(
  ProtectedRouteChildren,
)

export interface FileRoutesByFullPath {
  '': typeof ProtectedDashboardTeacherRouteWithChildren
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/': typeof ProtectedIndexRoute
  '/announcements': typeof ProtectedDashboardAnnouncementsLazyRoute
  '/admin': typeof ProtectedDashboardAdminAdminIndexRoute
  '/student': typeof ProtectedDashboardStudentStudentIndexRoute
  '/teacher': typeof ProtectedDashboardTeacherTeacherIndexRoute
  '/list/announcements': typeof ProtectedDashboardListAnnouncementsIndexRoute
  '/list/assignments': typeof ProtectedDashboardListAssignmentsIndexRoute
  '/list/events': typeof ProtectedDashboardListEventsIndexRoute
  '/list/exams': typeof ProtectedDashboardListExamsIndexRoute
  '/list/results': typeof ProtectedDashboardListResultsIndexRoute
  '/list/students/$id': typeof ProtectedDashboardStaffListStudentsIdRoute
  '/list/teachers/$id': typeof ProtectedDashboardStaffListTeachersIdRoute
  '/list/subjects': typeof ProtectedDashboardAdminListSubjectsIndexRoute
  '/list/classes': typeof ProtectedDashboardStaffListClassesIndexRoute
  '/list/lessons': typeof ProtectedDashboardStaffListLessonsIndexRoute
  '/list/students': typeof ProtectedDashboardStaffListStudentsIndexRoute
  '/list/teachers': typeof ProtectedDashboardStaffListTeachersIndexRoute
  '/list/attendance': typeof ProtectedDashboardTeacherListAttendanceIndexRoute
}

export interface FileRoutesByTo {
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '': typeof ProtectedDashboardTeacherRouteWithChildren
  '/': typeof ProtectedIndexRoute
  '/announcements': typeof ProtectedDashboardAnnouncementsLazyRoute
  '/admin': typeof ProtectedDashboardAdminAdminIndexRoute
  '/student': typeof ProtectedDashboardStudentStudentIndexRoute
  '/teacher': typeof ProtectedDashboardTeacherTeacherIndexRoute
  '/list/announcements': typeof ProtectedDashboardListAnnouncementsIndexRoute
  '/list/assignments': typeof ProtectedDashboardListAssignmentsIndexRoute
  '/list/events': typeof ProtectedDashboardListEventsIndexRoute
  '/list/exams': typeof ProtectedDashboardListExamsIndexRoute
  '/list/results': typeof ProtectedDashboardListResultsIndexRoute
  '/list/students/$id': typeof ProtectedDashboardStaffListStudentsIdRoute
  '/list/teachers/$id': typeof ProtectedDashboardStaffListTeachersIdRoute
  '/list/subjects': typeof ProtectedDashboardAdminListSubjectsIndexRoute
  '/list/classes': typeof ProtectedDashboardStaffListClassesIndexRoute
  '/list/lessons': typeof ProtectedDashboardStaffListLessonsIndexRoute
  '/list/students': typeof ProtectedDashboardStaffListStudentsIndexRoute
  '/list/teachers': typeof ProtectedDashboardStaffListTeachersIndexRoute
  '/list/attendance': typeof ProtectedDashboardTeacherListAttendanceIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_protected': typeof ProtectedRouteWithChildren
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/_protected/_dashboard': typeof ProtectedDashboardRouteWithChildren
  '/_protected/': typeof ProtectedIndexRoute
  '/_protected/_dashboard/_admin': typeof ProtectedDashboardAdminRouteWithChildren
  '/_protected/_dashboard/_staff': typeof ProtectedDashboardStaffRouteWithChildren
  '/_protected/_dashboard/_student': typeof ProtectedDashboardStudentRouteWithChildren
  '/_protected/_dashboard/_teacher': typeof ProtectedDashboardTeacherRouteWithChildren
  '/_protected/_dashboard/announcements': typeof ProtectedDashboardAnnouncementsLazyRoute
  '/_protected/_dashboard/_admin/admin/': typeof ProtectedDashboardAdminAdminIndexRoute
  '/_protected/_dashboard/_student/student/': typeof ProtectedDashboardStudentStudentIndexRoute
  '/_protected/_dashboard/_teacher/teacher/': typeof ProtectedDashboardTeacherTeacherIndexRoute
  '/_protected/_dashboard/list/announcements/': typeof ProtectedDashboardListAnnouncementsIndexRoute
  '/_protected/_dashboard/list/assignments/': typeof ProtectedDashboardListAssignmentsIndexRoute
  '/_protected/_dashboard/list/events/': typeof ProtectedDashboardListEventsIndexRoute
  '/_protected/_dashboard/list/exams/': typeof ProtectedDashboardListExamsIndexRoute
  '/_protected/_dashboard/list/results/': typeof ProtectedDashboardListResultsIndexRoute
  '/_protected/_dashboard/_staff/list/students/$id': typeof ProtectedDashboardStaffListStudentsIdRoute
  '/_protected/_dashboard/_staff/list/teachers/$id': typeof ProtectedDashboardStaffListTeachersIdRoute
  '/_protected/_dashboard/_admin/list/subjects/': typeof ProtectedDashboardAdminListSubjectsIndexRoute
  '/_protected/_dashboard/_staff/list/classes/': typeof ProtectedDashboardStaffListClassesIndexRoute
  '/_protected/_dashboard/_staff/list/lessons/': typeof ProtectedDashboardStaffListLessonsIndexRoute
  '/_protected/_dashboard/_staff/list/students/': typeof ProtectedDashboardStaffListStudentsIndexRoute
  '/_protected/_dashboard/_staff/list/teachers/': typeof ProtectedDashboardStaffListTeachersIndexRoute
  '/_protected/_dashboard/_teacher/list/attendance/': typeof ProtectedDashboardTeacherListAttendanceIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/login'
    | '/register'
    | '/'
    | '/announcements'
    | '/admin'
    | '/student'
    | '/teacher'
    | '/list/announcements'
    | '/list/assignments'
    | '/list/events'
    | '/list/exams'
    | '/list/results'
    | '/list/students/$id'
    | '/list/teachers/$id'
    | '/list/subjects'
    | '/list/classes'
    | '/list/lessons'
    | '/list/students'
    | '/list/teachers'
    | '/list/attendance'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/login'
    | '/register'
    | ''
    | '/'
    | '/announcements'
    | '/admin'
    | '/student'
    | '/teacher'
    | '/list/announcements'
    | '/list/assignments'
    | '/list/events'
    | '/list/exams'
    | '/list/results'
    | '/list/students/$id'
    | '/list/teachers/$id'
    | '/list/subjects'
    | '/list/classes'
    | '/list/lessons'
    | '/list/students'
    | '/list/teachers'
    | '/list/attendance'
  id:
    | '__root__'
    | '/_protected'
    | '/login'
    | '/register'
    | '/_protected/_dashboard'
    | '/_protected/'
    | '/_protected/_dashboard/_admin'
    | '/_protected/_dashboard/_staff'
    | '/_protected/_dashboard/_student'
    | '/_protected/_dashboard/_teacher'
    | '/_protected/_dashboard/announcements'
    | '/_protected/_dashboard/_admin/admin/'
    | '/_protected/_dashboard/_student/student/'
    | '/_protected/_dashboard/_teacher/teacher/'
    | '/_protected/_dashboard/list/announcements/'
    | '/_protected/_dashboard/list/assignments/'
    | '/_protected/_dashboard/list/events/'
    | '/_protected/_dashboard/list/exams/'
    | '/_protected/_dashboard/list/results/'
    | '/_protected/_dashboard/_staff/list/students/$id'
    | '/_protected/_dashboard/_staff/list/teachers/$id'
    | '/_protected/_dashboard/_admin/list/subjects/'
    | '/_protected/_dashboard/_staff/list/classes/'
    | '/_protected/_dashboard/_staff/list/lessons/'
    | '/_protected/_dashboard/_staff/list/students/'
    | '/_protected/_dashboard/_staff/list/teachers/'
    | '/_protected/_dashboard/_teacher/list/attendance/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  ProtectedRoute: typeof ProtectedRouteWithChildren
  LoginRoute: typeof LoginRoute
  RegisterRoute: typeof RegisterRoute
}

const rootRouteChildren: RootRouteChildren = {
  ProtectedRoute: ProtectedRouteWithChildren,
  LoginRoute: LoginRoute,
  RegisterRoute: RegisterRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_protected",
        "/login",
        "/register"
      ]
    },
    "/_protected": {
      "filePath": "_protected.tsx",
      "children": [
        "/_protected/_dashboard",
        "/_protected/"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/register": {
      "filePath": "register.tsx"
    },
    "/_protected/_dashboard": {
      "filePath": "_protected/_dashboard.tsx",
      "parent": "/_protected",
      "children": [
        "/_protected/_dashboard/_admin",
        "/_protected/_dashboard/_staff",
        "/_protected/_dashboard/_student",
        "/_protected/_dashboard/_teacher",
        "/_protected/_dashboard/announcements",
        "/_protected/_dashboard/list/announcements/",
        "/_protected/_dashboard/list/assignments/",
        "/_protected/_dashboard/list/events/",
        "/_protected/_dashboard/list/exams/",
        "/_protected/_dashboard/list/results/"
      ]
    },
    "/_protected/": {
      "filePath": "_protected/index.tsx",
      "parent": "/_protected"
    },
    "/_protected/_dashboard/_admin": {
      "filePath": "_protected/_dashboard/_admin.tsx",
      "parent": "/_protected/_dashboard",
      "children": [
        "/_protected/_dashboard/_admin/admin/",
        "/_protected/_dashboard/_admin/list/subjects/"
      ]
    },
    "/_protected/_dashboard/_staff": {
      "filePath": "_protected/_dashboard/_staff.tsx",
      "parent": "/_protected/_dashboard",
      "children": [
        "/_protected/_dashboard/_staff/list/students/$id",
        "/_protected/_dashboard/_staff/list/teachers/$id",
        "/_protected/_dashboard/_staff/list/classes/",
        "/_protected/_dashboard/_staff/list/lessons/",
        "/_protected/_dashboard/_staff/list/students/",
        "/_protected/_dashboard/_staff/list/teachers/"
      ]
    },
    "/_protected/_dashboard/_student": {
      "filePath": "_protected/_dashboard/_student.tsx",
      "parent": "/_protected/_dashboard",
      "children": [
        "/_protected/_dashboard/_student/student/"
      ]
    },
    "/_protected/_dashboard/_teacher": {
      "filePath": "_protected/_dashboard/_teacher.tsx",
      "parent": "/_protected/_dashboard",
      "children": [
        "/_protected/_dashboard/_teacher/teacher/",
        "/_protected/_dashboard/_teacher/list/attendance/"
      ]
    },
    "/_protected/_dashboard/announcements": {
      "filePath": "_protected/_dashboard/announcements.lazy.tsx",
      "parent": "/_protected/_dashboard"
    },
    "/_protected/_dashboard/_admin/admin/": {
      "filePath": "_protected/_dashboard/_admin/admin/index.tsx",
      "parent": "/_protected/_dashboard/_admin"
    },
    "/_protected/_dashboard/_student/student/": {
      "filePath": "_protected/_dashboard/_student/student/index.tsx",
      "parent": "/_protected/_dashboard/_student"
    },
    "/_protected/_dashboard/_teacher/teacher/": {
      "filePath": "_protected/_dashboard/_teacher/teacher/index.tsx",
      "parent": "/_protected/_dashboard/_teacher"
    },
    "/_protected/_dashboard/list/announcements/": {
      "filePath": "_protected/_dashboard/list/announcements/index.tsx",
      "parent": "/_protected/_dashboard"
    },
    "/_protected/_dashboard/list/assignments/": {
      "filePath": "_protected/_dashboard/list/assignments/index.tsx",
      "parent": "/_protected/_dashboard"
    },
    "/_protected/_dashboard/list/events/": {
      "filePath": "_protected/_dashboard/list/events/index.tsx",
      "parent": "/_protected/_dashboard"
    },
    "/_protected/_dashboard/list/exams/": {
      "filePath": "_protected/_dashboard/list/exams/index.tsx",
      "parent": "/_protected/_dashboard"
    },
    "/_protected/_dashboard/list/results/": {
      "filePath": "_protected/_dashboard/list/results/index.tsx",
      "parent": "/_protected/_dashboard"
    },
    "/_protected/_dashboard/_staff/list/students/$id": {
      "filePath": "_protected/_dashboard/_staff/list/students/$id.tsx",
      "parent": "/_protected/_dashboard/_staff"
    },
    "/_protected/_dashboard/_staff/list/teachers/$id": {
      "filePath": "_protected/_dashboard/_staff/list/teachers/$id.tsx",
      "parent": "/_protected/_dashboard/_staff"
    },
    "/_protected/_dashboard/_admin/list/subjects/": {
      "filePath": "_protected/_dashboard/_admin/list/subjects/index.tsx",
      "parent": "/_protected/_dashboard/_admin"
    },
    "/_protected/_dashboard/_staff/list/classes/": {
      "filePath": "_protected/_dashboard/_staff/list/classes/index.tsx",
      "parent": "/_protected/_dashboard/_staff"
    },
    "/_protected/_dashboard/_staff/list/lessons/": {
      "filePath": "_protected/_dashboard/_staff/list/lessons/index.tsx",
      "parent": "/_protected/_dashboard/_staff"
    },
    "/_protected/_dashboard/_staff/list/students/": {
      "filePath": "_protected/_dashboard/_staff/list/students/index.tsx",
      "parent": "/_protected/_dashboard/_staff"
    },
    "/_protected/_dashboard/_staff/list/teachers/": {
      "filePath": "_protected/_dashboard/_staff/list/teachers/index.tsx",
      "parent": "/_protected/_dashboard/_staff"
    },
    "/_protected/_dashboard/_teacher/list/attendance/": {
      "filePath": "_protected/_dashboard/_teacher/list/attendance/index.tsx",
      "parent": "/_protected/_dashboard/_teacher"
    }
  }
}
ROUTE_MANIFEST_END */
