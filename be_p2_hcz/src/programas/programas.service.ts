import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AreaConocimiento, Programa } from './entities/programa.entity';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';
import { NivelesAcademicosService } from '../niveles_academicos/niveles_academicos.service';

@Injectable()
export class ProgramasService {
  constructor(
    @InjectRepository(Programa)
    private programasRepository: Repository<Programa>,
    private readonly nivelesAcademicosService: NivelesAcademicosService,
  ) {}


  async create(createProgramaDto: CreateProgramaDto): Promise<Programa> {
    
    const existente = await this.programasRepository.findOne({
      where: { nombre: createProgramaDto.nombre.trim() },
    });
    if (existente) throw new ConflictException('El programa ya existe');

    
    const nivel = await this.nivelesAcademicosService.findOne(
      createProgramaDto.idNivelAcademico,
    );
    if (!nivel)
      throw new NotFoundException(
        'El nivel académico asociado no existe',
      );


    const programa = this.programasRepository.create({
      ...createProgramaDto,
      fechaInicio: new Date(createProgramaDto.fechaInicio),
      nivelAcademico: nivel,
    });

    return this.programasRepository.save(programa);
  }


  async findAll(): Promise<Programa[]> {
    return this.programasRepository.find({ relations: ['nivelAcademico'] });
  }


  async findOne(id: number): Promise<Programa> {
    const programa = await this.programasRepository.findOne({
      where: { id },
      relations: ['nivelAcademico'],
    });
    if (!programa) throw new NotFoundException('Programa no encontrado');
    return programa;
  }


  async update(id: number, dto: UpdateProgramaDto): Promise<Programa> {
    const programa = await this.findOne(id);

  
    if (dto.idNivelAcademico) {
      const nivel = await this.nivelesAcademicosService.findOne(
        dto.idNivelAcademico,
      );
      if (!nivel)
        throw new NotFoundException(
          'nivel académico no existe',
        );
      programa.nivelAcademico = nivel;
    }

    Object.assign(programa, dto);

    if (dto.areaConocimiento) {
      programa.areaConocimiento = dto.areaConocimiento as AreaConocimiento;
    }

  
    if (dto.fechaInicio) {
      programa.fechaInicio = new Date(dto.fechaInicio);
    }

    return this.programasRepository.save(programa);
  }

  async remove(id: number): Promise<Programa> {
    const programa = await this.findOne(id);
    return this.programasRepository.softRemove(programa);
  }
}
