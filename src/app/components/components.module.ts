import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { FilterPopoverComponent } from './filter-popover/filter-popover.component';
import { CardListComponent } from './card-list/card-list.component';
import { CardContentsDetailsComponent } from './card-contents-details/card-contents-details.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { PreviewComponent } from './preview/preview.component';

@NgModule({
    declarations: [
        FilterPopoverComponent,
        CardListComponent,
        CardContentsDetailsComponent,
        PreviewComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        TranslateModule.forChild(),
        NgCircleProgressModule.forRoot(),
    ],
    exports: [
        FilterPopoverComponent,
        CardListComponent,
        CardContentsDetailsComponent,
        PreviewComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class ComponentsModule { }
