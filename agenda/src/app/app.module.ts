import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgregarAcudienteComponent } from './componentes/acudientes/agregar-acudiente/agregar-acudiente.component';
import { ListarAcudienteComponent } from './componentes/acudientes/listar-acudiente/listar-acudiente.component';
import { EditarAcudienteComponent } from './componentes/acudientes/editar-acudiente/editar-acudiente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AgregarDocenteComponent } from './componentes/docentes/agregar-docente/agregar-docente.component';
import { EditarDocenteComponent } from './componentes/docentes/editar-docente/editar-docente.component';
import { ListarDocenteComponent } from './componentes/docentes/listar-docente/listar-docente.component';
import { AgregarEstudianteComponent } from './componentes/estudiantes/agregar-estudiante/agregar-estudiante.component';
import { EditarEstudianteComponent } from './componentes/estudiantes/editar-estudiante/editar-estudiante.component';
import { ListarEstudianteComponent } from './componentes/estudiantes/listar-estudiante/listar-estudiante.component';
import { AgregarGrupoComponent } from './componentes/grupos/agregar-grupo/agregar-grupo.component';
import { EditarGrupoComponent } from './componentes/grupos/editar-grupo/editar-grupo.component';
import { ListarGrupoComponent } from './componentes/grupos/listar-grupo/listar-grupo.component';
import { AgregarAnotacionComponent } from './componentes/anotaciones/agregar-anotacion/agregar-anotacion.component';
import { EditarAnotacionComponent } from './componentes/anotaciones/editar-anotacion/editar-anotacion.component';
import { ListarAnotacionComponent } from './componentes/anotaciones/listar-anotacion/listar-anotacion.component';
import { ListarAnotacionDocenteComponent } from './componentes/anotaciones/listar-anotacion-docente/listar-anotacion-docente.component';
import { ContactanosComponent } from './Views/contactanos/contactanos.component';
import { InicioComponent } from './Views/inicio/inicio.component';
import { NosotrosComponent } from './Views/nosotros/nosotros.component';
import { LoginComponent } from './Views/login/login.component';
import { AdministradorComponent } from './componentes/tableros/administrador/administrador.component';
import { AcudienteComponent } from './componentes/tableros/acudiente/acudiente.component';
import { DocenteComponent } from './componentes/tableros/docente/docente.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './servicio/token-interceptor.service';
import { ListarEstudianteDocenteComponent } from './componentes/estudiantes/listar-estudiante-docente/listar-estudiante-docente.component';
import { ListarGrupoDocenteComponent } from './componentes/grupos/listar-grupo-docente/listar-grupo-docente.component';
import { NotificacionesComponent } from './componentes/notificaciones/notificaciones.component';
import { AgregarUserComponent } from './componentes/user/agregar-user/agregar-user.component';
import { ListarUserComponent } from './componentes/user/listar-user/listar-user.component';
import { EditarUserComponent } from './componentes/user/editar-user/editar-user.component';

@NgModule({
  declarations: [
    AppComponent,
    AgregarAcudienteComponent,
    ListarAcudienteComponent,
    EditarAcudienteComponent,
    AgregarDocenteComponent,
    EditarDocenteComponent,
    ListarDocenteComponent,
    AgregarEstudianteComponent,
    EditarEstudianteComponent,
    ListarEstudianteComponent,
    AgregarGrupoComponent,
    EditarGrupoComponent,
    ListarGrupoComponent,
    AgregarAnotacionComponent,
    EditarAnotacionComponent,
    ListarAnotacionComponent,
    ListarAnotacionDocenteComponent,
    ContactanosComponent,
    InicioComponent,
    NosotrosComponent,
    LoginComponent,
    AdministradorComponent,
    AcudienteComponent,
    DocenteComponent,
    ListarEstudianteDocenteComponent,
    ListarGrupoDocenteComponent,
    NotificacionesComponent,
    AgregarUserComponent,
    ListarUserComponent,
    EditarUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxExtendedPdfViewerModule,
    ToastrModule.forRoot()

    
  ],
  providers: [
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,

    // token interceptors

    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
