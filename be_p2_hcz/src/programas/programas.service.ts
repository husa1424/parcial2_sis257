import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Programa } from './entities/programa.entity';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';

@Injectable()
export class ProgramasService {
  constructor(
    @InjectRepository(Programa)
    private programasRepository: Repository<Programa>,
  ) {}

  async create(createProgramaDto: CreateProgramaDto): Promise<Programa> {
    let programa = await this.programasRepository.findOne({
      //where: { nombre:createProgramaDto.nombre.trim() },
    });

    if (programa) throw new ConflictException('El programa ya existe');

    programa = new Programa();
    Object.assign(programa, createProgramaDto);

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
    Object.assign(programa, dto);
    return this.programasRepository.save(programa);
  }

  async remove(id: number): Promise<Programa> {
    const programa = await this.findOne(id);
    return this.programasRepository.softRemove(programa);
  }
}
