import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './details.template.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params["id"])
    this.housingService.getHousingLocationById(housingLocationId)
      .then(housingLocation => {
        this.housingLocation = housingLocation;
      });
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    );
  }

}
