import axios from "axios";
import { useAtomValue, useSetAtom } from "jotai";
import { globalLoaderAtom, userAuthTokenAtom } from "./global-atom";
import { UserModel } from "./user-model";

export function useGroceryItemHook() {
  const setLoader = useSetAtom(globalLoaderAtom);
  const userToken = useAtomValue(userAuthTokenAtom);

  async function deleteItem(userId: string) {
    setLoader(true);
    try {
      const data = await axios.delete(
        `${process.env.NEXT_PUBLIC_API}/groceries/delete/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setLoader(false);
      alert("Item deleted successfully!");
      return { data };
    } catch (error: any) {
      alert(error?.response?.data?.error ?? "Error deleting item");
      setLoader(false);
      return { error };
    }
  }

  async function editItem(
    userId: string,
    userData: Partial<UserModel>,
    callBack?: Function
  ) {
    setLoader(true);
    try {
      const data = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/groceries/edit/${userId}`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setLoader(false);
      alert("Item updated successfully!");
      callBack?.();
      return { data };
    } catch (error: any) {
      setLoader(false);
      alert(error?.response?.data?.error ?? "Error editing item");
      return { error };
    }
  }

  async function addItem(userData: any, callBack?: Function) {
    setLoader(true);
    try {
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/groceries/add`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setLoader(false);
      callBack?.();
      alert("Item added successfully!");

      return { data, error: null };
    } catch (error: any) {
      setLoader(false);
      console.error(error?.response?.data?.error, error);
      alert(error?.response?.data?.error ?? "Error adding Item");
      return { error, data: null };
    }
  }

  return { editItem, deleteItem, addItem };
}
