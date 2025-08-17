export interface IUserProps {
  email: string;
  name: string;
  surname: string;
}

export interface ITaskProps {
  title: string;
  content: string;
  assigneeOption?: number;
  statusOption?: number;
  labelOption?: number;
}
