import { expect, type Locator, type Page } from "@playwright/test";
import { BaseTablePage } from "./BasePages";
import { type IUserProps } from "tests/types";

export class UserPage extends BaseTablePage {
  readonly heading: Locator;

  constructor(page: Page) {
    super(page, "/#/users");
    this.heading = this.page.getByRole("heading", { name: "Users" });
  }

  async clickCreateBtn() {
    await this.createBtn.click();
    expect(this.page.url()).toContain("/create");
  }

  getRowByUser({ name, surname, email }: IUserProps) {
    return this.page
      .getByRole("row")
      .filter({ has: this.page.getByRole("cell", { name: name }) })
      .filter({ has: this.page.getByRole("cell", { name: surname }) })
      .filter({ has: this.page.getByRole("cell", { name: email }) });
  }

  getRowByEmail(email: string | null) {
    if (!email) {
      throw new Error(`getRowByEmail: email is ${email}`);
    }

    return this.page.getByRole("row").filter({ has: this.page.getByRole("cell", { name: email }) });
  }
}
