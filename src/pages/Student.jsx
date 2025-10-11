
import StudenCard from "./StudenCard";

const Student = () => {
 
  return (
    <div className="container mx-auto p-6">
    <StudenCard/>
    
      <div className="mt-6">
        <a
          href="/students" // Go back to the students list or wherever you want
          className="inline-block px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
        >
          Back to Students List
        </a>
      </div>
    </div>
  );
};

export default Student;
