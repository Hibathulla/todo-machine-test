"use client";
import { useFetch } from "@/hooks/useFetch";
import React, { FormEvent, useState } from "react";
import { toast } from "sonner";

const AddField: React.FC<{
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setRefetch }) => {
  const [input, setInput] = useState("");

  //todo post api
  const { mutateRequest } = useFetch(
    "/todos",
    { method: "POST" },
    { start: false }
  );

  //api submit function
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      title: input,
      completed: false,
    };
    if (input.length) {
      try {
        const response = await mutateRequest({ postData: data });
        if (response) {
          console.log(response, "res");
          toast.success("Todo added");
          setInput("");
          setRefetch((prev) => !prev);
        }
      } catch (err) {
        console.log(err, "err");
      }
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
        className="bg-secondary py-4 rounded-3xl outline-none text-[32px] w-full px-5"
        placeholder="What do you need to do?"
      />
      <button className="bg-[#76B7CD] text-xl font-semibold self-stretch rounded-tr-3xl rounded-br-3xl text-white px-5">
        ADD
      </button>
    </form>
  );
};

export default AddField;
