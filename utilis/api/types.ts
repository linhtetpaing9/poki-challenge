export interface Modal {
  created?: string;
  updated?: string;
  isDeleted?: boolean;
}
export interface Product extends Modal {
  id: string;
  name: string;
  description: string;
  options: [
    {
      type: string;
      price: number;
      currency: string;
    }
  ];
  categories: [
    {
      name: string;
      parent: string;
      description: string;
      image: string;
    }
  ];
  image: string;
}

export interface Page extends Modal {
  id: string;
  name: string;
  tags: string[];
  isLayout: boolean;
  sections: [
    {
      name: string;
      order: number;
      [field: string]: any;
    }
  ];
}
