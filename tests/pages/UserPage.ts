import { expect, Locator, Page } from "@playwright/test";

export class UserPage {
  readonly createBtn: Locator;
  readonly heading: Locator;

  constructor(private page: Page) {
    this.page = page;
    this.createBtn = this.page.getByRole("link", { name: "Create" });

    this.heading = this.page.getByRole("heading", { name: "Users" });
  }

  async goto() {
    await this.page.goto("/#/users");
  }

  async clickCreateBtn() {
    await this.createBtn.click();
    await expect(this.page.url()).toContain("/create");
  }
}
