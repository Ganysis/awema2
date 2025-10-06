import DynamicIcon from "@/helpers/DynamicIcon";
import { markdownify } from "@/lib/utils/textConverter";
import { AnimatePresence, motion } from "framer-motion";
import { marked } from "marked";
import React, { useState } from "react";

const Accordion = ({
  title,
  children,
  hasIcon = true,
}: {
  title: string;
  children: React.ReactNode;
  hasIcon?: boolean;
}) => {
  const [isActive, setActive] = useState(false);
  return (
    <div className={`accordion-motion ${isActive ? "active" : ""}`}>
      <div
        role="button"
        onClick={() => setActive(!isActive)}
        className="flex items-center space-x-3 border-b border-border/50 py-6"
      >
        {hasIcon && (
          <DynamicIcon
            className={`w-4 h-4 transition ${
              isActive && "rotate-90"
            } text-text-dark/50`}
            icon="FaAngleRight"
          />
        )}
        <div
          dangerouslySetInnerHTML={{
            __html: markdownify(marked.parse(title) as string),
          }}
        />
      </div>
      <AnimatePresence mode="sync">
        {isActive && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            transition={{
              duration: 0.4,
              ease: [0.04, 0.62, 0.23, 0.98],
              stiffness: 80,
              damping: 24,
              mass: 0.5,
            }}
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
          >
            <motion.div>{children}</motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
