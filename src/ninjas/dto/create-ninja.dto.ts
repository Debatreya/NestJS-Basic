import { MinLength } from "class-validator";
export class CreateNinjaDto {
    id: string;
    @MinLength(3)
    name: string;
    type?: string;
    weapon?: string;
    level?: number;
}
