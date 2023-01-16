import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected(props) {
    let Cmp = props.Cmp
    const navigate = useNavigate();
    useEffect(() =>
    {
        if(!localStorage.getItem('token'))
        {
          navigate('/')
        }
    }, [])

    return (
        <div>
          
        </div>
    )
}

export default Protected