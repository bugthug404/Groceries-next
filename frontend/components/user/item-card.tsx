import React from "react";
import Button from "../button";
import { useGroceryItemHook } from "@/utils/item-hook";
import { GroceryItemModel } from "@/utils/grocery-item-model";

export default function ItemCard({
  item,
  setEditId,
}: {
  item: GroceryItemModel;
  setEditId: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const itemHook = useGroceryItemHook();

  return (
    <div className="w-full max-w-sm py-2 pl-3 pr-2 space-y-2 border border-white/50 bg-gray-400/20 rounded-xl">
      {/* <Loader /> */}
      <div className="text-xl font-bold text-left">{item?.name}</div>
      <div className="text-left">Category: {item?.category}</div>
      <div className="text-left">Price: {item?.price}</div>
      <div className="text-left">Available Stock: {item?.quantityInStock}</div>
      <div className={`flex gap-4 `}>
        <Button
          onClick={() => {
            setEditId(item._id);
          }}
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this item?")) {
              itemHook.deleteItem(item._id!.toString());
            }
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
