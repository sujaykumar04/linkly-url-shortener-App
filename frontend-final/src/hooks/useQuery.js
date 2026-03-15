import { useQuery } from "react-query";
import api from "../api/api";

// Hook to fetch total clicks for all URLs of the logged-in user
export const useFetchTotalClicks = (token, onError) => {
  return useQuery(
    ["url-total-click"],
    async () => {
      const startDate = "2024-01-01";
      const endDate = "2026-12-31";
      return await api.get(
        `/api/urls/totalClicks?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    {
      // Transform the Map<LocalDate, Long> response into array suitable for chart
      select: (data) => {
        const convertToArray = Object.keys(data.data).map((key) => ({
          clickDate: key,
          count: data.data[key],
        }));
        return convertToArray;
      },
      onError,
      staleTime: 5000,
    }
  );
};

// Hook to fetch all shortened URLs for the logged-in user
export const useFetchMyShortUrls = (token, onError) => {
  return useQuery(
    ["my-short-urls"],
    async () => {
      return await api.get("/api/urls/myurls", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    },
    {
      // Sort by createdDate descending (newest first)
      select: (data) => {
        const sortedData = [...data.data].sort(
          (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
        );
        return sortedData;
      },
      onError,
      staleTime: 5000,
    }
  );
};
