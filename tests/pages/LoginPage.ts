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
    await this.page.goto("/");
  }

  async isVisible() {
    await expect(this.loginInput).toBeVisible();
    await expect(this.passInput).toBeVisible();
    await expect(this.signInBtn).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.loginInput.fill(username);
    await this.passInput.fill(password);
    await this.signInBtn.click();
  }
}
