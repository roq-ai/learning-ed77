import { CertificateInterface } from 'interfaces/certificate';
import { CourseInterface } from 'interfaces/course';
import { GetQueryInterface } from 'interfaces';

export interface ExamInterface {
  id?: string;
  title: string;
  description?: string;
  course_id: string;
  date_created?: any;
  last_updated?: any;
  created_at?: any;
  updated_at?: any;
  certificate?: CertificateInterface[];
  course?: CourseInterface;
  _count?: {
    certificate?: number;
  };
}

export interface ExamGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  description?: string;
  course_id?: string;
}
