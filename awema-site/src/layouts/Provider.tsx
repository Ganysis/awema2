import AOS from "aos";
import React, { useEffect } from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
    });
  }, []);
  return children;
};

export default Provider;
