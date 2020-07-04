/**
 * A type where it's not clear if T is T or if T is the result type of a Promise
 */
export type MaybeAsync<T> = T | Promise<T>

export function isPromise<T>(t: MaybeAsync<T>): t is Promise<T> {
    return t instanceof Promise
}

/**
 * Takes any sync or async function.
 * - When sync: Returns a function with the result wrapped into a promise.
 * - When async: Returns the same function.
 * @param fn A function (async or sync)
 */
export function wrapInPromise<R, T extends (...args: any) => MaybeAsync<R>>(fn: T): (...args: Parameters<T>) => Promise<R> {
    return async (...args: Parameters<T>): Promise<R> => {
        try {
            // @ts-ignore
            const result: MaybeAsync<R> = fn(...args)
            /** @todo: check if the function call above has any side-effects */
            return await (isPromise(result) ? result : Promise.resolve(result))
        } catch (err) {
            return await Promise.reject(err)
        }
    }
}
