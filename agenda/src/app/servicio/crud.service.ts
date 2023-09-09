import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Acudiente } from './Modelos/Acudiente';
import { Docente} from './Modelos/Docente';
import { Grupo} from './Modelos/Grupo';
import { Asignatura} from './Modelos/Asignatura';
import { Estudiante} from './Modelos/Estudiante';
import { Anotacion} from './Modelos/Anotacion';
import { User } from './Modelos/User';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  API_ACUDIENTES: string='http://localhost/api/acudientes/'
  API_DOCENTES: string='http://localhost/api/docentes/'
  API_GRUPOS: string='http://localhost/api/grupos/'
  API_ASIGNATURAS: string='http://localhost/api/asignaturas/'
  API_ESTUDIANTES: string='http://localhost/api/estudiantes/'
  API_ANOTACIONES: string='http://localhost/api/anotaciones/'
  API_USERS: string='http://localhost/api/users/'

  constructor(private clienteHttp:HttpClient) { }

  AgregarAcudiente(datosAcudiente:Acudiente):Observable<any>{
    return this.clienteHttp.post(this.API_ACUDIENTES+"?insertar_acudientes=1",datosAcudiente);
  }

  obtenerAcudientes(){
    return this.clienteHttp.get(this.API_ACUDIENTES);
  } 

  BorrarAcudiente(Cod_Acudiente:any):Observable<any>{
    return this.clienteHttp.get(this.API_ACUDIENTES+"?borrar_acudientes="+Cod_Acudiente);
  } 

  ObtenerAcudiente(Cod_Acudiente:any):Observable<any>{
    return this.clienteHttp.get(this.API_ACUDIENTES+"?consultar_acudientes="+Cod_Acudiente);
  } 

  EditarAcudiente(Cod_Acudiente:any, datosAcudiente:any):Observable<any>{
    return this.clienteHttp.post(this.API_ACUDIENTES+"?actualizar_acudientes=" + Cod_Acudiente ,datosAcudiente);
  }


//Docente 

AgregarDocente(datosDocente:Docente):Observable<any>{
  return this.clienteHttp.post(this.API_DOCENTES+"?insertar_docente=1",datosDocente);
}

ObtenerDocentes(){
  return this.clienteHttp.get(this.API_DOCENTES);
} 

BorrarDocente(Cod_Docente:any):Observable<any>{
  return this.clienteHttp.get(this.API_DOCENTES+"?borrar_docentes="+Cod_Docente);
} 

ObtenerDocente(Cod_Docente:any):Observable<any>{
  return this.clienteHttp.get(this.API_DOCENTES+"?consultar_docentes="+Cod_Docente);
} 

EditarDocente(Cod_Docente:any, datosDocente:any):Observable<any>{
  return this.clienteHttp.post(this.API_DOCENTES+"?actualizar_docentes=" + Cod_Docente ,datosDocente);
}

//Grupo

AgregarGrupo(datosGrupo:Grupo):Observable<any>{
  return this.clienteHttp.post(this.API_GRUPOS+"?insertar_grupos=1",datosGrupo);
}

ObtenerGrupos(){
  return this.clienteHttp.get(this.API_GRUPOS);
} 

BorrarGrupo(Cod_Grupo:any):Observable<any>{
  return this.clienteHttp.get(this.API_GRUPOS+"?borrar_grupos="+Cod_Grupo);
} 

ObtenerGrupo(Cod_Grupo:any):Observable<any>{
  return this.clienteHttp.get(this.API_GRUPOS+"?consultar_grupos="+Cod_Grupo);
} 

ObtenerGrupoEstudiante(Cod_Estudiante:any):Observable<any>{
  return this.clienteHttp.get(this.API_GRUPOS+"?consultar_grupos_estudiante="+Cod_Estudiante);
} 

ObtenerGrupoDocente(Cod_Docente:any):Observable<any>{
  return this.clienteHttp.get(this.API_GRUPOS+"?consultar_grupos_docente="+Cod_Docente);
}

EditarGrupo(Cod_Grupo:any, datosGrupo:any):Observable<any>{
  return this.clienteHttp.post(this.API_GRUPOS+"?actualizar_grupos=" + Cod_Grupo ,datosGrupo);
}

//Anotacion

AgregarAnotacion(datosAnotacion:Anotacion):Observable<any>{
  return this.clienteHttp.post(this.API_ANOTACIONES+"?insertar_anotaciones=1",datosAnotacion);
}

ObtenerAnotaciones(){
  return this.clienteHttp.get(this.API_ANOTACIONES);
} 

BorrarAnotacion(Cod_Anotacion:any):Observable<any>{
  return this.clienteHttp.get(this.API_ANOTACIONES+"?borrar_anotaciones="+Cod_Anotacion);
} 

ObtenerAnotacion(Cod_Anotacion:any):Observable<any>{
  return this.clienteHttp.get(this.API_ANOTACIONES+"?consultar_anotaciones="+Cod_Anotacion);
} 

ObtenerAnotacionEstudiante(Cod_Estudiante:any):Observable<any>{
  return this.clienteHttp.get(this.API_ANOTACIONES+"?consultar_anotaciones_estudiante="+Cod_Estudiante);
} 

ObtenerAnotacionEstudianteDocente(Cod_Docente:any):Observable<any>{
  return this.clienteHttp.get(this.API_ANOTACIONES+"?consultar_anotaciones_docente="+Cod_Docente);
} 

EditarAnotacion(Cod_Anotacion:any, datosAnotacion:any):Observable<any>{
  return this.clienteHttp.post(this.API_ANOTACIONES+"?actualizar_anotaciones=" + Cod_Anotacion ,datosAnotacion);
}

//Asignatura

AgregarAsignatura(datosAsignatura:Asignatura):Observable<any>{
  return this.clienteHttp.post(this.API_ASIGNATURAS+"?insertar_asignaturas=1",datosAsignatura);
}

ObtenerAsignaturas(){
  return this.clienteHttp.get(this.API_ASIGNATURAS);
} 

BorrarAsignatura(Cod_Asignatura:any):Observable<any>{
  return this.clienteHttp.get(this.API_ASIGNATURAS+"?borrar_asignaturas="+Cod_Asignatura);
} 

ObtenerAsignatura(Cod_Asignatura:any):Observable<any>{
  return this.clienteHttp.get(this.API_ASIGNATURAS+"?consultar_asignaturas="+Cod_Asignatura);
} 

EditarAsignatura(Cod_Asignatura:any, datosAsignatura:any):Observable<any>{
  return this.clienteHttp.post(this.API_ASIGNATURAS+"?actualizar_asignaturas=" + Cod_Asignatura ,datosAsignatura);
}

//Estudiante

AgregarEstudiante(datosEstudiante:Estudiante):Observable<any>{
  return this.clienteHttp.post(this.API_ESTUDIANTES+"?insertar_estudiantes=1",datosEstudiante);
}

ObtenerEstudiantes(){
  return this.clienteHttp.get(this.API_ESTUDIANTES);
} 

BorrarEstudiante(Cod_Estudiante:any):Observable<any>{
  return this.clienteHttp.get(this.API_ESTUDIANTES+"?borrar_estudiantes="+Cod_Estudiante);
} 

ObtenerEstudiante(Cod_Estudiante:any):Observable<any>{
  return this.clienteHttp.get(this.API_ESTUDIANTES+"?consultar_estudiantes="+Cod_Estudiante);
} 

ObtenerEstudianteacudiente(Cod_Acudiente:any):Observable<any>{
  return this.clienteHttp.get(this.API_ESTUDIANTES+"?consultar_estudiantes_acudiente="+Cod_Acudiente);
}

ObtenerEstudiantedocente(Cod_Acudiente:any):Observable<any>{
  return this.clienteHttp.get(this.API_ESTUDIANTES+"?consultar_estudiantes_acudiente="+Cod_Acudiente);
}


EditarEstudiante(Cod_Estudiante:any, datosEstudiante:any):Observable<any>{
  return this.clienteHttp.post(this.API_ESTUDIANTES+"?actualizar_estudiantes=" + Cod_Estudiante ,datosEstudiante);
}


// user
AgregarUser(datosUser:User):Observable<any>{
  return this.clienteHttp.post(this.API_USERS+"?insertar_user=1",datosUser);
}

ObtenerUsers(){
  return this.clienteHttp.get(this.API_USERS);
} 

BorrarUser(userName:any):Observable<any>{
  return this.clienteHttp.get(this.API_USERS+"?borrar_user="+userName);
} 

ObtenerUser(userName:any):Observable<any>{
  return this.clienteHttp.get(this.API_USERS+"?consultar_user="+userName);
} 



EditarUser(userName:any, datosUser:any):Observable<any>{
  return this.clienteHttp.post(this.API_USERS+"?actualizar_user=" + userName ,datosUser);
}


}
