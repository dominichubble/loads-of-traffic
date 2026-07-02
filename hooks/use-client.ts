import { useEffect, useState } from "react";

export const useClient = function () {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient;
};
