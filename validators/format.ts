export const formatUserName = (name: string) => {
    if (name.length > 12) {
        alert("12자 이하로 입력하시오.")
        return name.slice(0, 12)
    } else return name
}

export const formatTag = (text: string) => {
    if (text.length > 10) {
        alert("10자 이내로 입력하시오.")
        return text.slice(0, 10)
    } else return text
}

export const formatMemo = (text: string) => {
    if (text.length > 100) {

        alert("100자 이내로 입력하시오.")
        return text.slice(0, 100)
    } else return text
}

export const formatDate = (date: string) => {
    // TODO: handle exception that the input '2020-1-21' is not available, just available for '2020-12-1;
    const delimiter = '-';
    const split_date = date.split(delimiter);
    const filtered_date = split_date.map(d => d.replace(/[^0-9]/g, ''));

    const len = filtered_date.length
    if (len === 1) {
        const str = filtered_date[0];

        if (str.length > 4) return str.slice(0, 4) + delimiter + str.slice(4, 5); // over
        else return str // right
    } else if (len === 2) {
        const str = filtered_date[0];
        const mid = filtered_date[1];
        const midInt = parseInt(mid);

        if (mid.length > 2) return str.slice(0, 4) + delimiter + mid.slice(0, 2) + delimiter + mid.slice(2, 3); // over
        else if (mid.length == 2) {
            if (midInt > 12) return str.slice(0, 4) + delimiter + mid.slice(0, 1) + delimiter + mid.slice(1, 2); // over
            else return str.slice(0, 4) + delimiter + mid.slice(0, 2); // right
        } else return str.slice(0, 4) + delimiter + mid.slice(0, 1); // right
    } else if (len === 3) {
        const str = filtered_date[0];
        const mid = filtered_date[1];
        const end = filtered_date[2];
        const endInt = parseInt(end);

        if (1 <= endInt && endInt <= 31) return str + delimiter + mid + delimiter + end.slice(0, 2); // right
        // TODO: make more precise
        else if (endInt > 31) return str + delimiter + mid + delimiter + '31';
        else return str + delimiter + mid + delimiter;
    } else {
        const str = filtered_date[0];
        const mid = filtered_date[1];
        const end = filtered_date[2];

        return str + delimiter + mid + delimiter + end;
    }

}
