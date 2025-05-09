declare module 'bcryptjs' {
    export function genSalt(rounds?: number): Promise<string>;
    export function hash(data: string, saltOrRounds: string | number): Promise<string>;
    export function compare(data: string, encrypted: string): Promise<boolean>;
    
    // Versions synchrones si vous en avez besoin
    export function genSaltSync(rounds?: number): string;
    export function hashSync(data: string, saltOrRounds: string | number): string;
    export function compareSync(data: string, encrypted: string): boolean;
  }