import { useQuery } from "@tanstack/react-query";
import { getAccounts } from "../services/accountServices";
import { getCategories } from "../services/categoryService";

export function useAccounts(){
    return useQuery({ queryKey: ["accounts"], queryFn: getAccounts});
}

export function useCategories(){
    return useQuery({ queryKey: ["categories"], queryFn: getCategories});
}