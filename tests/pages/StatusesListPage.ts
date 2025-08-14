import { expect, type Locator, type Page } from "@playwright/test";

import { BaseTablePage } from "./BasePages";

export class StatusesListPage extends BaseTablePage {
  readonly heading: Locator;

  constructor(page: Page) {
    super(page, "/#/task_statuses");
    this.heading = this.page.getByRole("heading", { name: "Task statuses" });
  }

  async clickCreateBtn() {
    await this.createBtn.click();
    expect(this.page.url()).toContain("/create");
  }

  getRowByName(name: string | null) {
    if (!name) {
      throw new Error(`getRowByName: name is ${name}`);
    }

    return this.page.getByRole("row").filter({ has: this.page.getByRole("cell", { name }) });
  }
}
