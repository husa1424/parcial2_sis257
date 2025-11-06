import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNivelesAcademicoDto } from './dto/create-niveles_academico.dto';
import { UpdateNivelesAcademicoDto } from './dto/update-niveles_academico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NivelAcademico } from './entities/niveles_academico.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NivelesAcademicosService {
  constructor(
    @InjectRepository(NivelAcademico)
    private niveles_academicosRepository: Repository<NivelAcademico>,
  ) {}

  async create(
    CreateNivelesAcademicoDto: CreateNivelesAcademicoDto,
  ): Promise<NivelAcademico> {
    let niveles_academico = await this.niveles_academicosRepository.findOneBy({
      nombre: CreateNivelesAcademicoDto.nombre.trim(),
    });
    if (niveles_academico) throw new ConflictException('El nombre ya existe');
    niveles_academico = new NivelAcademico();
    Object.assign(niveles_academico, CreateNivelesAcademicoDto);
    return this.niveles_academicosRepository.save(niveles_academico);
  }

  async findAll(): Promise<NivelAcademico[]> {
    return this.niveles_academicosRepository.find();
  }

  async findOne(id: number): Promise<NivelAcademico> {
    const nivel = await this.niveles_academicosRepository.findOneBy({ id });
    if (!nivel) throw new NotFoundException('El nivel académico no existe');
    return nivel;
  }

  async update(
    id: number,
    updateNivelesAcademicoDto: UpdateNivelesAcademicoDto,
  ): Promise<NivelAcademico> {
    const nivel = await this.findOne(id);
    Object.assign(nivel, updateNivelesAcademicoDto);
    return this.niveles_academicosRepository.save(nivel);
  }

  async remove(id: number): Promise<NivelAcademico> {
    const nivel = await this.findOne(id);
    return this.niveles_academicosRepository.softRemove(nivel);
  }
}
