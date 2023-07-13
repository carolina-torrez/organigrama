import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { OrganigramaService } from './organigrama.service';
import { NodoOrganigrama } from './schema/organigrama.schema';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrganigramaDto } from './dto/create-organigrama.dto';
import { UpdateOrganigramaDto } from './dto/update-organigrama.dto';
import { CreateNewEntityDto } from './dto/create-unidad';
import { CreateFatherDto } from './dto/set-father.dto';
import { CreateChildrenDto } from './dto/set-son.dto';

@ApiTags('organigrama')
@Controller('organigrama')
export class OrganigramaController {
  constructor(private readonly organigramaService: OrganigramaService) {}

  @Get()
  async obtenerOrganigrama() {
    return await this.organigramaService.obtenerOrganigrama();
  }
  @Get('/enlazados')
  async obtenerOrganigramaUnidos() {
    return await this.organigramaService.obtenerOrganigramaEnlazados();
  }

  @Get(':id')
  async obtenerNodo(@Param('id') id: string) {
    return this.organigramaService.obtenerNodo(id);
  }

  @Post()
  async crearNodo(@Body() nodo: CreateNewEntityDto) {
    return this.organigramaService.crearNodo(nodo);
  }

  @Put(':id/hijo-padre')
  async agregarHijoPadre(@Param('id') id: string, @Body() hijo: UpdateOrganigramaDto) {
    return this.organigramaService.agregarHijoPadres(id, hijo);
  }

  @Put(':id/padre')
  async agregarPadre(@Param('id') id: string, @Body() hijo: CreateFatherDto) {
    return this.organigramaService.agregarfather(id, hijo);
  }
  
  @Put(':id/hijo')
  async agregarHijo(@Param('id') id: string, @Body() hijo: CreateChildrenDto) {
    return this.organigramaService.agregarSon(id, hijo);
  }
}
