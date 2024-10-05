export const notEmpty = <T>(value: T|null|undefined): value is T  => {
    return value !== null && value !== undefined;
}


export const getCombinations = <T>(arr: T[]): [T, T][] => {
    return arr.flatMap((el, idx) => {
        return arr.slice(idx).map((w): [T, T] => [el, w]);
    });
}; 