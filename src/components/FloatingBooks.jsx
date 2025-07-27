import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FloatingBooks = () => {
  const [mouseX, setMouseX] = useState(0);
  const [floatY, setFloatY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouseX((e.clientX / window.innerWidth) * 2 - 1); // -1 to 1
    };
    window.addEventListener("mousemove", handleMouseMove);

    let frameId;
    const animate = () => {
      const time = Date.now() / 1000;
      setFloatY(Math.sin(time * 1) * 10); // 1.5x speed, 15px amplitude
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  const books = [
    { x: "20%", y: "15%", size: "3rem", color: "#3b82f6", speed: 2 },
    { x: "70%", y: "1%", size: "5rem", color: "#8b5cf6", speed: 1.5 },
    { x: "15%", y: "75%", size: "4rem", color: "#10b981", speed: 1.5 },
    { x: "80%", y: "85%", size: "5rem", color: "#f59e0b", speed: 2 },
  ];

  return (
    <div className="absolute hidden lg:block inset-0 pointer-events-none -z-8 overflow-hidden">
      {books.map((book, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: book.x,
            top: book.y,
            color: book.color,
          }}
          animate={{
            x: mouseX * 10 * book.speed,
            y: floatY * book.speed,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <BookOpen
            style={{
              width: book.size,
              height: book.size,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingBooks;
