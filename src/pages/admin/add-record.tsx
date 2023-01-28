import { addRecord } from "@/services/record";
import { createRecordSchema, type CreateRecord } from "@/types/record";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { type NextPage } from "next";
import { useForm } from "react-hook-form";

const AddRecord: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateRecord>({
    resolver: zodResolver(createRecordSchema),
  });

  const onSubmit = async (data: CreateRecord) => {
    const record = await addRecord(data);
    console.log(record);
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <label htmlFor="office-name">office name</label>
          <input id="office-name" className="border" {...register("office")} />
          <ErrorMessage
            errors={errors}
            name="office"
            as="strong"
            className="font-semibold text-red-700"
          />
        </fieldset>

        <fieldset>
          <label htmlFor="url">url</label>
          <input id="url" className="border" {...register("url")} />
          <ErrorMessage
            errors={errors}
            name="url"
            as="strong"
            className="font-semibold text-red-700"
          />
        </fieldset>
        <button className="disabled:text-gray-400" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default AddRecord;
