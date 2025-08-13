import { Locator, Page } from "@playwright/test";
import { SidebarMenu } from "./SidebarMenu";
import { BasePage } from "./BasePage";
import { IUserProps } from "../types";

export class CreateEditPage extends BasePage {
  readonly saveBtn: Locator;
  readonly heading: Locator;
  readonly email: Locator;
  readonly name: Locator;
  readonly surname: Locator;
  readonly sidebar: SidebarMenu;
  readonly delBtn: Locator;

  constructor(page: Page) {
    super(page, "/#/users");
    this.heading = this.page.getByRole("heading", { name: "User" });
    this.email = this.page.getByLabel("Email");
    this.name = this.page.getByLabel("First Name");
    this.surname = this.page.getByLabel("Last Name");
    this.saveBtn = this.page.getByRole("button", { name: "Save" });
    this.delBtn = this.page.getByRole("button", { name: "Delete" });

    this.sidebar = new SidebarMenu(page);
  }

  async saveUser({ email, name, surname }: IUserProps) {
    await this.email.fill(email);
    await this.name.fill(name);
    await this.surname.fill(surname);
    await this.saveBtn.click();
  }

  async deleteUser() {
    await this.delBtn.click();
  }
}
