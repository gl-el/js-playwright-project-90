import { expect, type Locator, type Page } from "@playwright/test";

import { BasePage, SidebarMenu } from "./BasePages";

export class TasksListPage extends BasePage {
  readonly heading: Locator;
  readonly createBtn: Locator;
  readonly sidebar: SidebarMenu;

  constructor(page: Page) {
    super(page, "/#/tasks");
    this.heading = this.page.getByRole("heading", { name: "Tasks" });
    this.createBtn = this.page.getByRole("link", { name: "Create" });
    this.sidebar = new SidebarMenu(page);
  }

  async clickCreateBtn() {
    await this.createBtn.click();
    expect(this.page.url()).toContain("/create");
  }

  getTaskByTitle(title: string) {
    return this.page.getByText(`${title}`, { exact: true });
  }

  getTask(status = "draft", order = 0): Locator {
    const heading = this.page.getByRole("heading", { name: status, exact: false });
    const siblingButtons = heading.locator("xpath=following-sibling::*").getByRole("button");
    return siblingButtons.nth(order);
  }

  async getTaskTitle(task: Locator) {
    return (await task.innerText()).trim();
  }

  async clickEdit(task: Locator) {
    const editLink = task.getByRole("link", { name: "Edit" });
    await editLink.click();
  }
}
