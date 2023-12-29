import React, { useState } from "react";
import Todo from "../common/Todo";
import { useFetch } from "@/hooks/useFetch";
import { ITodo } from "@/types/todo";

const PersonnalTodoList: React.FC<{
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: boolean;
}> = ({ refetch, setRefetch }) => {
  //fetch todo from api
  const { data } = useFetch<ITodo[]>(
    "/todos",
    { method: "GET" },
    { start: true, dep: refetch }
  );

  return (
    <div className="bg-secondary rounded-3xl px-5">
      {data?.map((val) => {
        return <Todo key={val?.id} data={val} setRefetch={setRefetch} />;
      })}
    </div>
  );
};

export default PersonnalTodoList;
