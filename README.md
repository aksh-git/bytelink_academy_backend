# API Documentation

## Authentication
   - **Login**
     - Method: POST
     - Endpoint: `/api/auth/login`
     - Description: Authenticates a student and returns an authentication token.
     - Body:
       ```json
       {
         "email": "example@email.com",
         "password": "password123"
       }
       ```
     - Response:
       ```json
       {
         "success": true,
         "authtoken": "yourAuthToken",
         "data": {
           "student": {
             "id": "studentId"
           }
         }
       }
       ```

   - **Register**
     - Method: POST
     - Endpoint: `/api/auth/register`
     - Description: Registers a new student and returns an authentication token.
     - Body:
       ```json
       {
         "email": "new@example.com",
         "fullname": "John Doe",
         "password": "newpassword"
       }
       ```
     - Response:
       ```json
       {
         "success": true,
         "authtoken": "xxx"
       }
       ```

## Student Information
   - **Get All Students**
     - Method: GET
     - Endpoint: `/api/student/getStudents?from=0`
     - Description: Retrieves a list of all students.
     - Response:
       ```json
       {
         "success": true,
         "message": "Students retrieved successfully.",
         "students": [
           {
             "id": "studentId1",
             "name": "John Doe",
             // other student details
           },
           // additional students
         ]
       }
       ```

   - **Get Student by ID**
     - Method: GET
     - Endpoint: `/api/student/getStudentByID?id=studentId`
     - Description: Retrieves details of a specific student by ID.
     - Response:
       ```json
       {
         "success": true,
         "data": {
           "id": "studentId",
           "name": "John Doe",
           // other student details
         }
       }
       ```

   - **Get Logged-in Student**
     - Method: GET
     - Endpoint: `/student/getLoggedInStudent`
     - Description: Retrieves details of the currently logged-in student.
     - Headers:
       ```
       auth-token: xxx
       ```
     - Response:
       ```json
       {
         "success": true,
         "data": {
           "id": "loggedInStudentId",
           "name": "John Doe",
           // other student details
         }
       }
       ```

   - **Update Student**
     - Method: POST
     - Endpoint: `/api/student/updateStudent`
     - Description: Updates details of the currently logged-in student.
     - Headers:
       ```
       auth-token: xxx
       ```
     - Body:
       ```json
       {
         "updateData": {
           // fields to update
         }
       }
       ```
     - Response:
       ```json
       {
         "success": true,
         "data": {
           "id": "updatedStudentId",
           // other updated student details
         }
       }
       ```

## Search Students
   - **Search by Name/Tech Stack/Bio**
     - Method: GET
     - Endpoint: `/api/search/students?query=keyword`
     - Description: Searches for students by name, tech stack, or bio.
     - Response:
       ```json
       {
         "success": true,
         "message": "Search results retrieved successfully.",
         "results": [
           {
             "id": "studentId1",
             "name": "John Doe",
             // other student details
           },
           // additional search results
         ]
       }
       ```

