import { Locator, Page } from "@playwright/test";
import { SidebarMenu } from "./SidebarMenu";
import { BasePage } from "./BasePage";

export class BaseCreateEditPage extends BasePage {
  readonly saveBtn: Locator;
  readonly delBtn: Locator;

  readonly sidebar: SidebarMenu;

  constructor(page: Page, url: string) {
    super(page, url);
    this.saveBtn = this.page.getByRole("button", { name: "Save" });
    this.delBtn = this.page.getByRole("button", { name: "Delete" });

    this.sidebar = new SidebarMenu(page);
  }
}
