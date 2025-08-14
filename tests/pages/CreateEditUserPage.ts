import { Locator, Page } from "@playwright/test";
import { BaseCreateEditPage } from "./BasePages";
import { IUserProps } from "../types";

export class CreateEditUserPage extends BaseCreateEditPage {
  readonly heading: Locator;
  readonly email: Locator;
  readonly name: Locator;
  readonly surname: Locator;

  constructor(page: Page) {
    super(page, "/#/users");
    this.heading = this.page.getByRole("heading", { name: "User" });
    this.email = this.page.getByLabel("Email");
    this.name = this.page.getByLabel("First Name");
    this.surname = this.page.getByLabel("Last Name");
  }

  async saveUser({ email, name, surname }: IUserProps) {
    await this.email.fill(email);
    await this.name.fill(name);
    await this.surname.fill(surname);
    await this.saveBtn.click();
  }

  async editEmail(email: string) {
    await this.email.fill(email);
    await this.saveBtn.click();
  }

  async deleteUser() {
    await this.delBtn.click();
  }
}
