import { TaskStatus } from '@/interfaces/Process';
interface IRequestItem {
	name: string;
	id: string;
	defaultDeadlineInDays: number;
	defaultNumberInHours: number;
}
interface IExpert {
	id: string;
	busyUntil: number;
	assignedTaskUserID?: string;
}

type IReqBE = IRequestItem & {
	status: TaskStatus;
	maxTimeAllowed: number;
	assignedExpertID?: string;
	currTaskID: string;
};

export type { IRequestItem, IExpert, IReqBE };
