import React, { useEffect } from "react";
import ItemCard from "@/components/user/item-card";
import AddUser from "@/components/user/add-item-modal";
import { useAuth } from "@/utils/auth-hook";
import { useGroceryItemList } from "@/utils/item-list-hook";
import Button from "@/components/button";
import EditItemModal from "../components/user/edit-item-modal";

export default function HomePage() {
  const auth = useAuth();
  const groceryList = useGroceryItemList();
  const [show, setShow] = React.useState<boolean>(false);
  const [editId, setEditId] = React.useState<string | undefined>();

  return (
    <main className="flex flex-col w-full space-y-4 overflow-auto bg-background text-onBackground p-4">
      <AddUser show={show} setShow={setShow} refetch={groceryList.refetch} />
      <EditItemModal
        editId={editId}
        setEditId={setEditId}
        itemList={groceryList}
      />
      <div className="flex justify-center gap-4">
        <div className="max-w-sm w-full space-y-4 flex flex-col items-center">
          <div>
            Logged In User:{" "}
            <span className="font-bold">
              {auth?.user?.firstName} {auth?.user?.lastName}
            </span>
          </div>
          <p>{auth?.user?.email}</p>
          <div className="flex gap-4">
            <Button
              onClick={() => {
                setShow(true);
              }}
            >
              add Item
            </Button>
            <Button
              onClick={() => {
                auth.logout();
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center pt-20 space-y-5 text-center ">
        {groceryList.list?.map((item, index) => {
          return <ItemCard item={item} key={index} setEditId={setEditId} />;
        })}
      </div>
    </main>
  );
}
