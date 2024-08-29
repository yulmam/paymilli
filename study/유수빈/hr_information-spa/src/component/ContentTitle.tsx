import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const HOME_TITLE = "Great People";
const SIGNUP_TITLE = "Sign up, Great People";

const ContentTitle = () => {
  const pageParams = useLocation();
  const [title, setTitle] = useState("");
  console.log(pageParams.pathname);

  useEffect(() => {
    const curTitle = pageParams.pathname === "/" ? HOME_TITLE : SIGNUP_TITLE;
    setTitle(curTitle);
  }, [pageParams]);

  return (
    <h1
      className="text-center"
      style={{ fontWeight: 700, fontSize: 100, marginBottom: 30 }}
    >
      {title}
    </h1>
  );
};

export default ContentTitle;
