import { Page } from "@playwright/test";

export class BasePage {
  constructor(
    protected readonly page: Page,
    private readonly url: string
  ) {}

  async goto() {
    await this.page.goto(this.url);
  }
}
