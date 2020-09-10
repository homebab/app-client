const BASE_URL = 'http://OmtmALB-1788113492.ap-northeast-2.elb.amazonaws.com/api';

const buildAPIPath = (path: string) => {
    return BASE_URL + path
}

export const EndPoints = {
    BASE_URL, buildAPIPath
}