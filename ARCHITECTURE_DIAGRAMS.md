# 📊 Visual Architecture Diagrams

## Application Structure

```
┌─────────────────────────────────────────────────────────┐
│                    E-Library System                      │
│                  (React + Vite + Tailwind)               │
└─────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
            ┌───────▼───────┐    ┌─────▼────────┐
            │  FRONTEND     │    │   BACKEND    │
            │  (libfront)   │    │  (libback)   │
            └───────┬───────┘    └──────────────┘
                    │
        ┌───────────┼────────────┐
        │           │            │
    ┌───▼──┐  ┌────▼────┐  ┌───▼────┐
    │Pages │  │Components   │Routes │
    └──────┘  └──────────┘  └────────┘
```

---

## File Organization Tree

```
src/
│
├── 📄 pages/                        🎯 Business Logic (Smart Components)
│   ├── AddStudent.jsx              ✨ NEW - Add student page
│   ├── EditStudent.jsx             ✨ NEW - Edit student page
│   ├── DeleteStudent.jsx           ✨ NEW - Delete student page
│   ├── Student.jsx                 ✅ Container for StudentCard
│   ├── StudentCard.jsx             ✅ Display students + pagination
│   ├── AdminLogin.jsx              ✅ Login page
│   ├── AdminRegister.jsx           ✅ Register page
│   ├── Home.js                     ✅ Home page
│   ├── Stats.js                    ✅ Statistics page
│   └── Book.js                     ✅ Books page
│
├── 🧩 components/                  📘 Pure UI (Dumb Components)
│   ├── StudentForm.jsx             ✅ REFACTORED - Reusable form
│   ├── BookForm.jsx                ✅ Book form
│   ├── DeleteStudentModal.jsx      ✅ Delete confirmation
│   ├── Pagination.jsx              ✅ Pagination controls
│   ├── DashboardWidget.jsx         ✅ Dashboard
│   ├── StatusCard.js               ✅ Status card
│   └── common/
│       ├── Header.jsx              ✅ Navigation header
│       ├── Sidebar.jsx             ✅ Sidebar menu
│       ├── Footer.jsx              ✅ Footer
│       ├── AnimatedBookList.jsx    ✅ Animated list
│       ├── AnimatedStudenList.jsx  ✅ Animated list
│       └── Loader.jsx              ✅ Loading spinner
│
├── 🛣️  routes/                      🛡️ Routing & Protection
│   ├── AppRoutes.jsx               ✅ Main route config
│   ├── ProtectedRoute.jsx          ✅ Route guard
│   └── SessionManager.jsx          ✅ Session control
│
├── 📦 redux/                        🔄 State Management
│   ├── authSlice.js
│   ├── authAction.js
│   ├── bookSlice.js
│   ├── studentSlice.js
│   └── store.js
│
├── 🔗 services/                     💾 API Calls
│   ├── studentServices.js
│   ├── bookServices.js
│   ├── authServices.js
│   └── apiClients.js
│
└── 🛠️ utils/                        ⚙️ Utilities
    ├── authUtils.js
    ├── validators.js
    ├── formateDate.js
    └── constant.js
```

---

## Component Data Flow

### Adding a Student

```
User Interface
     ↓
┌────────────────────────────┐
│  /students (Student.jsx)   │
│  ┌──────────────────────┐  │
│  │ StudentCard display  │  │
│  │ + "Add Student" btn  │  │
│  └──────────────────────┘  │
└────────────────────────────┘
     ↓ Click "+ Add Student"
     ↓ navigate("/students/add")
     ↓
┌────────────────────────────┐
│  /students/add             │
│ (AddStudent.jsx - PAGE)    │
│                            │
│  ┌──────────────────────┐  │
│  │ initialData = empty  │  │
│  │ onSubmit = add logic │  │
│  │ isEditing = false    │  │
│  │                      │  │
│  │ Renders:             │  │
│  │ <StudentForm {...} / │  │
│  └──────────────────────┘  │
└────────────────────────────┘
     ↓ Pass props to component
     ↓
┌────────────────────────────┐
│  StudentForm              │
│  (COMPONENT)             │
│  ┌──────────────────────┐  │
│  │ setState formData    │  │
│  │ handleChange()       │  │
│  │ handleSubmit()       │  │
│  │   → calls onSubmit() │  │
│  │   → parent handles   │  │
│  │                      │  │
│  │ Renders:             │  │
│  │ <form onSubmit>      │  │
│  │  <input name="name"/ │  │
│  │  <button>Submit</>   │  │
│  └──────────────────────┘  │
└────────────────────────────┘
     ↓ User fills form & clicks "Submit"
     ↓
     ↓ StudentForm.handleSubmit()
     ↓ onSubmit(formData)
     ↓ Calls AddStudent.handleSubmit()
     ↓
┌────────────────────────────┐
│  AddStudent.handleSubmit() │
│  (PAGE - LOGIC)            │
│  ┌──────────────────────┐  │
│  │ setSubmitting(true)  │  │
│  │ await               │  │
│  │ createStudent(data) │  │
│  │ alert("Success!")   │  │
│  │ navigate("/students")   │
│  └──────────────────────┘  │
└────────────────────────────┘
     ↓ API Call
     ↓
┌────────────────────────────┐
│  Backend API               │
│  POST /api/students        │
│  ┌──────────────────────┐  │
│  │ Create student       │  │
│  │ Save to database     │  │
│  └──────────────────────┘  │
└────────────────────────────┘
     ↓ Success
     ↓ Navigate to /students
     ↓
┌────────────────────────────┐
│  /students                 │
│  (StudentCard.jsx)         │
│  ┌──────────────────────┐  │
│  │ Fetch all students   │  │
│  │ New student in list  │  │
│  └──────────────────────┘  │
└────────────────────────────┘
     ↓
   Display
```

---

### Editing a Student

```
User Interface
     ↓
┌────────────────────────────┐
│  /students                 │
│  StudentCard display       │
│  Click Edit on student ID: │
│  123                       │
└────────────────────────────┘
     ↓ navigate("/students/123")
     ↓
┌────────────────────────────┐
│  /students/123             │
│  (EditStudent.jsx - PAGE)  │
│  ┌──────────────────────┐  │
│  │ useEffect:           │  │
│  │  id = 123            │  │
│  │  Fetch student data  │  │
│  │  from API GET /api/  │  │
│  │  students/123        │  │
│  │                      │  │
│  │ Rendering:           │  │
│  │ <StudentForm         │  │
│  │   initialData=data   │  │
│  │   onSubmit=update    │  │
│  │   isEditing=true     │  │
│  │ />                   │  │
│  └──────────────────────┘  │
└────────────────────────────┘
     ↓ Pre-filled form received
     ↓
┌────────────────────────────┐
│  StudentForm Component     │
│  (COMPONENT - UI ONLY)     │
│  ┌──────────────────────┐  │
│  │ formData = existing  │  │
│  │ state (prefilled)    │  │
│  │ handleChange() works │  │
│  │ Button says: UPDATE  │  │
│  │   (not Submit)       │  │
│  │                      │  │
│  │ User modifies field  │  │
│  │ Clicks "Update"      │  │
│  │ handleSubmit()       │  │
│  │ calls onSubmit()     │  │
│  └──────────────────────┘  │
└────────────────────────────┘
     ↓
┌────────────────────────────┐
│  EditStudent.handleSubmit()│
│  (PAGE - LOGIC)            │
│  ┌──────────────────────┐  │
│  │ await                │  │
│  │ updateStudent(       │  │
│  │   id=123,            │  │
│  │   data               │  │
│  │ )                    │  │
│  │ navigate("/students")    │
│  └──────────────────────┘  │
└────────────────────────────┘
     ↓ API Call
     ↓
┌────────────────────────────┐
│  Backend API               │
│  PUT /api/students/123     │
│  Update student in DB      │
└────────────────────────────┘
     ↓
   Back to /students
```

---

## Route Hierarchy

```
AppRoutes
│
├─ Public Routes
│  ├── /register      → AdminRegister
│  └── /login         → AdminLogin
│
└─ Protected Routes (Wrapped in ProtectedRoute)
   ├── /                    → Dashboard
   │
   ├── /students            → Student
   │                          └── StudentCard
   │
   ├── /students/add        → AddStudent
   │                          └── StudentForm (empty)
   │
   ├── /students/delete/:id → DeleteStudent
   │
   ├── /students/:id        → EditStudent
   │                          └── StudentForm (prefilled)
   │
   └── /addBooks            → BookForm
```

**Critical:** Route ordering matters!

```
✅ CORRECT                    ❌ WRONG
┌──────────────────┐        ┌──────────────────┐
│ /students/delete ├─ #1    │ /students/:id  │ #1 ← Matches first!
│                  │        │                │
│ /students/add    ├─ #2    │ /students/     ├─ #2
│                  │        │ delete/:id     │
│ /students/:id    ├─ #3    │                │
│                  │        │ /studentsForm  ├─ #3
└──────────────────┘        └──────────────────┘
```

---

## State Management Flow

```
Redux Store
    │
    ├── authSlice
    │   ├── isAuthenticated
    │   ├── user
    │   └── token
    │
    ├── studentSlice
    │   └── students[]
    │
    └── bookSlice
        └── books[]

    ↑         ↓
    │      dispatch(action)
    │         ↓
    └──────────┘

Components access via:
useSelector(state => state.auth)
useDispatch()
```

---

## Props Flow Tree

```
MainLayout
│
├── Header
│   ├── Link
│   ├── useNavigate
│   └── useSelector (auth)
│
├── Sidebar
│   ├── Link
│   ├── useState (collapsed)
│   └── useLocation
│
├── Routes
│   ├── ProtectedRoute
│   │   └── Student (Page)
│   │       └── StudentCard (Display)
│   │           ├── Pagination
│   │           │   ├── Props:
│   │           │   │   - currentPage
│   │           │   │   - totalPages
│   │           │   │   - onPageChange
│   │           │   └── Return:
│   │           │       <button/>
│   │           │
│   │           └── DeleteStudentModal
│   │               ├── Props:
│   │               │   - isOpen
│   │               │   - studentId
│   │               │   - onClose
│   │               │   - onDeleteSuccess
│   │               └── Return:
│   │                   <Modal/>
│   │
│   ├── ProtectedRoute
│   │   └── AddStudent (Page)
│   │       └── StudentForm (Component)
│   │           ├── Props:
│   │           │   - initialData (empty)
│   │           │   - onSubmit
│   │           │   - isEditing=false
│   │           └── Return:
│   │               <form/>
│   │
│   ├── ProtectedRoute
│   │   └── EditStudent (Page)
│   │       └── StudentForm (Component)
│   │           ├── Props:
│   │           │   - initialData (prefilled)
│   │           │   - onSubmit
│   │           │   - isEditing=true
│   │           └── Return:
│   │               <form/>
│   │
│   └── ProtectedRoute
│       └── DeleteStudent (Page)
│           └── useEffect -> auto-delete
│
├── Footer
│   └── Static content
│
└── SessionManager
    └── useEffect -> auto-logout

```

---

## API Request Flow

```
Component/Page
      │
      ↓ Calls function from services
      │
┌─────▼──────────────────┐
│  studentServices.js    │
│  ┌──────────────────┐  │
│  │ createStudent()  │  │
│  │ updateStudent()  │  │
│  │ deleteStudent()  │  │
│  │ getStudents()    │  │
│  │ getStudentById() │  │
│  └──────────────────┘  │
└─────┬──────────────────┘
      │
      ↓ Uses axios instance
      │
┌─────▼──────────────────┐
│  apiClients.js         │
│  axios instance        │
│  baseURL = https://... │
└─────┬──────────────────┘
      │
      ↓ HTTP Request
      │
┌─────▼──────────────────┐
│  Backend API           │
│  Node.js + Express     │
│  /api/students/*       │
└─────┬──────────────────┘
      │
      ↓ Database operation
      │
┌─────▼──────────────────┐
│  MongoDB               │
│  students collection   │
└─────┬──────────────────┘
      │
      ↓ Response
      │
      ← Axios promise
      ← Handle result
      ← Update state
      ← Re-render
```

---

## Form Submission Sequence

```
User Input
     │
     ↓
┌─────────────────────┐
│ StudentForm renders │
│ <form onSubmit>     │
└────────┬────────────┘
         │
         ↓ User clicks Submit/Update
         │
┌─────────────────────────────┐
│ StudentForm.handleSubmit()  │
│ - Prevent default           │
│ - Validate form data        │
│ - Call onSubmit(formData)   │
└────────┬────────────────────┘
         │
         ↓ Props callback
         │
┌─────────────────────────────┐
│ Page.handleSubmit()         │
│ - setIsSubmitting(true)     │
│ - Validate data             │
│ - Call API function         │
└────────┬────────────────────┘
         │
         ↓ API Call
         │
    ┌────▼────┐
    │ Success │  ← Show success
    └────┬────┘  ← Navigate away
         │
    ┌────▼────┐
    │  Error  │  ← Show error alert
    └─────────┘  ← Stay on form
```

---

## Responsive Layout

```
Desktop (lg:)                   Mobile (md: and below)
┌──────────────────────┐       ┌──────────────┐
│  Header (fixed z-50) │       │ Header (z-50)│
├──────────────────────┤       ├──────────────┤
│   │                  │       │ ≡ (hamburger)│
│   │  Sidebar         │       ├──────────────┤
│   │  (relative,      │       │              │
│   │   z-35)          │       │  Main        │
│   │                  │       │  Content     │
│ ──┼──────────────────│       │  (no sidebar │
│   │                  │       │   visible)   │
│   │   Main Content   │       │              │
│   │                  │       │              │
│   │                  │       ├──────────────┤
├───┴──────────────────┤       │   Footer     │
│      Footer          │       └──────────────┘
└──────────────────────┘
  (4-column layout)       (1-column stack)
```

---

## Authentication Flow

```
Start
  │
  ├─ Check localStorage
  │  ├─ token exists? Yes → Load user
  │  └─ token exists? No → Start anonymous
  │
  ├─ Show LoginPage
  │  ├─ User enters credentials
  │  └─ Submit form
  │
  ├─ loginUser(email, password)
  │  └─ Backend validates
  │     └─ Returns: token + user data
  │
  ├─ Store in localStorage
  │  ├─ token
  │  ├─ user
  │  └─ loginTime
  │
  ├─ Redux dispatch(login)
  │  └─ Set isAuthenticated = true
  │
  ├─ SessionManager starts
  │  ├─ Check every 60 seconds
  │  └─ If > 30 mins, logout
  │
  └─ Redirect to /students
     (ProtectedRoute checks auth)
```

---

## Component Lifecycle

```
AddStudent.jsx (Page)
│
├─ mount
│  ├─ initialize empty form data
│  └─ prepare API handlers
│
├─ render
│  └─ <StudentForm {...props} />
│
├─ StudentForm (Component)
│  ├─ mount
│  │  ├─ useState(initialData)
│  │  └─ useEffect cleanup
│  │
│  ├─ render
│  │  └─ <form> with <input> fields
│  │
│  └─ input change
│     └─ handleChange() → setFormData()
│
├─ form submit
│  ├─ StudentForm.handleSubmit()
│  └─ onSubmit(formData) → AddStudent callback
│
├─ AddStudent.handleSubmit()
│  ├─ setSubmitting(true)
│  ├─ createStudent(formData) → API call
│  ├─ setSubmitting(false)
│  └─ navigate("/students")
│
└─ unmount
   └─ cleanup
```

---

## Error Handling Flow

```
Error occurs
     │
     ↓
try/catch block
     │
     ├─ catch(error)
     │  ├─ console.error(error)
     │  └─ setError(error.message)
     │
     ↓
Display to user
     │
     ├─ alert("Error: " + message)
     │  OR
     ├─ <ErrorComponent message={message} />
     │  OR
     ├─ toast.error(message)
     │
     └─ Stay on current page
        (don't navigate away)
```

---

This visual guide should help you understand the architecture at a glance! 🎨
