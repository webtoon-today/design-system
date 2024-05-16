import React from 'react';
import "./LoadingCircle.css";

const LoadingCircle = ({show}) => {
    return <div className={`LoadingCircle ${show?'Show':''}`}/>
}

export default LoadingCircle;