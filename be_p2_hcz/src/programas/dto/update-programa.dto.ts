import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramaDto } from './create-programa.dto';
import { AreaConocimiento } from '../entities/programa.entity';

export class UpdateProgramaDto extends PartialType(CreateProgramaDto) {
  areaConocimiento: AreaConocimiento;
}
