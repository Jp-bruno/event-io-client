import axiosBase from "../axios/axiosBase";

export default function useGetMoreEvents(currentPage: number) {
    return async () => {
        const data = await axiosBase(`/event?limit=4&offset=${currentPage * 4}`).then(res => res.data);
        return data
    };
}
