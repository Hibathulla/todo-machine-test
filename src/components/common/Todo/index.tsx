import { DeleteIcon } from "@/assets";
import Checkbox from "@/components/UI/Checkbox";
import { ITodo } from "@/types/todo";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import cn from "classnames";
import { useFetch } from "@/hooks/useFetch";
import { toast } from "sonner";
import UpdateField from "../Update/UpdateField";

const Todo: React.FC<{
  data: ITodo;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ data, setRefetch }) => {
  const [check, setCheck] = useState(false);
  const [doubleClick, setDoubleClick] = useState(false);
  const [id, setId] = useState<number | null>(null);

  const deleteApi = useFetch(
    `/todos/${data?.id}`,
    { method: "DELETE" },
    { start: false }
  );

  const doubleClickHandler = () => {
    setDoubleClick((prev) => !prev);
  };

  //checkbox handler
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    if (checked) {
      setCheck(checked);
      setId(data?.id);
    } else {
      setCheck(checked);
      setId(null);
    }
  };
  console.log(check, "check");

  // delete todo function
  const deleteHandler = async () => {
    const response = await deleteApi.deleteRequest();
    if (response) {
      console.log(response);
      setRefetch((prev) => !prev);
      toast.success("Todo deleted");
    }
  };

  return (
    <div className="flex gap-3 py-3">
      <Checkbox onChange={onChangeHandler} />
      {!doubleClick ? (
        <p
          onDoubleClick={doubleClickHandler} //when double click, state changes
          className={cn("text-[#323232] text-[32px]", {
            "line-through text-opacity-20": data?.id === id,
          })}
        >
          {data?.title}
        </p>
      ) : (
        <UpdateField
          setDoubleClick={setDoubleClick}
          id={data?.id}
          setRefetch={setRefetch}
        />
      )}
      <button onClick={deleteHandler} className="ml-auto">
        <Image src={DeleteIcon} alt="delete bin" />
      </button>
    </div>
  );
};

export default Todo;
