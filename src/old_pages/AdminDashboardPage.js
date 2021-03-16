import React from 'react';

import MainContainerReduced from "../components/MainContainerReduced";
import useEnsuredLoggedInUser from "../hooks/useEnsuredLoggedInUser";
import useEnsuredUserIsAdmin from "../hooks/useEnsuredUserIsAdmin";

function AdminDashboardPage() {
  useEnsuredLoggedInUser();
  useEnsuredUserIsAdmin();

  return (
    <MainContainerReduced title={"Admin"}>
        Hi there!
    </MainContainerReduced>
  )
}

export default AdminDashboardPage;
