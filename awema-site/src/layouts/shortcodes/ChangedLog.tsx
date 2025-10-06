import { markdownify } from "@/lib/utils/textConverter";
import React from "react";

const ChangedLog = ({
  className,
  children,
  value,
}: {
  className: string;
  children: React.ReactNode;
  value: string;
}) => {
  return (
    <div className={className}>
      <span
        className={`badge ${value}`}
        dangerouslySetInnerHTML={{ __html: markdownify(value) }}
      />
      {children}
    </div>
  );
};

export default ChangedLog;
