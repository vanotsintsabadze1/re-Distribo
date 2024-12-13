import Navigation from "./navigation";
import { motion } from "framer-motion";

const animationConfig = {
  initial: { x: "-150%" },
  animate: { x: 0 },
};

interface Props {
  setBurgerMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileSidebar({ setBurgerMenu }: Props) {
  return (
    <motion.div
      variants={animationConfig}
      initial="initial"
      animate="animate"
      exit="initial"
      transition={{ ease: "easeInOut", duration: 0.3 }}
      className="fixed top-0 left-0 z-40 p-4 bg-secondary h-dvh w-52"
    >
      <Navigation setBurgerMenu={setBurgerMenu} />
    </motion.div>
  );
}
