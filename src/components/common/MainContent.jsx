import React from 'react';
import { showToast, CustomToastContainer } from "../utils/CustomToast";
import Main from '../pages/Main';

const MainContent = () => {
    return (
        <main className="flex-1 p-4">
            <Main/>
            <CustomToastContainer />
        </main>
    );
};

export default MainContent;
