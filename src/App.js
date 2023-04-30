import React from 'react';
import styles from './style';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SummarizationTool } from "./pages";
import { Sidebar } from "./components";

const App = () => {
  return (
    <div className='md:p-[24px] p-[16px]'>
      <BrowserRouter>
        <Sidebar>
          <Routes>
            <Route path='/' element={<SummarizationTool />} />
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </div>
  )
}

export default App