import { motion } from "framer-motion";

const AnimatedStudenList = ({ recengStudents }) => {
  return (
    <ul className="space-y-2">
      {recengStudents.map((student, index) => (
        <motion.li
          key={student.name + index}
          className="border-b pb-2"
          animate={{
            x: [0, 5, 0, -5, 0], // left-right motion
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.01, // small delay per item
          }}
        >
          <span className={`font-medium ${"text-green-500"}`}>
            {student.name} -Joined Recently
            {/* {student.name} – {book.isIssued ? "Issued" : "Available"} */}
          </span>
        </motion.li>
      ))}
    </ul>
  );
};

export default AnimatedStudenList;
