import { type Page } from "@playwright/test";
import { makeLabel, makeStatus, makeUser } from "./factories.ts";

import { LabelsListPage } from "@pages/LabelsListPage.ts";
import { CreateEditLabelPage } from "@pages/CreateEditLabelPage.ts";
import { StatusesListPage } from "@pages/StatusesListPage.ts";
import { CreateEditStatusPage } from "@pages/CreateEditStatusPage.ts";
import { UserPage } from "@pages/UserPage.ts";
import { CreateEditUserPage } from "@pages/CreateEditUserPage.ts";
import { BaseCreateEditPage, BaseTablePage } from "@pages/BasePages";
import { createEditEntity } from "tests/utils/createEditEntity.ts";

export type LabelPayload = {
  name: string;
};

export type StatusPayload = {
  name: string;
  slug: string;
};

export type UserPayload = {
  email: string;
  name: string;
  surname: string;
};

export type EntityDescriptor<
  TList extends BaseTablePage = BaseTablePage,
  TEdit extends BaseCreateEditPage = BaseCreateEditPage,
  TPayload extends Record<string, string> = Record<string, string>,
> = {
  key: string;
  listPageClass: new (page: Page) => TList;
  editPageClass: new (page: Page) => TEdit;
  makePayload: (suffix?: string) => TPayload;
  identifier: "name" | "email";
  saveMethod: (editPage: TEdit, payload: TPayload) => Promise<void>;
  createEdit: (page: Page, suffix?: string, isCreate?: boolean) => Promise<string>;
};

export type LabelDescriptor = EntityDescriptor<LabelsListPage, CreateEditLabelPage, LabelPayload> & {
  key: "labels";
  identifier: "name";
};

export type StatusDescriptor = EntityDescriptor<StatusesListPage, CreateEditStatusPage, StatusPayload> & {
  key: "statuses";
  identifier: "name";
};

export type UserDescriptor = EntityDescriptor<UserPage, CreateEditUserPage, UserPayload> & {
  key: "users";
  identifier: "email";
};

export type AnyDescriptor = LabelDescriptor | StatusDescriptor | UserDescriptor;

const labelBase: Omit<LabelDescriptor, "createEdit"> = {
  key: "labels",
  listPageClass: LabelsListPage,
  editPageClass: CreateEditLabelPage,
  makePayload: (suf?: string) => makeLabel(suf),
  saveMethod: async (editPage: CreateEditLabelPage, payload: LabelPayload) => {
    await editPage.saveLabel(payload.name);
  },
  identifier: "name",
};

const statusBase: Omit<StatusDescriptor, "createEdit"> = {
  key: "statuses",
  listPageClass: StatusesListPage,
  editPageClass: CreateEditStatusPage,
  makePayload: (suf?: string) => makeStatus(suf),
  saveMethod: async (editPage: CreateEditStatusPage, payload: StatusPayload) => {
    await editPage.saveStatus(payload);
  },
  identifier: "name",
};

const userBase: Omit<UserDescriptor, "createEdit"> = {
  key: "users",
  listPageClass: UserPage,
  editPageClass: CreateEditUserPage,
  makePayload: (suf?: string) => makeUser(suf),
  saveMethod: async (editPage: CreateEditUserPage, payload: UserPayload) => {
    await editPage.saveUser(payload);
  },
  identifier: "email",
};

export const descriptors: AnyDescriptor[] = [
  {
    ...labelBase,
    createEdit: (page: Page, suf?: string, isCreate?: boolean) =>
      createEditEntity(
        page,
        labelBase.editPageClass,
        labelBase.makePayload,
        labelBase.saveMethod,
        labelBase.key,
        suf,
        isCreate
      ),
  },
  {
    ...statusBase,
    createEdit: (page: Page, suf?: string, isCreate?: boolean) =>
      createEditEntity(
        page,
        statusBase.editPageClass,
        statusBase.makePayload,
        statusBase.saveMethod,
        statusBase.key,
        suf,
        isCreate
      ),
  },
  {
    ...userBase,
    createEdit: (page: Page, suf?: string, isCreate?: boolean) =>
      createEditEntity(
        page,
        userBase.editPageClass,
        userBase.makePayload,
        userBase.saveMethod,
        userBase.key,
        suf,
        isCreate
      ),
  },
];
