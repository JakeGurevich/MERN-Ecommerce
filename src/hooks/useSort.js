import { useMemo } from "react";

export const useSort = (data, selectedFilter, searchQuery) => {
  const sortedData = useMemo(() => {
    console.log(selectedFilter);
    if (selectedFilter && data) {
      return [...data].sort((a, b) =>
        a[selectedFilter].localeCompare(b[selectedFilter])
      );
    } else if (data) {
      return data;
    }
  }, [selectedFilter, data]);

  const sortedAndSearchedData = useMemo(() => {
    if (searchQuery) {
      return sortedData.filter((el) =>
        el.name.toLowerCase().includes(searchQuery)
      );
    } else {
      return sortedData;
    }
  }, [searchQuery, sortedData]);
  console.log(sortedAndSearchedData);
  return sortedAndSearchedData;
};
