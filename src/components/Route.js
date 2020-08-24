import { useEffect, useState } from "react";

const Route = ({ path, children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  useEffect(() => {
    const onLocationChange = () => {
      // set the currentPath to the pathname
      // we only do this because we want to re-render the component
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", onLocationChange);

    //Cleanup function
    return () => {
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []); // only run once
  // if the current path is equal to the path prop, then render the child component.
  return currentPath === path ? children : null;
};

export default Route;
