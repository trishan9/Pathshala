const responseMessage = {
  USER: {
    CREATED: "User created successfully",
    LOGGED_IN: "User logged in successfully",
    LOGGED_OUT: "User logged out successfully",
    UPDATED: "User details updated successfully",
    DELETE_USER: "User deleted successfully",
    RETRIEVED: "User data retrieved successfully",
    DELETED: "User is deleted",
    REFRESH: "Token refreshed successfully",
  },
  TEACHER: {
    RETRIEVED_ALL: "All teachers fetched successfully!",
  },
  STUDENT: {
    RETRIEVED_ALL: "All students fetched successfully!",
  },
  SUBJECT: {
    RETRIEVED_ALL: "All subjects fetched successfully!",
  },
  OTHER: {
    SERVER_ERROR: "Internal Server Error",
  },
};

export { responseMessage };
