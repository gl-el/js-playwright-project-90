import { type Page, type Locator, expect } from "@playwright/test";

export class SidebarMenu {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private getMenuItem(name: string): Locator {
    return this.page.getByRole("menuitem", { name });
  }

  async clickMenu(name: string) {
    const item = this.getMenuItem(name);
    await expect(item).toBeVisible();
    await item.click();
  }
}
