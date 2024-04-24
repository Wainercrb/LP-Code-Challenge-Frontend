import { Operation } from "@/models/Operation";
import { User } from "@/models/User";

export interface Record {
  id: number;
  operation_id: number;
  user_id: number;
  amount: number;
  operation_response: string
  date: Date;
  user: User
  operation: Operation
}

