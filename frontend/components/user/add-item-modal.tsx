import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useGroceryItemHook } from "@/utils/item-hook";
import LabeledInput from "../labeled-input";
import Button from "../button";
import { groceryItemSchema } from "./grocery-item-schema";
import { GroceryItemModel } from "@/utils/grocery-item-model";

export default function AddUser(props: {
  show?: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: Function;
}) {
  const itemHook = useGroceryItemHook();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GroceryItemModel>({
    resolver: zodResolver(groceryItemSchema),
  });

  const onSubmit = (data: any) => {
    props.show && itemHook.addItem(data, props.refetch);
  };

  return (
    <>
      {props.show && (
        <div className="fixed top-0 left-0 bg-black/50 font-bold flex flex-col space-y-4 h-screen w-full p-10 overflow-auto">
          <div className="max-w-sm w-full bg-gray-800 flex flex-col p-4 rounded-xl m-auto">
            <div className="flex flex-col space-y-2   w-full ">
              {/* convert above input to Input */}
              <div className="text-center text-3xl font-semibold mb-5">
                Create New Item
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                <div className="mt-4 flex justify-evenly">
                  <Button type="submit">Submit</Button>
                  <Button onClick={() => props.setShow(false)}>Close</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
