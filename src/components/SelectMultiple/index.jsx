import React, { useState, useRef, useCallback } from "react";

const Select = ({ value = [], onChange, isMultiple = false }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const toggle = useCallback(() => setOpen((prev) => !prev), []);
  const closeDropDown = useCallback(() => setOpen(false), []);

  let options = [
    { value: "yetim", label: "Yetim" },
    { value: "chin yetim", label: "Chin Yetim" },
    { value: "nogiron", label: "Nogiron" },
    { value: "ayollar daftari", label: "Ayollar Daftari" },
    { value: "o'g'il", label: "O'g'il" },
    { value: "qiz", label: "Qiz" },
  ];

  const handleValueChange = useCallback(
    (selected) => {
      if (typeof onChange !== "function") {
        console.warn("onChange function is not provided");
        return;
      }
      if (isMultiple) {
        const isSelected = value.some((item) => item.value === selected.value);
        if (isSelected) {
          onChange(value.filter((item) => item.value !== selected.value));
        } else {
          onChange([...value, selected]);
        }
      } else {
        onChange(selected);
        closeDropDown();
      }
    },
    [isMultiple, onChange, value, closeDropDown]
  );

  const removeItem = useCallback(
    (e, item) => {
      e.stopPropagation();
      if (isMultiple) {
        onChange(value.filter((current) => current.value !== item.value));
      }
    },
    [isMultiple, onChange, value]
  );

  return (
    <div className="relative w-full" ref={ref}>
      <div onClick={toggle} className="border p-2 cursor-pointer">
        {isMultiple ? (
          <div className="flex flex-wrap gap-1">
            {value?.map((item, index) => (
              <div
                key={index}
                className="bg-gray-200 px-2 py-1 rounded flex items-center"
              >
                <span>{item.label}</span>
                <button
                  onClick={(e) => removeItem(e, item)}
                  className="ml-1 cursor-pointer text-red-500"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          <span>{value ? value.label : "Select..."}</span>
        )}
      </div>
      {open && (
        <div className="absolute w-full bg-white border mt-1 p-2 shadow-lg z-10">
          {options.map((option, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleValueChange(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
