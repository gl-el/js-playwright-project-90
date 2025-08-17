import { type Locator, type Page } from "@playwright/test";
import { BaseCreateEditPage } from "./BasePages";
import { type ITaskProps } from "../types";

export class CreateEditTaskPage extends BaseCreateEditPage {
  readonly heading: Locator;
  readonly assignee: Locator;
  readonly title: Locator;
  readonly content: Locator;
  readonly status: Locator;
  readonly label: Locator;

  constructor(page: Page) {
    super(page, "/#/tasks");
    this.heading = this.page.getByRole("heading", { name: "Task" });
    this.assignee = this.page.getByLabel("Assignee");
    this.title = this.page.getByLabel("Title");
    this.content = this.page.getByRole("textbox", { name: "Content" });
    this.status = this.page.getByLabel("Status");
    this.label = this.page.getByRole("combobox", { name: "Label" });
  }

  private async selectOption(combobox: Locator, optionNumber: number, closeAfter = false) {
    await combobox.click();
    const listbox = this.page.getByRole("listbox");
    await listbox.waitFor({ state: "visible" });

    const options = this.page.getByRole("option");
    await options.nth(optionNumber).click();

    if (closeAfter) {
      await this.page.keyboard.press("Escape");
      await listbox.waitFor({ state: "hidden" }).catch(() => {});
    }
  }

  async createEditTask({ title, content, assigneeOption = 0, statusOption = 0, labelOption = 0 }: ITaskProps) {
    await this.selectOption(this.assignee, assigneeOption);
    await this.title.fill(title);
    await this.content.fill(content);
    await this.selectOption(this.status, statusOption);
    await this.selectOption(this.label, labelOption, true);

    await this.saveEntity();
  }

  async goToListPage() {
    await this.sidebar.clickMenu("tasks");
  }
}
