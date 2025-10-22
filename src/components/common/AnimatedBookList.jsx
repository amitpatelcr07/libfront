import { motion } from "framer-motion";

const AnimatedBookList = ({ recentBooks }) => {
  return (
    <ul className="space-y-2">
      {recentBooks.map((book, index) => (
        <motion.li
          key={book.title + index}
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
          <span
            className={`font-medium ${
              book.isIssued ? "text-red-500" : "text-green-500"
            }`}
          >
            {book.title} – {book.isIssued ? "Issued" : "Available"}
          </span>
        </motion.li>
      ))}
    </ul>
  );
};

export default AnimatedBookList;
