import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function AdditionalColumn({ project, additional_column }) {
  const { data, setData, patch, processing, errors, reset } = useForm({
    additional_column: additional_column.map((item) => ({
      title: item.title,
      type: item.type,
    })),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    patch(route("project.additional-column.update", [project]), {
      " additional_column": data.additional_column,
    });
  };

  const handleTitleChange = (index, value) => {
    // if (
    //   data.additional_column.some(
    //     (item, i) =>
    //       i !== index && item.title.toLowerCase() === value.toLowerCase()
    //   )
    // ) {
    //   errors.additional_column = "Title already exists";
    //   return;
    // }
    const newAdditionalColumn = [...data.additional_column];
    newAdditionalColumn[index].title = value;
    setData("additional_column", newAdditionalColumn);
  };
  const handleTypeChange = (index, value) => {
    const newAdditionalColumn = [...data.additional_column];
    newAdditionalColumn[index].type = value;
    setData("additional_column", newAdditionalColumn);
  };

  //   console.log(additional_column);

  const mappedAdditional_column = data.additional_column.map((item, key) => (
    <div key={key} className=" flex gap-x-4">
      <TextInput
        className="w-[120px]"
        value={item.title}
        onChange={(e) => handleTitleChange(key, e.target.value)}
        errors={errors.additional_column}
      />

      <TextInput
        className="w-[120px]"
        value={item.type}
        onChange={(e) => handleTypeChange(key, e.target.value)}
      />
    </div>
  ));

  return (
    <AuthenticatedLayout>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 ">
          {mappedAdditional_column}
          {errors.additional_column && (
            <div className="text-red-500 text-xs mt-1">
              {errors.additional_column}
            </div>
          )}

          {errors.title && (
            <div className="text-red-500 text-xs mt-1">{errors.title}</div>
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 w-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Additional Column
          </button>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
