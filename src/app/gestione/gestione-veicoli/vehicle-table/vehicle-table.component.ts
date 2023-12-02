import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { VehicleService } from 'src/app/service/vehicle.service';
import { MessageService } from 'primeng/api';
import { DialogsService } from 'src/app/service/dialogs.service';

interface fuelTypes {
  name: string;
}

@Component({
  selector: 'app-vehicle-table',
  templateUrl: './vehicle-table.component.html',
  styleUrls: ['./vehicle-table.component.scss'],
})
export class VehicleTableComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private dialogsService: DialogsService
  ) {}

  vehicles: any;
  listLength: any;
  fuelType: fuelTypes[] | undefined;
  editMode: number = -1;
  options: MenuItem[] | undefined;
  vehicleDetails: boolean = false;
  selectedVehicle: any;
  user: any;
  companyName:any;

  ngOnInit(): void {
    this.vehicleService
      .GetListVehicleByUser(sessionStorage.getItem('email'))
      .subscribe((data: any) => {
        this.vehicles = data;
        this.listLength = this.vehicles.data.length;
        // console.log('The vehicles are: ', this.vehicles.data);
      });
    this.fuelType = [
      { name: 'Benzina' },
      { name: 'Diesel' },
      { name: 'GPL' },
      { name: 'Metano' },
      { name: 'Elettrico' },
    ];
    this.dialogsService.currentEditVehicleView.subscribe(
      (editVehicleView) => (this.editMode = editVehicleView)
    );
    //Context Menu
    this.options = [
      {
        label: 'Modifica',
        icon: 'pi pi-fw pi-pencil',
      }
    ];

    this.user = JSON.parse(sessionStorage.getItem('user'));
    //Manca il companyName nell'utente che mi viene restituito
    this.companyName = this.user.companyName;
  }

  loadVehicle(){
    this.vehicleService
      .GetListVehicleByUser(sessionStorage.getItem('email'))
      .subscribe((data: any) => {
        this.vehicles = data;
        this.listLength = this.vehicles.data.length;
        // console.log('The vehicles are: ', this.vehicles.data);
      });
  }

  vehicleEditingForm: FormGroup = this.fb.group({
    companyName: ['Reply'], //sostituire non appena viene modificata l'API
    licensePlate: ['', Validators.required], //
    brand: ['', Validators.required], //
    model: ['', Validators.required], //
    fuelType: [<fuelTypes | null>null],
    engineDisplacement: ['', Validators.required],
    km: ['', Validators.required], //
    litersTank: ['', Validators.required],
    weight: ['', Validators.required],
    maxLoad: ['', Validators.required],
    urbanConsumption: ['', Validators.required],
    extraUrbanConsumption: ['', Validators.required],
    email: [sessionStorage.getItem('email')],
    //Tutti float tranne cilindrata e litri serbatoio
  });

  enableEditing(index: number) {
    this.editMode = index;
  }

  closeEditing() {
    this.editMode = -1;
    this.loadVehicle();
  }

  showVehicleDetails(vehicle: any, ri: any) {
    console.log('Selected vehicle: ', vehicle);
    console.log('Selected vehicle index: ', ri);
    this.selectedVehicle = this.vehicles.data[ri];
    console.log('Selected vehicle: ', this.selectedVehicle);
    this.vehicleDetails = !this.vehicleDetails;
  }

  saveEdit(){
    this.vehicleEditingForm.patchValue({
      licensePlate: this.vehicles.data[this.editMode].licensePlate,
    });
    console.log(this.vehicleEditingForm.value);
    this.vehicleService.EditVehicle(this.vehicleEditingForm.value).subscribe((data: any) => {
      console.log(data);
      if (data.code === 0){
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Vehicle edited',
        });
      }
      this.editMode = -1;
      this.loadVehicle();
    });
  }

}
