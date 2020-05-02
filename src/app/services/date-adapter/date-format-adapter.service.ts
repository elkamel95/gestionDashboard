import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NativeDateAdapter, DateAdapter,
 MAT_DATE_FORMATS } from '@angular/material';
import { formatDate } from '@angular/common';

export const PICK_FORMATS = {
  parse: {dateInput: {month: 'numeric', year: 'numeric', day: 'numeric'}},
  display: {
      dateInput: 'input',
      monthYearLabel: {year: 'numeric', month: 'numeric'},
      dateA11yLabel: {year: 'numeric', month: 'numeric', day: 'numeric'},
      monthYearA11yLabel: {year: 'numeric', month: 'numeric'}
  }
};

export class PickDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
      if (displayFormat === 'input') {
          return formatDate(date,'dd-MM-yyyy',this.locale);;
      } else {
          return date.toDateString();
      }
  }
}