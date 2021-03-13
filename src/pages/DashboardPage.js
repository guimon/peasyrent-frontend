import React from 'react';

import MainContainerReduced from "../components/MainContainerReduced";
import useEnsuredLoggedInUser from "../hooks/useEnsuredLoggedInUser";

function DashboardPage() {
  useEnsuredLoggedInUser();

  return (
    <MainContainerReduced title={"Dashboard"}>
        You're logged in!
    </MainContainerReduced>
  )
}

export default DashboardPage;
