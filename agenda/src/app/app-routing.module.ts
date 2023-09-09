import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

//Frontend
import { NosotrosComponent } from './Views/nosotros/nosotros.component';
import { ContactanosComponent } from './Views/contactanos/contactanos.component';
import { InicioComponent } from './Views/inicio/inicio.component';
import { LoginComponent } from './Views/login/login.component';
import { AppComponent } from './app.component';

// Tableros
import { AcudienteComponent } from './componentes/tableros/acudiente/acudiente.component';
import { AdministradorComponent } from './componentes/tableros/administrador/administrador.component';
import { DocenteComponent } from './componentes/tableros/docente/docente.component';

//Acudiente
import { AgregarAcudienteComponent } from './componentes/acudientes/agregar-acudiente/agregar-acudiente.component';
import { EditarAcudienteComponent } from './componentes/acudientes/editar-acudiente/editar-acudiente.component';
import { ListarAcudienteComponent } from './componentes/acudientes/listar-acudiente/listar-acudiente.component';
//Docente
import { AgregarDocenteComponent } from './componentes/docentes/agregar-docente/agregar-docente.component';
import { ListarDocenteComponent } from './componentes/docentes/listar-docente/listar-docente.component';
import { EditarDocenteComponent } from './componentes/docentes/editar-docente/editar-docente.component';
//Grupo
import { AgregarGrupoComponent } from './componentes/grupos/agregar-grupo/agregar-grupo.component';
import { ListarGrupoComponent } from './componentes/grupos/listar-grupo/listar-grupo.component';
import { EditarGrupoComponent } from './componentes/grupos/editar-grupo/editar-grupo.component';
import { ListarGrupoDocenteComponent } from './componentes/grupos/listar-grupo-docente/listar-grupo-docente.component';

//Estudiante
import { AgregarEstudianteComponent } from './componentes/estudiantes/agregar-estudiante/agregar-estudiante.component';
import { ListarEstudianteComponent } from './componentes/estudiantes/listar-estudiante/listar-estudiante.component';
import { EditarEstudianteComponent } from './componentes/estudiantes/editar-estudiante/editar-estudiante.component';
import { ListarEstudianteDocenteComponent } from './componentes/estudiantes/listar-estudiante-docente/listar-estudiante-docente.component';

//anotacion
import { AgregarAnotacionComponent } from './componentes/anotaciones/agregar-anotacion/agregar-anotacion.component';
import { ListarAnotacionComponent } from './componentes/anotaciones/listar-anotacion/listar-anotacion.component';
import { ListarAnotacionDocenteComponent } from './componentes/anotaciones/listar-anotacion-docente/listar-anotacion-docente.component';
import { EditarAnotacionComponent } from './componentes/anotaciones/editar-anotacion/editar-anotacion.component';
import { RoleGuard } from './guards/Role.guard';

//user
import { AgregarUserComponent } from './componentes/user/agregar-user/agregar-user.component';
import { EditarUserComponent } from './componentes/user/editar-user/editar-user.component';
import { ListarUserComponent } from './componentes/user/listar-user/listar-user.component';



const routes: Routes = [

//Frontend routes
{ path: '', redirectTo: 'inicio', pathMatch: 'full' },
{ path: 'inicio', component: InicioComponent, data: { title: 'Inicio' } },
{path: 'app', component: AppComponent, data: { title: 'Inicio' } },
{ path: 'contactanos', component: ContactanosComponent, data: { title: 'Contáctanos' }  },
{ path: 'nosotros', component: NosotrosComponent, data: { title: 'Nosotros' }  },
{ path: 'login', component: LoginComponent, data: { title: 'Iniciar sesión' }  },

//tableros

{ path: 'tablero-administrador', component: AdministradorComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin' }}, //El canActivate en adelante es para proteger rutas sin logueo
{ path: 'tablero-acudiente', component: AcudienteComponent, canActivate: [RoleGuard], data: { expectedRole: 'acudiente'}},
{ path: 'tablero-docente', component: DocenteComponent, canActivate: [RoleGuard], data: { expectedRole: 'docente'}}, //cambiar a docente

//acudiente
{path: 'agregar-acudiente', component: AgregarAcudienteComponent},
{path: 'listar-acudiente', component: ListarAcudienteComponent, canActivate:[RoleGuard], data: { expectedRole: 'acudiente' || 'docente'}},
{path: 'editar-acudiente/:id', component: EditarAcudienteComponent, canActivate:[RoleGuard], data: { expectedRole: 'admin' || 'docente'}},
//docente
{path: 'agregar-docente', component: AgregarDocenteComponent},
{path: 'listar-docente', component: ListarDocenteComponent , canActivate:[RoleGuard], data: { expectedRole: 'acudiente'}},
{path: 'editar-docente/:id', component: EditarDocenteComponent, canActivate:[RoleGuard],  data: { expectedRole: 'admin' || 'docente'}},
//grupo
{path: 'agregar-grupo', component: AgregarGrupoComponent},
{path: 'listar-grupo', component: ListarGrupoComponent, canActivate:[RoleGuard], data: { expectedRole: 'acudiente'}},
{path: 'editar-grupo/:id', component: EditarGrupoComponent, canActivate:[RoleGuard], data: { expectedRole: 'admin' || 'docente'}},
{path: 'listar-grupo-docente', component: ListarGrupoDocenteComponent, canActivate:[RoleGuard], data: { expectedRole: 'docente'}},

//estudiante
{path: 'agregar-estudiante', component: AgregarEstudianteComponent},
{path: 'listar-estudiante', component: ListarEstudianteComponent, canActivate:[RoleGuard], data: { expectedRole: 'acudiente'}},
{path: 'editar-estudiante/:id', component: EditarEstudianteComponent, canActivate:[RoleGuard], data: { expectedRole: 'admin' || 'docente'}},
{path: 'listar-estudiante-docente', component: ListarEstudianteDocenteComponent, canActivate:[RoleGuard], data: { expectedRole: 'docente'}},


//anotacion
{path: 'agregar-anotacion', component: AgregarAnotacionComponent},
{path: 'listar-anotacion', component: ListarAnotacionComponent},
{path: 'editar-anotacion/:id', component: EditarAnotacionComponent, canActivate:[RoleGuard], data: { expectedRole: 'admin' || 'docente'}},
{path: 'listar-anotacion-docente', component: ListarAnotacionDocenteComponent},
// user
{path: 'listar-user', component: ListarUserComponent, canActivate:[RoleGuard], data: { expectedRole: 'admin'}},
{path: 'agregar-user', component: AgregarUserComponent},
{path: 'editar-user/:id', component: EditarUserComponent, canActivate:[RoleGuard], data: { expectedRole: 'admin' }},


//login
{path: 'login', component: LoginComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
