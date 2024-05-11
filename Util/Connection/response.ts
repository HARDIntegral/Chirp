export interface Response {
    status: string,
    statusCode: number,
    protocol: string,
    body: string
}

export const compileResponse = (r: Response): string => 
    `${r.protocol} ${r.statusCode} ${r.status}\r\n\r\n${r.body}`;