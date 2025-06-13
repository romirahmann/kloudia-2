/* eslint-disable no-unused-vars */
import React from "react";

export const Input = React.forwardRef(
  (
    {
      name,
      onChange,
      value,
      type = "text",
      placeholder = "",
      maxLength = "",
      className = "",
      onKeyDown,
      label = "",
      id = "",
      ...rest
    },
    ref
  ) => {
    return (
      <>
        <label htmlFor={id} className="text-sm">
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          type={type}
          name={name}
          value={value}
          maxLength={maxLength ? maxLength : 255}
          onChange={(e) => onChange(e)}
          placeholder={`${placeholder} ...`}
          onKeyDown={onKeyDown}
          className={`dark:text-gray-50 px-2 py-3 border w-full bg-transparent rounded-xl text-sm md:text-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary border-gray-300 placeholder:lg:text-sm placeholder:text-xs ${className}`}
          {...rest}
        />
      </>
    );
  }
);
