import { type Locator, type Page } from "@playwright/test";
import { BaseCreateEditPage } from "./BasePages";

export class CreateEditLabelPage extends BaseCreateEditPage {
  readonly heading: Locator;
  readonly name: Locator;

  constructor(page: Page) {
    super(page, "/#/labels");
    this.heading = this.page.getByRole("heading", { name: "Label" });
    this.name = this.page.getByLabel("Name");
  }

  async saveLabel(name: string) {
    await this.name.fill(name);
    await this.saveBtn.click();
  }

  async deleteStatus() {
    await this.delBtn.click();
  }
}
