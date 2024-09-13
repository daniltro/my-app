export type IDocument = IAddedDocument & {
  id: string;
};
export interface IAddedDocument {
  documentStatus: string;
  employeeNumber: string;
  documentType: string;
  documentName: string;
  companySignatureName: string;
  employeeSignatureName: string;
  employeeSigDate: string;
  companySigDate: string;
}

export interface IData {
  error_code: number | null;
  error_message: string | null;
  data: IDocument[] | null;
  profiling: string | null;
  timings: any | null;
}

export interface IUserData {
  userName: string;
  password: string;
}

export interface IAuthState {
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface IDocumentState {
  data: IDocument[];
  loading: boolean;
  error: string | null;
}

export interface IDeleteParams {
  id: string;
  token: string;
}

export interface IPostDataResponse {
  error_code: number;
  error_message: string;
  data: IDocument;
  profiling?: string;
  timings?: null;
}
