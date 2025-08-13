import { expect, Locator, Page } from "@playwright/test";
import { SidebarMenu } from "./SidebarMenu";
import { BasePage } from "./BasePage";
import { IUserProps } from "../types";

export class UserPage extends BasePage {
  readonly createBtn: Locator;
  readonly heading: Locator;
  readonly sidebar: SidebarMenu;
  readonly delBtn: Locator;
  readonly selectAllCheck: Locator;
  readonly emptyText: Locator;

  constructor(page: Page) {
    super(page, "/#/users");
    this.createBtn = this.page.getByRole("link", { name: "Create" });
    this.heading = this.page.getByRole("heading", { name: "Users" });
    this.sidebar = new SidebarMenu(page);
    this.delBtn = this.page.getByRole("button", { name: "Delete" });
    this.selectAllCheck = this.page.getByRole("checkbox", { name: "Select all" });
    this.emptyText = this.page.getByText("No Users yet.");
  }

  async clickCreateBtn() {
    await this.createBtn.click();
    await expect(this.page.url()).toContain("/create");
  }

  getRowByUser({ name, surname, email }: IUserProps) {
    return this.page
      .getByRole("row")
      .filter({ has: this.page.getByRole("cell", { name: name }) })
      .filter({ has: this.page.getByRole("cell", { name: surname }) })
      .filter({ has: this.page.getByRole("cell", { name: email }) });
  }

  getRowByEmail(email: string) {
    return this.page.getByRole("row").filter({ has: this.page.getByRole("cell", { name: email }) });
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
