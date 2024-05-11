export interface Request {
    status: string,
    statusCode: string,
    protocol: string,
    body: string
}

export const parseRequest = (s: string): Request => {
    const [firstLine, body] = divideStringOn(s, '\r\n');
    const [protocol, statusCode, status] = firstLine.split(' ', 3);
    return { status, statusCode, protocol, body }
}

const divideStringOn = (s: string, search: string) => {
    const index = s.indexOf(search);
    const first = s.slice(0, index);
    const rest = s.slice(index + search.length)
    return [first, rest];
}