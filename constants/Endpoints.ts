const BASE_URL = 'http://OmtmALB-1788113492.ap-northeast-2.elb.amazonaws.com';

const buildAPIPath = (path: string, prefix?: string, query?: any) => {
    const queryParameters = query ?
        '?'+ Object.keys(query)
            .map(k => `${k}=${query[k]}`)
            .reduce((acc, val) => acc + '&' + val) :
        undefined
    return BASE_URL + prefix + path + queryParameters
}

export const EndPoints = {
    BASE_URL, buildAPIPath
}