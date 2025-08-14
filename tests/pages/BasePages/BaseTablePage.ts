import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { SidebarMenu } from "./SidebarMenu";

export abstract class BaseTablePage extends BasePage {
  readonly createBtn: Locator;
  readonly sidebar: SidebarMenu;
  readonly delBtn: Locator;
  readonly selectAllCheck: Locator;
  readonly emptyText: Locator;

  protected constructor(page: Page, url: string) {
    super(page, url);
    this.createBtn = this.page.getByRole("link", { name: "Create" });
    this.sidebar = new SidebarMenu(page);
    this.delBtn = this.page.getByRole("button", { name: "Delete" });
    this.selectAllCheck = this.page.getByRole("checkbox", { name: "Select all" });
    this.emptyText = this.page.getByText("Do you want to add one?");
  }

  getTableCell(rowIndex: number, cellIndex: number): Locator {
    return this.page.getByRole("rowgroup").nth(1).getByRole("row").nth(rowIndex).getByRole("cell").nth(cellIndex);
  }

  async selectAll() {
    await this.selectAllCheck.check();
  }

  async deleteSelected() {
    await this.delBtn.click();
  }
}
