import { expect, Locator, Page } from "@playwright/test";
import { SidebarMenu } from "./SidebarMenu";

export class DashboardPage {
  readonly heading: Locator;
  readonly profileBtn: Locator;
  readonly logoutItem: Locator;
  readonly sidebar: SidebarMenu;

  constructor(private page: Page) {
    this.page = page;
    this.heading = this.page.getByRole("heading", { name: "Welcome to the administration" });
    this.profileBtn = this.page.getByRole("button", { name: "Profile" });
    this.logoutItem = this.page.getByRole("menuitem", { name: "Logout" });
    this.sidebar = new SidebarMenu(page);
  }

  async goto() {
    await this.page.goto("/");
  }

  async waitForLoad() {
    await expect(this.heading).toBeVisible();
  }

  async logout() {
    await this.profileBtn.click();
    await this.logoutItem.click();
  }
}
