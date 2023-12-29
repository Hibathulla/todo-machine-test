import React, { ChangeEvent, ChangeEventHandler } from "react";

const Checkbox: React.FC<{
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}> = ({ onChange }) => {
  return (
    <div className="flex gap-2 py-2">
      <input
        type="checkbox"
        id="some_id"
        onChange={onChange}
        className="
relative peer shrink-0 cursor-pointer
appearance-none w-4 h-4 border-2 border-primary rounded-full bg-white
mt-1 checked:border-2 p-3.5
focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-blue-100
disabled:border-steel-400 disabled:bg-steel-400
"
      />
      <svg
        className="
     absolute 
     w-5 h-5 mt-2.5 ml-1.5
     hidden peer-checked:flex
     pointer-events-none items-center justify-center"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#D98326"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
  );
};

export default Checkbox;
