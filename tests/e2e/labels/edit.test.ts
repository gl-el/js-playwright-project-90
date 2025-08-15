import { expect, test } from "@playwright/test";
import { LabelsListPage } from "@pages/LabelsListPage.ts";
import { CreateEditLabelPage } from "@pages/CreateEditLabelPage.ts";
import { NEW_LABEL } from "tests/testData";

test("should edit label", async ({ page }) => {
  const labelsPage = new LabelsListPage(page);
  const editPage = new CreateEditLabelPage(page);

  await labelsPage.goto();
  await expect(labelsPage.heading).toBeVisible();

  const cell = labelsPage.getTableCell(0, 2);
  const name = await cell.textContent();
  await cell.click();
  await editPage.saveLabel(NEW_LABEL);

  await expect(labelsPage.heading).toBeVisible();

  await expect(labelsPage.getRowByName(name)).toBeHidden();
  await expect(labelsPage.getRowByName(NEW_LABEL)).toBeVisible();
});
