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
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatChipsModule} from '@angular/material/chips';
import {MatMenuModule} from '@angular/material/menu';
import { SidbarComponent } from 'src/app/shared/sidbar/sidbar.component';
import { SiginComponent } from 'src/app/pages/sigin/sigin.component';
import { SignUpComponent } from 'src/app/pages/sign-up/sign-up.component';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule, MatInputModule, MatDatepickerModule } from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { WidgetTableComponent } from 'src/app/pages/widget/widget-table/widget-table.component';
import {MatTableModule} from '@angular/material/table';
import { MatCheckboxModule } from '@angular/Material'
import { DialogBoxComponent } from 'src/app/components/dialog-box/dialog-box.component';
import { Login2Component } from 'src/app/pages/login2/login2.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { IndicateurComponent } from '../../components/widget/indicateur/indicateur.component';
import { AreaComponent } from 'src/app/components/widget/area/area.component';
import { HighchartsChartModule } from 'highcharts-angular';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { WidgetListComponent } from 'src/app/components/widget/widget-list/widget-list.component';
import { MccColorPickerModule } from 'material-community-components';
import {MatSliderModule} from '@angular/material/slider';
import {MatRippleModule} from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';

import { MatColorPickerModule } from 'mat-color-picker';
import { IndicateurListeComponent } from 'src/app/components/widget/indicateur-liste/indicateur-liste.component';
import { DialogDeleteComponent } from 'src/app/components/dialog-delete/dialog-delete.component';
import { SidbarConfigComponent } from 'src/app/shared/sidbar-config/sidbar-config.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ValidatorEquals } from '../../shared/custom-validator/ValidatorEquals.directive';
import { ValidatorEmailCheckerdirective } from 'src/app/shared/custom-validator/ValidatorEmailCheckerdirective';
import { ValidatorRequired } from 'src/app/shared/custom-validator/ValidatorRequired';
import { DialogResetComponent } from 'src/app/components/dialog-reset/dialog-reset.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatNativeDateModule} from '@angular/material/core';
import { BoxRequestComponent } from 'src/app/components/box-request/box-request.component';
import { LienToListWidgetComponent } from 'src/app/components/widget/lien-to-list-widget/lien-to-list-widget.component';
import { ConsultWidgetsComponent } from 'src/app/components/consultWidget/consult-widgets/consult-widgets.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    LayoutDashboardComponent,
        DashboardComponent,
        HeaderComponent,
        FooterComponent,
        SidbarComponent,
        SignUpComponent,
        SiginComponent,
        ConsultWidgetsComponent,
        WidgetTableComponent,
        DialogBoxComponent,
        Login2Component,
        SpinnerComponent,
        IndicateurComponent,
        AreaComponent,
        WidgetListComponent,
        IndicateurListeComponent,
        DialogDeleteComponent,
        DialogResetComponent,
        LienToListWidgetComponent,
        SidbarConfigComponent,
        ValidatorEquals,
        ValidatorEmailCheckerdirective,
        ValidatorRequired,
        BoxRequestComponent,
  ],
  imports: [
    MatExpansionModule,
    CommonModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatExpansionModule,

  MatDatepickerModule,
  MatNativeDateModule,
    MatButtonModule,
    MatDividerModule,
    MatRadioModule,
    MatListModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule,
    MatFormFieldModule, 
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    ReactiveFormsModule, FormsModule,
    MatDialogModule,
    MatPaginatorModule,
    HighchartsChartModule,
    DragDropModule,
    MatRippleModule,
    MatChipsModule,
    MatTabsModule,
    MatProgressBarModule,
 MatColorPickerModule
 ,MatSliderModule,
 MccColorPickerModule.forRoot({
  empty_color: 'transparent',
  used_colors: ['#000000', '#FFF555']
})

 
  ],
  entryComponents:[
    DialogBoxComponent ,
    WidgetListComponent,
    DialogDeleteComponent,
    SpinnerComponent,
    DialogResetComponent,
    LienToListWidgetComponent,
    ConsultWidgetsComponent
    ]
})
export class LayoutDashboardModule { }
