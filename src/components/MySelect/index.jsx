import { useField } from "formik";
import React from "react";

const MySelect = ({ label, tab, innerRef, options, ...props }) => {
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
      <select
        className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300 p-3 rounded-lg focus:shadow-md focus:border-blue-300"
        ref={innerRef}
        {...field}
        {...props}
      >
        <option value="">Tanlang</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MySelect;