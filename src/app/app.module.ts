import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutComponent } from './containers/_layout/app-layout/app-layout.component';
import {
    AppHeaderComponent,
    SwitchRoleDialog,
    UserProfileDialog  
} from './containers/_layout/app-header/app-header.component';
import { AppFooterComponent } from './containers/_layout/app-footer/app-footer.component';
import { SiteLayoutComponent } from './containers/_layout/site-layout/site-layout.component';
import { SiteHeaderComponent } from './containers/_layout/site-header/site-header.component';
import { SiteFooterComponent } from './containers/_layout/site-footer/site-footer.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './lib/_helpers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AppSideBarComponent, ChecklistDatabase } from './containers/_layout/app-side-bar/app-side-bar.component';
import { AppSideBarComponent } from './containers/_layout/app-side-bar/app-side-bar.component';
import { MaterialModule } from './shared/material.module';
import { SessionExtendConfirmationDialog } from './modules/non-auth/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { SpinnerComponent } from './containers/_layout/spinner/spinner.component';
import { CommonService } from './modules/services/common.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { TransactionMessageDialogComponent } from './modules/non-auth/login/transaction-message-dialog/transaction-message-dialog.component';
import { SignInInfoComponent } from './modules/non-auth/login/sign-in-info/sign-in-info.component';
import { DatePipe } from '@angular/common';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { InstitutionalLoanDetailsModule } from './modules/core/dmo/InstitutionalLoanDetails/institutional-loan-details.module';
import { RemoveLoanModule } from './modules/core/dmo/RemoveLoan/remove-loan.module';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        AppLayoutComponent,
        AppHeaderComponent,
        AppFooterComponent,
        SiteLayoutComponent,
        SiteHeaderComponent,
        SiteFooterComponent,
        AppSideBarComponent,
        SpinnerComponent,
        SessionExtendConfirmationDialog,
        SwitchRoleDialog,
        UserProfileDialog,
        TransactionMessageDialogComponent,
        SignInInfoComponent       
    ],
    imports: [
        MaterialModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            maxOpened: 1,
            autoDismiss: true
        }),
        InstitutionalLoanDetailsModule,
        RemoveLoanModule,
        NgxMatSelectSearchModule 
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
        CommonService,
        DatePipe
        // ChecklistDatabase
    ],
    entryComponents: [
        SessionExtendConfirmationDialog,
        SwitchRoleDialog,
        UserProfileDialog,
        TransactionMessageDialogComponent,
        SignInInfoComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
