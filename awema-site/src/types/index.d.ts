export interface IChildNavigationLink {
  name: string;
  url: string;
  description?: string;
  icon?: string;
}

export interface INavigationLink {
  name: string;
  url?: string;
  hasChildren?: boolean;
  children?: INavigationLink[];
}
