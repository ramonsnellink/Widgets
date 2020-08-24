import React from "react";

const Link = ({ href, className, children }) => {
  const onClick = (e) => {
    // fix the ctrl+click behaviour to open a new tab
    if (e.metaKey || e.ctrlKey) {
      return;
    }
    e.preventDefault();
    window.history.pushState({}, "", href); //change the link without refreshing

    const navEvent = new PopStateEvent("popstate"); // ?
    window.dispatchEvent(navEvent); // ?
  };
  return (
    <a onClick={onClick} href={href} className={className}>
      {children}
    </a>
  );
};

export default Link;
