import { IAuth } from "@/services/api";

export class Player implements IAuth {
  #name: string;
  #iat: number;
  #exp: number;
  #iss: string;
  #aud: string;
  constructor(payload: { name: string, iat: number, exp: number, iss: string, aud: string }) {
    this.#name = payload.name;
    this.#iat = payload.iat;
    this.#exp = payload.exp;
    this.#iss = payload.iss;
    this.#aud = payload.aud;
  }

  get name(): string {
    return this.#name;
  }

  get iat(): Date {
    return new Date(this.#iat * 1000);
  }

  get exp(): Date {
    return new Date(this.#exp * 1000);
  }

  get iss(): string {
    return this.#iss;
  }

  get aud(): string {
    return this.#aud;
  }
}
