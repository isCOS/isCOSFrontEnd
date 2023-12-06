import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from 'src/app/service/vehicle.service';
import { DialogsService } from 'src/app/service/dialogs.service';

interface fuelTypes {
  name: string;
}

@Component({
  selector: 'app-gestione-veicoli',
  templateUrl: './gestione-veicoli.component.html',
  styleUrls: ['./gestione-veicoli.component.scss'],
})
export class GestioneVeicoliComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private dialogsService: DialogsService
  ) {}

  fuelType: fuelTypes[] | undefined;
  continue: boolean = false;
  addVehicle: boolean = false;

  ngOnInit(): void {
    this.fuelType = [
      { name: 'Benzina' },
      { name: 'Diesel' },
      { name: 'GPL' },
      { name: 'Metano' },
      { name: 'Elettrico' },
    ];
    const email = sessionStorage.getItem('email');
    this.dialogsService.currentAddVehicleView.subscribe(
      (addVehicleView) => (this.addVehicle = addVehicleView)
    );
  }

  vehicleForm: FormGroup = this.fb.group({
    companyName: ['', Validators.required], //
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

  continueForm() {
    this.continue = !this.continue;
  }

  saveVehicle() {
    console.log(this.vehicleForm.value);
    this.vehicleService.AddVehicle(this.vehicleForm.value).subscribe((res) => {
      console.log(res);
      this.vehicleForm.reset();
      this.dialogsService.changeAddVehicleView(false);
    });
  }
}
