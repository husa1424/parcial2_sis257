import { PartialType } from '@nestjs/mapped-types';
import { CreateNivelesAcademicoDto } from './create-niveles_academico.dto';

export class UpdateNivelesAcademicoDto extends PartialType(
  CreateNivelesAcademicoDto,
) {}
