import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  readonly loginInput: Locator;
  readonly passInput: Locator;
  readonly signInBtn: Locator;

  constructor(page: Page) {
    super(page, "/");
    this.loginInput = this.page.getByRole("textbox", { name: "Username" });
    this.passInput = this.page.getByRole("textbox", { name: "Password" });
    this.signInBtn = this.page.getByRole("button", { name: "Sign in" });
  }

  async login(username: string, password: string) {
    await this.loginInput.fill(username);
    await this.passInput.fill(password);
    await this.signInBtn.click();
  }
}
