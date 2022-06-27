import { useRequest } from "ahooks";
import * as componentService from "./service";
import { ComponentModel } from "./typing";

export const useCompList = () => {
  const { data: components, loading } = useRequest(
    componentService.findComponents
  );

  return {
    components: (components as ComponentModel[]) || [],
    loading,
  };
};
