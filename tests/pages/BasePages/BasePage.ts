import { type Page } from "@playwright/test";

export abstract class BasePage {
  protected constructor(
    readonly page: Page,
    private url: string
  ) {}

  async goto() {
    await this.page.goto(this.url);
  }
}
