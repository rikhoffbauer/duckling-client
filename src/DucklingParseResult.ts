export interface DucklingParseResult {
    body: string;
    start: number;
    end: number;
    dim: string;
    latent: boolean;
    value: DuckingParseResultValue;
}

export interface DuckingParseResultValue {
    value?: number | string;
    type?: string;
    issuer?: string;
    minute?: string;
    normalized?: { value?: number; unit?: string };
    values?: DuckingParseResultValue[];
    grain?: string;
    domain?: string;
    product?: string;
    unit?: string;
}
