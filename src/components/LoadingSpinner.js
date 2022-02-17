import { Circles } from  'react-loader-spinner';
import React from "react";
import '../styles/loading.css';

const LoadingSpinner = () => {

  return (
      <div className='loader-wrapper'>
          <Circles color="#06181e"/>
          <span>Loading</span>
      </div>
  );
};

export default LoadingSpinner;

