import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsNumber,
  IsDate,
  IsEnum,
} from 'class-validator';
import { EstadoPrograma } from '../entities/programa.entity';

export class CreateProgramaDto {
  @IsNotEmpty({ message: 'El campo Nivel Académico es obligatorio' })
  @IsNumber({}, { message: 'El campo Nivel Académico debe ser numérico' })
  readonly idNivelAcademico: number;

  @IsNotEmpty({ message: 'El campo Nombre es obligatorio' })
  @IsString({ message: 'El campo Nombre debe ser de tipo cadena' })
  @MaxLength(100, { message: 'El campo Nombre excede los 100 caracteres' })
  readonly nombre: string;

  @IsNotEmpty({ message: 'El campo Descripción es obligatorio' })
  @IsString({ message: 'El campo Descripción debe ser de tipo cadena' })
  @MaxLength(2000, {
    message: 'El campo Descripción excede los 2000 caracteres',
  })
  readonly descripcion: string;

  @IsNotEmpty({ message: 'El campo Versión es obligatorio' })
  @IsNumber({}, { message: 'El campo Versión debe ser numérico' })
  readonly version: number;

  @IsNotEmpty({ message: 'El campo Duración es obligatorio' })
  @IsNumber({}, { message: 'El campo Duración debe ser numérico' })
  readonly duracionMeses: number;

  @IsNotEmpty({ message: 'El campo Costo es obligatorio' })
  readonly costo: number;

  @IsNotEmpty({ message: 'El campo Fecha de Inicio es obligatorio' })
  @IsDate({ message: 'El campo Fecha de Inicio debe ser de tipo fecha' })
  readonly fechaInicio: Date;

  @IsNotEmpty({ message: 'El campo Estado es obligatorio' })
  @IsEnum(EstadoPrograma, { message: 'El campo Estado no es válido' })
  readonly estado: EstadoPrograma;
}
