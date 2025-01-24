import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {
  userForm: FormGroup; // Main user form
  fieldTypes = ['text', 'textarea', 'dropdown', 'checkbox', 'radio']; // Dynamic field types

  isSmallScreen$: Observable<boolean>;

  constructor(private fb: FormBuilder, private breakpointObserver: BreakpointObserver) {
    this.isSmallScreen$ = this.breakpointObserver.observe([Breakpoints.Handset])
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      contacts: this.fb.array([]),
      additionalFields: this.fb.array([]),
    });

    // Set up screen size detection
    this.isSmallScreen$ = this.breakpointObserver.observe([Breakpoints.Handset])
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
  }

  ngOnInit() {
    this.isSmallScreen$.subscribe(isSmallScreen => {
      console.log('Is small screen:', isSmallScreen);
    });
  }
  getOptionsArray(field: any): FormArray {
    return field.get('options') as FormArray;
  }
  addOption(field: any) {
    const options = this.getOptionsArray(field);
    options.push(this.fb.control(''));
  }
    
  // Getters for form arrays
  get contacts(): FormArray {
    return this.userForm.get('contacts') as FormArray;
  }

  get additionalFields(): FormArray {
    return this.userForm.get('additionalFields') as FormArray;
  }

  // Add a new contact field
  addContact() {
    const contactGroup = this.fb.group({
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
    this.contacts.push(contactGroup);
  }

  // Remove a contact field
  removeContact(index: number) {
    this.contacts.removeAt(index);
  }

  // Add a user-defined dynamic field
  addDynamicField(type: string) {
    const fieldGroup = this.fb.group({
      type: [type],
      label: ['', Validators.required],
      placeholder: [''],
      options: this.fb.array(type === 'dropdown' || type === 'radio' ? [''] : []),
      required: [false],
    });
    this.additionalFields.push(fieldGroup);
  }

  // Remove a user-defined dynamic field
  removeDynamicField(index: number) {
    this.additionalFields.removeAt(index);
  }

  // Handle form submission
  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form Data:', this.userForm.value);
      alert('Form submitted successfully!');
    } else {
      alert('Please fix the errors in the form.');
    }
  }
  
}