import { type Locator, type Page } from "@playwright/test";
import { type IStatusProps } from "../types";
import { BaseCreateEditPage } from "./BasePages";

export class CreateEditStatusPage extends BaseCreateEditPage {
  readonly heading: Locator;
  readonly name: Locator;
  readonly slug: Locator;

  constructor(page: Page) {
    super(page, "/#/users");
    this.heading = this.page.getByRole("heading", { name: "Task status" });
    this.name = this.page.getByLabel("Name");
    this.slug = this.page.getByLabel("Slug");
  }

  async saveStatus({ name, slug }: IStatusProps) {
    await this.name.fill(name);
    await this.slug.fill(slug);
    await this.saveBtn.click();
  }

  async deleteStatus() {
    await this.delBtn.click();
  }
}
