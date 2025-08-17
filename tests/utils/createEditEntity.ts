import { BaseCreateEditPage } from "@pages/BasePages";
import type { Page } from "@playwright/test";

export const createEditEntity = async <TEdit extends BaseCreateEditPage, TPayload extends Record<string, string>>(
  page: Page,
  EditClass: new (page: Page) => TEdit,
  makePayload: (suf?: string) => TPayload,
  saveMethod: (editPage: TEdit, payload: TPayload) => Promise<void>,
  key: string,
  suf?: string,
  isCreate = true
) => {
  const editPage = new EditClass(page);
  const payload = makePayload(suf);
  await saveMethod(editPage, payload);
  if (isCreate) {
    await editPage.sidebar.clickMenu(key);
  }
  return payload.name;
};
