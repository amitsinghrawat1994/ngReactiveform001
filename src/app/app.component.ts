import { Component } from "@angular/core";
import { ContactInfo } from "./model/contact.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "NewAngular";
  public contactInfo: ContactInfo;

  public onInfoChange(info: ContactInfo): void {
    this.contactInfo = info;
    console.log("data has been updated", info);
  }

  public onClean(): void {
    this.contactInfo = {
      email: "",
      message: "",
      name: ""
    };
  }
}
