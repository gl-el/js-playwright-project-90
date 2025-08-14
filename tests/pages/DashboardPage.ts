import { expect, type Locator, type Page } from "@playwright/test";
import { SidebarMenu, BasePage } from "./BasePages";

export class DashboardPage extends BasePage {
  readonly heading: Locator;
  readonly profileBtn: Locator;
  readonly logoutItem: Locator;
  readonly sidebar: SidebarMenu;

  constructor(page: Page) {
    super(page, "/");
    this.heading = this.page.getByRole("heading", { name: "Welcome to the administration" });
    this.profileBtn = this.page.getByRole("button", { name: "Profile" });
    this.logoutItem = this.page.getByRole("menuitem", { name: "Logout" });
    this.sidebar = new SidebarMenu(page);
  }

  async waitForLoad() {
    await expect(this.heading).toBeVisible();
  }

  async logout() {
    await this.profileBtn.click();
    await this.logoutItem.click();
  }
}
