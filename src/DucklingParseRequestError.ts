import { AxiosResponse } from "axios";

export class DucklingRequestError extends Error {
    public readonly name = "DucklingRequestError";
    public readonly response: AxiosResponse;

    constructor(response: AxiosResponse) {
        super(
            response.statusText ||
                `Duckling responded with status code: ${response.status}`,
        );
        this.response = response;
    }

    public getStatusCode(): number {
        return this.response.status;
    }
}
