import { CourseInterface } from 'interfaces/course';
import { GetQueryInterface } from 'interfaces';

export interface ModuleInterface {
  id?: string;
  title: string;
  description?: string;
  course_id: string;
  date_created?: any;
  last_updated?: any;
  created_at?: any;
  updated_at?: any;

  course?: CourseInterface;
  _count?: {};
}

export interface ModuleGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  description?: string;
  course_id?: string;
}
