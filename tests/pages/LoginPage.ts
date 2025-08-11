import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly loginInput: Locator;
  readonly passInput: Locator;
  readonly signInBtn: Locator;

  constructor(private page: Page) {
    this.page = page;
    this.loginInput = this.page.getByRole("textbox", { name: "Username" });
    this.passInput = this.page.getByRole("textbox", { name: "Password" });
    this.signInBtn = this.page.getByRole("button", { name: "Sign in" });
  }

  async goto() {
    await this.page.goto("http://localhost:5173/#/login");
  }

  async isVisible() {
    await expect(this.loginInput).toBeVisible();
    await expect(this.passInput).toBeVisible();
    await expect(this.signInBtn).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.isVisible();

    await this.page.getByRole("textbox", { name: "Username" }).fill(username);
    await this.page.getByRole("textbox", { name: "Password" }).fill(password);
    await this.page.getByRole("button", { name: "Sign in" }).click();
  }
}
