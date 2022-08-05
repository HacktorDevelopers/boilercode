declare namespace Express {
    export interface Request {
       userId?: string,
       files: any
    }
 }

//  export interface File {
//     fieldName: string;
//     originalFilename: string;
//     path: string;
//     size: number;
//     name: string;
//     type: string;
// }

// export interface FileData {
//     file: File,
//     files: any,
// }