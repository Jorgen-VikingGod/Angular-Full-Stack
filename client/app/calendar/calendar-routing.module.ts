import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../shared/layout/layout.component';
import { CalendarOverviewComponent } from './calendar-overview/calendar-overview.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [{ path: '', component: CalendarOverviewComponent }],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class CalendarRoutingModule {}
