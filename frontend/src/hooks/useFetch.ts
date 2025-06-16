import { chatApi } from "@/libs/axios";
import { AxiosError, type AxiosResponse } from "axios";
import { toast } from "sonner";

export const useFetch = async (
    method: "post" | "get" | "put" | "delete",
    url: string,
    data?: any,
    setLoading?: (value: boolean) => void,
    config?: any,
    customApi = chatApi
): Promise<AxiosResponse | null> => {

    setLoading?.(true);

    try {
        let response: AxiosResponse;

        response = await customApi({ method, url, data, ...config });

        toast.success(response?.data?.message || "Success");

        return response;
    } catch (error) {
        console.log(error);

        if (error instanceof AxiosError) {
            const message =
                error.response?.data?.message || error.message || "Request failed";
            toast.error(message);
            return error.response as AxiosResponse;
        }

        toast.error("Something went wrong");
        return null;
    } finally {
        setLoading?.(false);
    }
}
