import { expect, Locator, Page } from "@playwright/test";

export class DashboardPage {
  readonly heading: Locator;
  readonly profileBtn: Locator;
  readonly logoutItem: Locator;

  constructor(private page: Page) {
    this.page = page;
    this.heading = this.page.getByRole("heading", { name: "Welcome to the administration" });
    this.profileBtn = this.page.getByRole("button", { name: "Profile" });
    this.logoutItem = this.page.getByRole("menuitem", { name: "Logout" });
  }

  async goto() {
    await this.page.goto("http://localhost:5173/");
  }

  async isDashboardVisible() {
    await expect(this.heading).toBeVisible();
  }

  async logout() {
    await this.profileBtn.click();
    await expect(this.logoutItem).toBeVisible();
    await this.logoutItem.click();
  }
}
