import { ExamInterface } from 'interfaces/exam';
import { ModuleInterface } from 'interfaces/module';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface CourseInterface {
  id?: string;
  title: string;
  description?: string;
  fee: number;
  organization_id: string;
  date_created?: any;
  last_updated?: any;
  created_at?: any;
  updated_at?: any;
  exam?: ExamInterface[];
  module?: ModuleInterface[];
  organization?: OrganizationInterface;
  _count?: {
    exam?: number;
    module?: number;
  };
}

export interface CourseGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  description?: string;
  organization_id?: string;
}
