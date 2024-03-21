import { motion, Variants } from "framer-motion";
import { ReactNode, useState } from "react";
import styles from "./Tool.module.css";

const button: Variants = {
  rest: { scale: 1, filter: "brightness(0.9)" },
  hover: { scale: [1.2, 1], filter: "brightness(1)" },
  pressed: { scale: 0.95, filter: "brightness(1)" },
};

const arrow: Variants = {
  rest: { rotate: 0 },
  hover: { rotate: 0, transition: { duration: 0.4 } },
};

interface ToolProps {
  onPointerDown?: React.PointerEventHandler<HTMLDivElement>;
  title: string;
  disabled: boolean;
  children: ReactNode;
}

const Tool = ({ children, onPointerDown }: ToolProps) => {
  return (
    <div className={styles.tool} onPointerDown={onPointerDown}>
      {children}
    </div>
  );
};

const AnimatedTool = ({ children, onPointerDown }: ToolProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={styles.tool}
      onPointerDown={onPointerDown}
      variants={button}
      initial="rest"
      whileHover="hover"
      whileTap="pressed"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* <motion.svg viewBox="0 0 15 15" width={"100%"} height={'100%'} variants={arrow}>
                <motion.linearGradient
                    id="myGradient"
                    animate={{
                        gradientTransform: `rotate(${hovered ? 180 : 0})`
                    }}
                >
                    <stop offset="5%" stop-color="black" />
                    <stop offset="95%" stop-color="grey" />
                </motion.linearGradient>
                <motion.rect
                    x="0"
                    y="0"
                    stroke-width="5"
                    strokeLinejoin="round"
                    // stroke="black"
                    width="15px"
                    height="15px"
                    fill="url(#myGradient)"
                />
            </motion.svg> */}

      {children}
    </motion.div>
  );
};

export { AnimatedTool, Tool };
