export function camelCaseToText(text: string): string {
    return text
        .replace(/[A-Z]/g, (v, i) => i === 0 ? v.toUpperCase() : " " + v.toLowerCase())
        .replace(/[a-z]/, (v, i) => i === 0 ? v.toUpperCase() : v)
}

export function snakeCaseToText(text: string): string {
    return text
        .replace(/_/g, () => " ")
        .replace(/[a-z]/, (v, i) => i === 0 ? v.toUpperCase() : v)
}

export function convertFunctionNameToText(functionName: string): string {
    return snakeCaseToText(camelCaseToText(functionName))
}
