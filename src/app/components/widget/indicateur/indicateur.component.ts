import { Component, OnInit, Input } from '@angular/core';
import { ServiceWidgetService } from 'src/app/services/widget/service-widget.service';
import { Router } from '@angular/router';
import { WidgetIndicator } from 'src/app/services/widget/WidgetIndicator';

@Component({
  selector: 'app-indicateur',
  templateUrl: './indicateur.component.html',
  styleUrls: ['./indicateur.component.css']
})
export class IndicateurComponent extends WidgetIndicator implements OnInit {


}
    
