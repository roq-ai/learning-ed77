import { ExamInterface } from 'interfaces/exam';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CertificateInterface {
  id?: string;
  title: string;
  description?: string;
  exam_id: string;
  user_id: string;
  date_created?: any;
  last_updated?: any;
  created_at?: any;
  updated_at?: any;

  exam?: ExamInterface;
  user?: UserInterface;
  _count?: {};
}

export interface CertificateGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  description?: string;
  exam_id?: string;
  user_id?: string;
}
