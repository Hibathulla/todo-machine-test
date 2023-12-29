"use client";
import { useFetch } from "@/hooks/useFetch";
import React, { FormEvent, useState } from "react";
import { toast } from "sonner";

const UpdateField: React.FC<{
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  setDoubleClick: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}> = ({ setRefetch, id, setDoubleClick }) => {
  const [input, setInput] = useState("");
  const { mutateRequest } = useFetch(
    `/todos/${id}`,
    { method: "PATCH" },
    { start: false }
  );

  //todo api submit function
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      title: input,
      completed: false,
    };
    try {
      const response = await mutateRequest({ postData: data });
      if (response) {
        console.log(response, "res");
        toast.success("Todo updated");
        setDoubleClick((prev) => !prev);
        setInput("");
        setRefetch((prev) => !prev);
      }
    } catch (err) {
      console.log(err, "err");
    }
  };
  return (
    <form
      onSubmit={submitHandler}
      className="bg-secondary rounded-3xl flex items-center"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="bg-secondary text-[#323232] text-[30px] pl-1 rounded-3xl outline-none w-full"
        placeholder="What do you need to do?"
      />
    </form>
  );
};

export default UpdateField;
