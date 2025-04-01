import { IsOptional, isString, IsString, IsUUID  } from "class-validator";

export class UpdateLibroDto{
    
    @IsUUID()
    @IsString()
    @IsOptional()
    readonly id?: string;

    @IsString()
    @IsOptional()
    readonly brand?:string;

    @IsString()
    @IsOptional()
    readonly model?:string;
}