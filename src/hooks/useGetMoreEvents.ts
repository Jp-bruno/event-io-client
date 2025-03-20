import axiosBase from "../axios/axiosBase";

export default function useGetMoreEvents(currentPage: number, query?: string) {
    return async () => {
        const data = await axiosBase(`/event?limit=4&offset=${currentPage * 4}${query ? `&query=${query}` : ""}`).then((res) => res.data);
        return data;
    };
}
