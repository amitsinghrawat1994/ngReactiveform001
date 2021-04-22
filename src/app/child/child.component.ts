import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { ContactInfo } from "./../model/contact.model";

@Component({
  selector: "app-child",
  templateUrl: "./child.component.html",
  styleUrls: ["./child.component.scss"]
})
export class ChildComponent implements OnInit, OnChanges {
  @Input()
  info: ContactInfo;
  @Output() infoChange = new EventEmitter<ContactInfo>();

  public myForm: FormGroup;

  get f() {
    return this.myForm.controls;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();

    this.setTracking();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setValue();
  }

  public setValue(): void {
    if (this.info) {
      this.myForm.patchValue(this.info);
    }
  }

  public createForm(): void {
    this.myForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required]],
      message: ["", [Validators.required]]
    });
  }

  public setTracking(): void {
    this.myForm.valueChanges
      .pipe(
        debounceTime(250),
        distinctUntilChanged()
      )
      .subscribe((value: ContactInfo) => {
        console.log("setTracking called");
        this.infoChange.emit(value);
      });
  }

  onSubmit(): void {
    console.log("Valid?", this.myForm.valid); // true or false
    console.log("Name", this.myForm.controls.name.value);
    console.log("Email", this.myForm.controls.email.value);
    console.log("Message", this.myForm.controls.message.value);
  }
}
