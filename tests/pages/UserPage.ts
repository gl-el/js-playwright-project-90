import { expect, Locator, Page } from "@playwright/test";
import { BaseTablePage } from "./BasePages";
import { IUserProps } from "../types";

export class UserPage extends BaseTablePage {
  readonly heading: Locator;

  constructor(page: Page) {
    super(page, "/#/users");
    this.heading = this.page.getByRole("heading", { name: "Users" });
  }

  async clickCreateBtn() {
    await this.createBtn.click();
    await expect(this.page.url()).toContain("/create");
  }

  getRowByUser({ name, surname, email }: IUserProps) {
    return this.page
      .getByRole("row")
      .filter({ has: this.page.getByRole("cell", { name: name }) })
      .filter({ has: this.page.getByRole("cell", { name: surname }) })
      .filter({ has: this.page.getByRole("cell", { name: email }) });
  }

  getRowByEmail(email: string) {
    return this.page.getByRole("row").filter({ has: this.page.getByRole("cell", { name: email }) });
  }
}
