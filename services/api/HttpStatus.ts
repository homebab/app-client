export const handleHttpStatus = (res: Response) => {
    console.debug(`[omtm]: response from Omtm Server: ${JSON.stringify(res)}`);

    if (res.status >= 200 && res.status <= 299) {
        return res.json();
    } else {
        if (res.statusText) return res.statusText
        else return res.text();
    }
}