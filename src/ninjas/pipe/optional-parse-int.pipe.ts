import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class OptionalParseIntPipe implements PipeTransform<string, number>{
    transform(value: string, metadata: ArgumentMetadata): number {
        if(!value){
            return undefined;
        }
        const val = parseInt(value, 10);
        if(isNaN(val)){
            throw new BadRequestException(`${metadata.data} must be an number`);
        }
        return val;
    }
}