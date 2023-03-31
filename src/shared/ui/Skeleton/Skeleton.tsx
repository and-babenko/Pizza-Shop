import React from "react";
import styles from "./Skeleton.module.scss";
import ContentLoader from "react-content-loader";

const Skeleton: React.FC = () => {
  return (
    <ContentLoader
      speed={2}
      width={280}
      height={465}
      viewBox="0 0 260 465"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="127" cy="129" r="120" />
      <rect x="0" y="265" rx="10" ry="10" width="240" height="26" />
      <rect x="0" y="310" rx="10" ry="10" width="240" height="88" />
      <rect x="0" y="426" rx="10" ry="10" width="80" height="27" />
      <rect x="106" y="418" rx="10" ry="10" width="135" height="45" />
    </ContentLoader>
  );
};

export default Skeleton;
