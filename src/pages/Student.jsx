import { Link } from "react-router-dom";
import StudentCard from "./StudentCard";

const Student = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Students</h1>
        <Link to="/students/add">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
            + Add Student
          </button>
        </Link>
      </div>
      <StudentCard />
    </div>
  );
};

export default Student;
