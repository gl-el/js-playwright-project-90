import { BaseTablePage } from "@pages/BasePages";
import { expect, type Locator, type Page } from "@playwright/test";

export class LabelsListPage extends BaseTablePage {
  readonly heading: Locator;

  constructor(page: Page) {
    super(page, "/#/labels");
    this.heading = this.page.getByRole("heading", { name: "Labels" });
  }

  async clickCreateBtn() {
    await this.createBtn.click();
    expect(this.page.url()).toContain("/create");
  }
}
