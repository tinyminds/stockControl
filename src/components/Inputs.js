import React, { Component } from "react";

export const Inputs  = (props) => {
    return (
             <div className="input-field">
                {props.title?props.title:""}
                <input name={props.name}
                    defaultValue={props.defaultValue}
                    value={props.value}
                    onChange={props.onChange}
                    id={props.name}
                    type={props.type}
                    max={props.max}
                    min={props.min}
                /> 
                {props.label?(<label htmlFor={props.name}>{props.label}</label>):("")}
              </div>
            );
  };