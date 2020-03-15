import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { LayoutDashboardComponent } from './layout-dashboard.component';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

import {MatMenuModule} from '@angular/material/menu';
import { SidbarComponent } from 'src/app/shared/sidbar/sidbar.component';
import { SiginComponent } from 'src/app/pages/sigin/sigin.component';
import { SignUpComponent } from 'src/app/pages/sign-up/sign-up.component';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { WidgetTableComponent } from 'src/app/pages/widget/widget-table/widget-table.component';
import {MatTableModule} from '@angular/material/table';
import { MatCheckboxModule } from '@angular/Material'


@NgModule({
  declarations: [
    LayoutDashboardComponent,
        DashboardComponent,
        HeaderComponent,
        FooterComponent,
        SidbarComponent,
        SignUpComponent,
        SiginComponent,
        WidgetTableComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatTableModule,
    MatCheckboxModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatFormFieldModule, 
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    ReactiveFormsModule, FormsModule
  ],
})
export class LayoutDashboardModule { }
