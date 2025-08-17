import { expect, test } from "@playwright/test";
import { makeTaskData } from "tests/utils/factories.ts";
import { TasksListPage } from "@pages/TasksListPage.ts";
import { CreateEditTaskPage } from "@pages/CreateEditTaskPage.ts";

test.describe("tasks - smoke", () => {
  test("create a new task", async ({ page }) => {
    const listPage = new TasksListPage(page);
    const editPage = new CreateEditTaskPage(page);

    await listPage.goto();
    await listPage.clickCreateBtn();

    const newTaskData = makeTaskData();

    await editPage.createEditTask(newTaskData);

    await expect(editPage.heading).toContainText(newTaskData.title);

    await editPage.goToListPage();
    await expect(listPage.getTaskByTitle(newTaskData.title)).toBeVisible();
  });

  test("edit task", async ({ page }) => {
    const listPage = new TasksListPage(page);
    const editPage = new CreateEditTaskPage(page);
    await listPage.goto();

    await expect(listPage.getTask()).toBeVisible();

    const task = listPage.getTask();

    const taskTitle = await listPage.getTaskTitle(task);
    await listPage.clickEdit(task);

    const newTaskData = makeTaskData();

    await editPage.createEditTask(newTaskData);
    await expect(page.getByText(taskTitle)).toBeHidden();
    await expect(listPage.getTaskByTitle(newTaskData.title)).toBeVisible();
  });
});
