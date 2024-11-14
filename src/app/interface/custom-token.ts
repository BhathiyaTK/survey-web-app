import { JwtPayload } from "jwt-decode";

export interface CustomToken extends JwtPayload {
    nameid: string;
    role: string;
    unique_name: string;
}
