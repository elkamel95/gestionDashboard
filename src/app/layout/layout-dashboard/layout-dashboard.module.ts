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
import { MatFormFieldModule, MatInputModule } from '@angular/material';
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

import { MatColorPickerModule } from 'mat-color-picker';
import { IndicateurListeComponent } from 'src/app/components/widget/indicateur-liste/indicateur-liste.component';
import { DialogDeleteComponent } from 'src/app/components/dialog-delete/dialog-delete.component';
import { SidbarConfigComponent } from 'src/app/shared/sidbar-config/sidbar-config.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    LayoutDashboardComponent,
        DashboardComponent,
        HeaderComponent,
        FooterComponent,
        SidbarComponent,
        SignUpComponent,
        SiginComponent,
        WidgetTableComponent,
        DialogBoxComponent,
        Login2Component,
        SpinnerComponent,
        IndicateurComponent,
        AreaComponent,
        WidgetListComponent,
        IndicateurListeComponent,
        DialogDeleteComponent,
        SidbarConfigComponent
  ],
  imports: [

    CommonModule,
    MatSidenavModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDividerModule,
    MatRadioModule,
    MatListModule,
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
 MatColorPickerModule,MatSliderModule,
 MccColorPickerModule.forRoot({
  empty_color: 'transparent',
  used_colors: ['#000000', '#FFF555']
})

 
  ],
  entryComponents:[DialogBoxComponent ,WidgetListComponent,DialogDeleteComponent,SpinnerComponent]
})
export class LayoutDashboardModule { }
