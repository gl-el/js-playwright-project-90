import { expect, test } from "@playwright/test";
import { LabelsListPage } from "@pages/LabelsListPage.ts";
import { CreateEditLabelPage } from "@pages/CreateEditLabelPage.ts";

test.describe("delete labels", () => {
  test("should delete one label", async ({ page }) => {
    const labelList = new LabelsListPage(page);
    const editPage = new CreateEditLabelPage(page);

    await labelList.goto();
    await expect(labelList.heading).toBeVisible();

    const nameCell = labelList.getTableCell(0, 2);
    const name = await nameCell.textContent();
    expect(name, "Name must not be null").not.toBeNull();

    await nameCell.click();
    await expect(editPage.heading).toContainText(name as string);
    await editPage.deleteStatus();
    await expect(labelList.getRowByName(name)).toBeHidden();
  });

  test("should delete multiple statuses", async ({ page }) => {
    const labelList = new LabelsListPage(page);

    await labelList.goto();
    await expect(labelList.heading).toBeVisible();

    const firstName = await labelList.getTableCell(0, 2).textContent();
    const secondName = await labelList.getTableCell(1, 2).textContent();

    await labelList.getRowByName(firstName).getByRole("checkbox").check();
    await labelList.getRowByName(secondName).getByRole("checkbox").check();

    await labelList.deleteSelected();
    await expect(labelList.getRowByName(firstName)).toBeHidden();
    await expect(labelList.getRowByName(firstName)).toBeHidden();
  });

  test("should mass delete statuses", async ({ page }) => {
    const labelList = new LabelsListPage(page);
    await labelList.goto();
    await expect(labelList.heading).toBeVisible();

    await labelList.selectAll();
    await labelList.deleteSelected();

    await expect(labelList.emptyText).toBeVisible();
  });
});
