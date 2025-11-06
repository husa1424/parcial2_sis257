import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateNivelesAcademicoDto {
  @IsNotEmpty({ message: 'El campo Nombre es obligatorio' })
  @IsString({ message: 'El campo Nombre debe ser de tipo cadena' })
  @MaxLength(20, {
    message: 'El campo Nombre excede los 20 caracteres',
  })
  readonly nombre: string;

  @IsOptional()
  @IsString({ message: 'El campo Descripcion debe ser de tipo cadena' })
  @MaxLength(500, { message: 'El campo Descripcion excede los 500 caracteres' })
  readonly descripcion?: string;
}
