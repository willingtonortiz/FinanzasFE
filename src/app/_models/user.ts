import { Role } from "./role";

export class User {
	username: number;
	password: string;
	role: Role;
	token?: string;
}
