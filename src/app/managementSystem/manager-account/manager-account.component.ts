import { HttpClient } from '@angular/common/http';
import { Component, OnInit, DoCheck } from '@angular/core';
import { RegistrationService } from 'src/app/service/registration.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-manager-account',
  templateUrl: './manager-account.component.html',
  styleUrls: ['./manager-account.component.scss']
})
export class ManagerAccountComponent implements OnInit {

  constructor(private http: HttpClient, private registrationService: RegistrationService, private messageService: MessageService) { }



  ngOnInit(): void {
    this.registrationService.getUserByEmail(this.userEmailLoggedIn).subscribe((data: any) => {
      this.account = data;
    });
    console.log(this.userEmailLoggedIn);
  }

  userEmailLoggedIn: any = sessionStorage.getItem('username');
  visible: boolean = false;
  account!: any;
  clonedProducts: { [s: string]: any } = {};

  onRowEditInit(product: any) {
    this.clonedProducts[product.id as string] = { ...product };
  }

  onRowEditSave(product: any) {
    if (product.price > 0) {
      delete this.clonedProducts[product.id as string];
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
    }
  }

  onRowEditCancel(product: any, index: number) {
    this.account[index] = this.clonedProducts[product.id as string];
    delete this.clonedProducts[product.id as string];
  }

}
