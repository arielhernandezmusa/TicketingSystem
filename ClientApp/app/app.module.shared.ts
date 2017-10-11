import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserService } from './services/user.service';
import { AuthGuard } from './auth.guard';
import { LocalStorageModule } from 'angular-2-local-storage';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TicketService } from './services/ticket.service';
import { TicketComponent } from './components/ticket/ticket.component';
//import { ModalModule } from 'ngx-bootstrap';
import { HomeDashboardComponent } from './components/home/home-dashboard.component';


@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        SidebarComponent,
        TicketComponent,
        HomeDashboardComponent
    ],
    imports: [
        CommonModule,
        LocalStorageModule.withConfig({
            prefix: 'TeckitingSystem',
            storageType: 'localStorage'
        }),
        //ModalModule.forRoot(),
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent, children : [
                {path: '', component: HomeDashboardComponent},
                {path: 'tickets', component: TicketComponent}
            ], canActivate: [AuthGuard] },
            { path: 'register', component: RegisterComponent},
            { path: 'login', component: LoginComponent},
         ])
    ],
    providers: [UserService, AuthGuard, TicketService]
})
export class AppModuleShared {
}
