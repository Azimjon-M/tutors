import { useField } from "formik";
import React from "react";

const MyTextInput = ({ label, tab, innerRef, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label
        htmlFor={props.id || props.name}
        className="block mb-2 font-medium text-gray-700"
      >
        {label}
        <span className="text-red-500"> {tab}</span>
      </label>
      <input
        className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
        ref={innerRef}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (<div className="error">{meta.error}</div>) : null}
    </div>
  );
};

export default MyTextInput;
