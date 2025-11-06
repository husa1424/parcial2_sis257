import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NivelesAcademicosService } from './niveles_academicos.service';
import { CreateNivelesAcademicoDto } from './dto/create-niveles_academico.dto';
import { UpdateNivelesAcademicoDto } from './dto/update-niveles_academico.dto';

@Controller({ path: 'niveles_academicos', version: '1' })
export class NivelesAcademicosController {
  constructor(
    private readonly nivelesAcademicosService: NivelesAcademicosService,
  ) {}

  // Crear un nuevo nivel académico
  @Post()
  create(@Body() createNivelesAcademicoDto: CreateNivelesAcademicoDto) {
    return this.nivelesAcademicosService.create(createNivelesAcademicoDto);
  }

  // Listar todos los niveles académicos
  @Get()
  findAll() {
    return this.nivelesAcademicosService.findAll();
  }

  // Obtener un nivel académico por ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nivelesAcademicosService.findOne(+id);
  }

  // Actualizar un nivel académico por ID
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNivelesAcademicoDto: UpdateNivelesAcademicoDto,
  ) {
    return this.nivelesAcademicosService.update(+id, updateNivelesAcademicoDto);
  }

  // Eliminar (soft delete) un nivel académico por ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nivelesAcademicosService.remove(+id);
  }
}
