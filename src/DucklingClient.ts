import axios, { AxiosInstance } from "axios";

import { DEFAULT_ENDPOINT, DEFAULT_LOCALE } from "./constants";
import { DucklingRequestError } from "./DucklingParseRequestError";
import { DucklingParseResult } from "./DucklingParseResult";

export interface DucklingClient {
    axios: AxiosInstance;

    parse(options: ParseOptions): Promise<DucklingParseResult[]>;
}

export interface DucklingClientOptions {
    endpoint?: string;
    locale?: string;
    dims?: (string | DucklingDimension)[];
}

export interface ParseOptions {
    text: string;
    locale?: string;
    dims?: (string | DucklingDimension)[];
}

// TODO: implement strict locale
//
// export enum DucklingRegion {
//     AU = "AU",
//     BE = "BE",
//     BZ = "BZ",
//     CL = "CL",
//     CN = "CN",
//     CO = "CO",
//     EG = "EG",
//     GB = "GB",
//     HK = "HK",
//     IE = "IE",
//     IN = "IN",
//     JM = "JM",
//     MO = "MO",
//     MX = "MX",
//     NZ = "NZ",
//     PE = "PE",
//     PH = "PH",
//     TT = "TT",
//     TW = "TW",
//     US = "US",
//     VE = "VE",
// }
//
// export enum DucklingLocale {
//     AF = "AF",
//     AR = "AR",
//     BG = "BG",
//     BN = "BN",
//     CA = "CA",
//     CS = "CS",
//     DA = "DA",
//     DE = "DE",
//     EL = "EL",
//     EN = "EN",
//     ES = "ES",
//     ET = "ET",
//     FA = "FA",
//     FI = "FI",
//     FR = "FR",
//     GA = "GA",
//     HE = "HE",
//     HI = "HI",
//     HR = "HR",
//     HU = "HU",
//     ID = "ID",
//     IS = "IS",
//     IT = "IT",
//     JA = "JA",
//     KA = "KA",
//     KN = "KN",
//     KM = "KM",
//     KO = "KO",
//     LO = "LO",
//     ML = "ML",
//     MN = "MN",
//     MY = "MY",
//     NB = "NB",
//     NE = "NE",
//     NL = "NL",
//     PL = "PL",
//     PT = "PT",
//     RO = "RO",
//     RU = "RU",
//     SK = "SK",
//     SV = "SV",
//     SW = "SW",
//     TA = "TA",
//     TE = "TE",
//     TH = "TH",
//     TR = "TR",
//     UK = "UK",
//     VI = "VI",
//     ZH = "ZH",
// }

export enum DucklingDimension {
    AmountOfMoney = "amount-of-money",
    CreditCardNumber = "credit-card-number",
    Distance = "distance",
    Email = "email",
    Numeral = "numeral",
    Ordinal = "ordinal",
    PhoneNumber = "phone-number",
    Quantity = "quantity",
    Temperature = "temperature",
    Time = "time",
    Url = "url",
    Volume = "volume",
}

/**
 * Creates a {DucklingClient}
 * @param {string|undefined} [endpoint=http://0.0.0.0:8000] - The url duckling is being served on.
 * @param {string|undefined} [defaultLocale=en_US] - The default locale to use when parsing text.
 * @param {(DucklingDimension|string)[]|undefined} [defaultDims=[]] - The default dimensions to look for when parsing text.
 * @returns {DucklingClient}
 * @constructor
 */
export function DucklingClient({
    endpoint = DEFAULT_ENDPOINT,
    locale: defaultLocale = DEFAULT_LOCALE,
    dims: defaultDims = [],
}: DucklingClientOptions = {}) {
    const axios = configureAxios(endpoint);
    const client: DucklingClient = Object.freeze({ axios, parse });

    return client;

    async function parse({
        dims = defaultDims,
        locale = defaultLocale,
        text,
    }: ParseOptions) {
        const body = getParseRequestBody({ locale, dims, text });
        const response = await axios.post("/parse", body);

        if (response.status !== 200) {
            throw new DucklingRequestError(response);
        }

        return response.data;
    }
}

function getParseRequestBody({
    text,
    dims,
    locale,
}: Required<ParseOptions> & { locale: string }) {
    return [
        `locale=${locale}`,
        `text="${text}`,
        `dims="${JSON.stringify(dims)}"`,
    ].join("&");
}

function configureAxios(endpoint: string) {
    return axios.create({
        baseURL: endpoint,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
}
