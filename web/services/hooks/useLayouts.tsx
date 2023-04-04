import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { UIFilterRow } from "../../components/shared/themed/themedAdvancedFilters";
import { ColumnFormatted } from "../../components/shared/themed/themedTableV3";
import { Database, Json } from "../../supabase/database.types";
import { FilterNode } from "../lib/filters/filterDefs";
export interface SaveLayoutInputs {
  columns: ColumnFormatted[];
  advancedFilters: UIFilterRow[];
  timeFilter: FilterNode;
}
export const useLayouts = () => {
  const client = useSupabaseClient<Database>();
  const user = useUser();

  return useQuery({
    queryKey: ["helicone-saved-layouts"],
    queryFn: async () => {
      return {
        layouts: await client.from("layout").select("*"),
        setLayouts: async ({
          columns,
          advancedFilters,
          timeFilter,
        }: SaveLayoutInputs) => {
          client.from("layout").insert({
            user_id: user!.id,
            columns: columns,
            filters: { advancedFilters, timeFilter } as unknown as Json,
            name: "test",
          });
        },
      };
    },
    refetchOnWindowFocus: false,
  });
};
