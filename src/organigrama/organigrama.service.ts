import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NodoOrganigrama, NodoOrganigramaDocument } from './schema/organigrama.schema';
import { CreateOrganigramaDto } from './dto/create-organigrama.dto';
import { UpdateOrganigramaDto } from './dto/update-organigrama.dto';
import { CreateNewEntityDto } from './dto/create-unidad';
import { SVGOrganigramaService } from './svg.service';
import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class OrganigramaService {
  constructor(
    @InjectModel(NodoOrganigrama.name) private readonly nodoOrganigramaModel: Model<NodoOrganigramaDocument>,
    private svgOrganigrama:SVGOrganigramaService
  ) {}

  async obtenerOrganigrama() {
    return this.nodoOrganigramaModel.find();
  }

  

  async obtenerNodo(id: string): Promise<NodoOrganigrama> {
    const nodo = await this.nodoOrganigramaModel.findById(id);
    if (!nodo) {
      throw new NotFoundException('Nodo no encontrado');
    }
    return nodo;
  }

  async crearNodo(nodo: CreateNewEntityDto) {
    const nuevoNodo = new this.nodoOrganigramaModel(nodo);
    return nuevoNodo.save();
  }

  async agregarHijoPadres(id: string, hijo: UpdateOrganigramaDto) {
    
    const { father, children } = hijo;
    if(!father || children.length == 0 || father=="" || children == ""){
      throw new HttpException('ingrese datos en los campos father, children',400)
    }

    const nodoMain = await this.nodoOrganigramaModel.findOne({ _id: id })

    if(!nodoMain){
      throw new HttpException('no se encontro en nodo no desea realizar cambios',404)
    }

    const nodoHijo = await this.nodoOrganigramaModel.findOne({ name: children.toUpperCase() });
    if (!nodoHijo) {
      throw new NotFoundException('Nodo hijo no encontrado');
    }

    nodoMain.children.push(nodoHijo._id)

    const nodoPadre = await this.nodoOrganigramaModel.findOne({name:father.toUpperCase()});
    
    if (!nodoPadre) {
      throw new NotFoundException('Nodo padre no encontrado');
    }    
  
    nodoPadre.children.push(nodoMain._id);
  nodoMain.father=nodoPadre._id
    nodoHijo.father=id;
    await nodoMain.save();
    await nodoHijo.save();
    await nodoPadre.save()

    return { nodoPadre: nodoPadre ? nodoPadre : 'no existe nodo padre',Main:nodoMain , children:nodoHijo };
  }

  async createNodoChildren(nodoHijo ,children, nodoMain){
    nodoHijo.father=nodoMain._id;
    nodoHijo.save();
    nodoMain.children.push(children);
    nodoMain.save();
    return {father:nodoMain,hijo:nodoHijo}
  }

  async agregarfather(id, hijo){
    const { father } = hijo

    const nodoMain = await this.nodoOrganigramaModel.findById(id)
    if(!nodoMain){
      throw new NotFoundException('Nodo no encontrado');
    }

    const nodoFather = await this.nodoOrganigramaModel.findOne({name:father.toUpperCase()})
    if(!nodoFather){
      throw new NotFoundException('Nodo padre no encontrado');
    }

    if(nodoMain.father){
      throw new NotFoundException('el Nodo ya tiene un padre asignado!!');
    }

    nodoMain.father=nodoFather._id
    nodoFather.children.push(nodoMain._id)

    nodoFather.save()
    nodoMain.save()
    return {nodoFather,nodoMain} 
  }

  async agregarSon(id, hijo){
    const { children } = hijo
    const nodoMain = await this.nodoOrganigramaModel.findById(id)
    if(!nodoMain){
      throw new NotFoundException('Nodo no encontrado');
    }

    const nodoChidren = await this.nodoOrganigramaModel.findOne({name: children.toUpperCase()})
    if(!nodoChidren){
      throw new NotFoundException('Nodo hijo no encontrado');
    }    
  
    nodoChidren.father = nodoMain._id
    nodoMain.children.push(nodoChidren._id)

    nodoChidren.save()
    nodoMain.save()
    return {nodoMain, nodoChidren} 
  }

  async obtenerOrganigramaEnlazados() {
    const organigrama = await this.nodoOrganigramaModel.find({ padre: null });
    const organigramaPoblado = await this.poblarHijos(organigrama);
  
   
    
    const svg = await this.svgOrganigrama.convertirASVG(organigramaPoblado);

  
    // Generar un nombre de archivo único basado en la marca de tiempo actual
    const timestamp = Date.now();
    const nombreArchivo = `organigrama_${timestamp}.svg`;
  
    // Ruta y nombre de archivo relativo a src/svg
    const rutaArchivo = path.join('src', 'svg', nombreArchivo);
  
    // Crear la carpeta si no existe
    const carpetaSvg = path.dirname(rutaArchivo);
    if (!fs.existsSync(carpetaSvg)) {
      fs.mkdirSync(carpetaSvg, { recursive: true });
    }
    
    // Guardar el SVG en un archivo
    fs.writeFileSync(rutaArchivo, svg);
    
    return organigramaPoblado;
  }
    
  async poblarHijos(nodos) {
    const nodosPoblados = [];
  
    if (!Array.isArray(nodos)) {
      return nodosPoblados;
    }
  
    for (const nodo of nodos) {
      if (!nodo.father) {
        const populatedNodo = await this.populateChildren(nodo);
        if (populatedNodo) {
          nodosPoblados.push(populatedNodo);
        }
        await this.poblarHijos(nodo.children);
      }
    }
  
    return nodosPoblados;
  }


  
  
  async populateChildren(nodo) {
    const populatedNodo = await this.nodoOrganigramaModel.findById(nodo._id);
    
    if (populatedNodo && populatedNodo.children) {
      populatedNodo.children = await this.nodoOrganigramaModel.find({ _id: { $in: populatedNodo.children } }).populate({
        path:'children',
        populate: {
          path: 'children',
          populate: {
            path: 'children', 
            populate: {
              path: 'children', 
              populate: {
                path: 'children',
                populate: {
                  path: 'children',
                  populate: {
                    path: 'children',
                    populate: {
                      path: 'children', 
                    }  
                  } 
                } 
              }
            }
          }
        }
    });
      for (const child of populatedNodo.children) {
        await this.populateChildren(child);
      }
    }
  
    return populatedNodo;
  }
 
}