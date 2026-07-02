import { useEffect, useState } from "react";

export const useMounted = function () {
  const [mounted, setMounted] = useState(false);
  useEffect(
    function () {
      setMounted(true);
    },
    [mounted],
  );

  return mounted;
};
