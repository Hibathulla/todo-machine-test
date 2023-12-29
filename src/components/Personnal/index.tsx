import React, { useState } from "react";
import AddField from "../common/Add/AddField";
import PersonnalTodoList from "./PersonnalTodoList";

const Personnal = () => {
  const [refetch, setRefetch] = useState(false);
  return (
    <div className="my-10 space-y-10 mx-auto max-w-6xl px-10">
      <AddField setRefetch={setRefetch} /> {/* add a todo */}
      <PersonnalTodoList refetch={refetch} setRefetch={setRefetch} />
    </div>
  );
};

export default Personnal;
