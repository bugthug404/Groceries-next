import { useGroceryItemHook } from "@/utils/item-hook";
import React, { useEffect } from "react";
import Input from "../input";
import LabeledInput from "../labeled-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { groceryItemSchema } from "./grocery-item-schema";
import Button from "../button";
import { GroceryItemModel } from "@/utils/grocery-item-model";

export default function EditItemModal(props: {
  editId?: string;
  setEditId: React.Dispatch<React.SetStateAction<string | undefined>>;
  itemList?: {
    list: GroceryItemModel[] | undefined;
    refetch: Function;
  };
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GroceryItemModel>({
    resolver: zodResolver(groceryItemSchema),
  });
  const itemHook = useGroceryItemHook();

  const onSubmit = (data: any) => {
    props.editId &&
      itemHook.editItem(
        props.editId,
        { ...data, _id: props.editId },
        props.itemList?.refetch
      );
  };

  const item = props.itemList?.list?.find((i) => i._id === props.editId);

  useEffect(() => {
    reset({
      ...item,
      price: item?.price.toString(),
      quantityInStock: item?.quantityInStock.toString(),
    });
  }, [item]);

  return (
    <>
      {props.editId && (
        <div className="fixed top-0 left-0 bg-black/50 font-bold flex flex-col space-y-4 justify-center items-center h-screen w-full">
          <div className="max-w-sm w-full bg-gray-900 flex flex-col p-4 rounded-xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col space-y-2  w-full ">
                {/* convert above input to Input */}
                <div className="text-center text-3xl font-semibold mb-10">
                  Edit User
                </div>
                <LabeledInput
                  label="Name"
                  register={{
                    ...register("name"),
                  }}
                  error={errors.name?.message}
                />
                <LabeledInput
                  label="Category"
                  register={{
                    ...register("category"),
                  }}
                  error={errors.category?.message}
                />
                <LabeledInput
                  label="Price"
                  register={{
                    ...register("price"),
                  }}
                  error={errors.price?.message}
                />
                <LabeledInput
                  label="Stock Left"
                  register={{
                    ...register("quantityInStock"),
                  }}
                  error={errors.quantityInStock?.message}
                />
              </div>

              <div className="flex gap-x-4 pt-2">
                <Button type="submit" className="bg-black">
                  Submit
                </Button>
                <Button
                  className="bg-black"
                  onClick={() => {
                    props.setEditId(undefined);
                  }}
                >
                  close
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
