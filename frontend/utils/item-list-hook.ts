import axios from "axios";
import { useAtomValue, useSetAtom } from "jotai";
import { loaderOpenState, userAuthTokenAtom } from "./global-atom";
import { useQuery } from "react-query";
import { GroceryItemModel } from "./grocery-item-model";

export function useGroceryItemList() {
  const token = useAtomValue(userAuthTokenAtom);
  const setLoader = useSetAtom(loaderOpenState);

  const { data, refetch } = useQuery(
    "groceryItemList",
    () => {
      setLoader(true);
      return axios.get<GroceryItemModel[]>(
        `${process.env.NEXT_PUBLIC_API}/groceries/list`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    {
      enabled: !!token,
      onSuccess: () => {
        setLoader(false);
      },
      refetchOnWindowFocus: false,
    }
  );

  return { list: data?.data, refetch };
}
