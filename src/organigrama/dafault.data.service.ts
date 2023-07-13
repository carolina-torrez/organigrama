import { HttpException, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { NodoOrganigrama, NodoOrganigramaDocument } from './schema/organigrama.schema';



@Injectable()
export class DataDefaultService {

  constructor(
    @InjectModel(NodoOrganigrama.name) private mainModel:Model<NodoOrganigramaDocument>,  
    ){}

    async setDataDefaultMain() {
      const count = await this.mainModel.estimatedDocumentCount();
      if (count > 0) return;
      const values = await Promise.all([
        this.mainModel.create({ name: 'Rectorado' }),

        this.mainModel.create({ name: 'secretaria general' }),
        this.mainModel.create({ name: 'asesoria juridica' }),
        this.mainModel.create({ name: 'c.f.d' }),
        this.mainModel.create({ name: 'planificacion' }),
        this.mainModel.create({ name: 'direccion postgrado' }),
        this.mainModel.create({ name: 'auditoria interna' }),
        this.mainModel.create({ name: 'vicerectorado' }),
        this.mainModel.create({ name: 'D.A.F' }),

        this.mainModel.create({ name: 'Comision Academica' }),
        this.mainModel.create({ name: 'consejo facultativo' }),
        this.mainModel.create({ name: 'consejo facultativo1' }),
        this.mainModel.create({ name: 'consejo facultativo2' }),
        this.mainModel.create({ name: 'consejo facultativo3' }),
        this.mainModel.create({ name: 'consejo facultativo4' }),
        this.mainModel.create({ name: 'consejo facultativo5' }),
        this.mainModel.create({ name: 'consejo facultativo6' }),
        this.mainModel.create({ name: 'consejo facultativo7' }),
        this.mainModel.create({ name: 'consejo facultativo8' }),
        this.mainModel.create({ name: 'consejo facultativo9' }),
        this.mainModel.create({ name: 'consejo de extension universitaria' }),
        this.mainModel.create({ name: 'consejo de investigacion cientifica' }),
        this.mainModel.create({ name: 'comision academica administrativa' }),
        this.mainModel.create({ name: 'direccion de servicios academicos' }),
        this.mainModel.create({ name: 'departamento personal' }),
        this.mainModel.create({ name: 'departamento infraestructura' }),
        this.mainModel.create({ name: 'division de presupuestos' }),
        this.mainModel.create({ name: 'division contabilidad' }),
        this.mainModel.create({ name: 'division tesoro' }),

        this.mainModel.create({ name: 'facultad de c.c.i' }),
        this.mainModel.create({ name: 'c.c. e.e. f.f a.d' }),
        this.mainModel.create({ name: 'facultad de ingenieria minera' }),
        this.mainModel.create({ name: 'facultad de ingenieria' }),
        this.mainModel.create({ name: 'facultad de cc. aa. pp.' }),
        this.mainModel.create({ name: 'facultad de ciencias exactas' }),
        this.mainModel.create({ name: 'facultad de ingenieria geologica' }),
        this.mainModel.create({ name: 'facultad de artes' }),
        this.mainModel.create({ name: 'facultad de cc. ss. mm.' }),
        this.mainModel.create({ name: 'facultad tecnica' }),
        this.mainModel.create({ name: 'direccion de extension universitaria' }),
        this.mainModel.create({ name: 'direccion c.i.c.' }),
        this.mainModel.create({ name: 'dto. regional de informacion' }),
        this.mainModel.create({ name: 'direccion eval. academica' }),
        this.mainModel.create({ name: 'dto. psicologico' }),
        this.mainModel.create({ name: 'bibliotecas' }),
        this.mainModel.create({ name: 'registros y admisiones' }),
        this.mainModel.create({ name: 'bienestar universitario' }),
        this.mainModel.create({ name: 'encargado presupuesto' }),
        this.mainModel.create({ name: 'comision de bienestar' }),
        this.mainModel.create({ name: 'caja' }),
        this.mainModel.create({ name: 'almacen' }),
        this.mainModel.create({ name: 'personal limpieza' }),
        this.mainModel.create({ name: 'personal seguridad' }),
        this.mainModel.create({ name: 'servicios basicos' }),
        this.mainModel.create({ name: 'festejos' }),

        this.mainModel.create({ name: 'derecho' }),
        this.mainModel.create({ name: 'inst. inv.' }),
        this.mainModel.create({ name: 'administracion de empresas' }),
        this.mainModel.create({ name: 'economia' }),
        this.mainModel.create({ name: 'auditoria' }),
        this.mainModel.create({ name: 'contabilidad' }),
        this.mainModel.create({ name: 'contabilidad (tupiza)' }),
        this.mainModel.create({ name: 'inst. inv.' }),
        this.mainModel.create({ name: 'minas' }),
        this.mainModel.create({ name: 'materias primas y minerales' }),
        this.mainModel.create({ name: 'inst. inv. mineria' }),
        this.mainModel.create({ name: 'ingenieria civil' }),
        this.mainModel.create({ name: 'construcciones civiles' }),
        this.mainModel.create({ name: 'geodesia y topografia' }),
        this.mainModel.create({ name: 'int. inv. ingenieria' }),
        this.mainModel.create({ name: 'agronomia' }),
        this.mainModel.create({ name: 'veterinaria (tupiza)' }),
        this.mainModel.create({ name: 'c.u.a' }),
        this.mainModel.create({ name: 'inst. inv.' }),
        this.mainModel.create({ name: 'fisica' }),
        this.mainModel.create({ name: 'estadistica' }),
        this.mainModel.create({ name: 'matematica' }),
        this.mainModel.create({ name: 'quimica' }),
        this.mainModel.create({ name: 'informatica' }),
        this.mainModel.create({ name: 'inst. inv. ciencias' }),
        this.mainModel.create({ name: 'geologia' }),
        this.mainModel.create({ name: 'int. inv. geologica' }),
        this.mainModel.create({ name: 'artes musicales' }),
        this.mainModel.create({ name: 'artes plasticas' }),
        this.mainModel.create({ name: 'bellas artes' }),
        this.mainModel.create({ name: 'trabajo social' }),
        this.mainModel.create({ name: 'linguistica' }),
        this.mainModel.create({ name: 'turismo' }),
        this.mainModel.create({ name: 'enfermeria' }),
        this.mainModel.create({ name: 'electricidad' }),
        this.mainModel.create({ name: 'electronica' }),
        this.mainModel.create({ name: 'automotores' }),
        this.mainModel.create({ name: 'mecanica' }),
        this.mainModel.create({ name: 'mecanica (uyuni)' }),
        this.mainModel.create({ name: 'television universitaria' }),
        this.mainModel.create({ name: 'museo' }),
        this.mainModel.create({ name: 'imprenta' }),
        this.mainModel.create({ name: 'i.b.b.a' }),
        this.mainModel.create({ name: 'comision de bienestar' }),
      ]);
      return values;
    }
}
