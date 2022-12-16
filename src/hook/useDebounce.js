import { useEffect, useState } from "react";

function useDebounce(input, delay) {
    const [search, setSearch] = useState(input);
    useEffect(() => {
        const debounce = setTimeout(() => setSearch(input), delay);
        return () => clearTimeout(debounce);
    }, [input]);
    return search;
}

export default useDebounce;
