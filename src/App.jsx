import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RoutePath } from 'common/enums/enumConstant';
import Page404 from 'pages/page404/index';
import TabLayout from 'layouts/TabLayout/TabLayout';
import UserProfile from 'pages/UserProfile/UserProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TabLayout />} />
        <Route path={RoutePath.USER_PROFILE} element={<UserProfile />} />
        <Route path={RoutePath.PAGE_404} element={<Page404 />} />
        {/* Navigate to '/404' when user enters unknown path */}
        <Route path="*" element={<Navigate to={RoutePath.PAGE_404} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
