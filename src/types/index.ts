
export type ResourceType = 
  | 'code'
  | 'markdown'
  | 'pdf'
  | 'presentation'
  | 'spreadsheet'
  | 'document'
  | 'other';

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  content: string; // URL or content
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  tags: string[];
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}
