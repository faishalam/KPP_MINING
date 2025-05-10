import useAssetList from "@/api/asset/useAssetList";
import { createContext, useContext } from "react";

const useDashboardHooks = () => {
  const {
    data: dataAssetList,
    isLoading: isLoadingDataAssetList,
    isFetching: isFetchingDataAssetList,
  } = useAssetList({
    params: {
      search: undefined,
      page: 1,
      limit: 10,
    },
  });
  return {
    dataAssetList,
    isLoadingDataAssetList,
    isFetchingDataAssetList,
  };
};

const DashboardContext = createContext<
  ReturnType<typeof useDashboardHooks> | undefined
>(undefined);

export const DashboardProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = useDashboardHooks();
  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error(
      "useDashboardHooks must be used within an DashboardProvider"
    );
  }
  return context;
};

export default useDashboard;
