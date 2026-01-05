// These are internal constants never export them.
export function generateOwner(uniqueKey?: string | number): symbol {
    return Symbol(uniqueKey ?? Date.now());
}