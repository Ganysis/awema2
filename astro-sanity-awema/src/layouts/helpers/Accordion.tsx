import { markdownify } from "@/lib/utils/textConverter";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

const Accordion = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [isActive, setActive] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setActive(!isActive)}
        className="btn btn-primary"
        dangerouslySetInnerHTML={{ __html: markdownify(title) }}
      />
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="mt-8"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            transition={{ duration: 0.3, ease: [0.5, 0.12, 0.23, 0.98] }}
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
