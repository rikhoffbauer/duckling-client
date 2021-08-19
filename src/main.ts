import { DucklingClient } from "./DucklingClient";

const client = DucklingClient({
    dims: ["quantity", "volume", "numeral"],
    locale: "nl_NL",
});

(async () =>
    console.log(
        await client.parse({
            text: "Ik heb hier 300 liter limonade siroop liggen.",
        }),
    ))();
