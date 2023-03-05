import {
	IErrorWithMessage,
	IErrorWithPayload,
	UserType,
} from '@/interfaces/Process';
import { IExpert, IReqBE, IRequestItem } from '@/interfaces/Requests';
import { IResponse } from '@/interfaces/Response';

let taskID = 0;

function* generateTaskID() {
	while (true) {
		yield taskID++;
	}
}
class TaskRecords {
	userTasks: Record<string, IReqBE[]>;
	user: Record<string, UserType>;
	experts: IExpert[];
	totalUsers: number;
	noExpertAvailable: boolean;
	constructor() {
		this.userTasks = {};
		this.user = {};
		this.totalUsers = 0;
		this.experts = [];
		this.noExpertAvailable = true;
	}

	addDays(days: number): number {
		return new Date().getTime() + 3600 * 1000 * 24 * days;
	}
	updateExpertTime(
		expertAvl: IExpert,
		newDeadline: number,
		userID: string
	): void {
		this.experts = this.experts.map((expert) => {
			if (expert.id === expertAvl.id)
				return {
					...expert,
					busyUntil: newDeadline,
					assignedTaskUserID: userID,
				};
			return { ...expert };
		});
	}
	addTaskBasedOnAvailability(task: IRequestItem, userID: string): IReqBE {
		const maxTimeAllowed = this.addDays(task.defaultDeadlineInDays);
		const newID = generateTaskID().next().value;
		if (this.noExpertAvailable)
			return {
				...task,
				status: 'Queued',
				maxTimeAllowed,
				currTaskID: `${process.env.RANDOM_TASK_ID}${newID}`,
			};
		const expertAvl = this.experts.find(
			(expert) => expert.busyUntil <= task.defaultDeadlineInDays
		);
		if (expertAvl) {
			this.updateExpertTime(expertAvl, maxTimeAllowed, userID);
			return {
				...task,
				status: 'Assigned',
				maxTimeAllowed,
				assignedExpertID: expertAvl.id,
				currTaskID: `${process.env.RANDOM_TASK_ID}${newID}`,
			};
		}
		return {
			...task,
			status: 'Queued',
			maxTimeAllowed,
			currTaskID: `${process.env.RANDOM_TASK_ID}${newID}`,
		};
	}
	addTaskByUser(user: string, task: IRequestItem): IErrorWithMessage {
		const id = user;
		if (!this.user[id]) {
			return { error: true, message: `User '${id}' not found` };
		}
		if (!this.userTasks[id]) {
			this.userTasks[id] = [{ ...this.addTaskBasedOnAvailability(task, user) }];
			return { error: false };
		} else {
			if (this.userTasks[id].length > 999)
				return {
					error: true,
					message: 'This user can add upto maximum 1000 tasks.',
				};
			else this.userTasks[id].push(this.addTaskBasedOnAvailability(task, user));
			return { error: false };
		}
	}
	addUser(userType: UserType): IErrorWithMessage {
		if (this.totalUsers > 50)
			return { error: true, message: 'Maximum 50 users supported' };
		const id = `${process.env.RANDOM_INIT_STRING}${this.totalUsers + 1}`;
		this.user[id] = userType;
		if (userType === 'Expert') {
			this.experts.push({ busyUntil: -1, id });
			this.noExpertAvailable = false;
		}
		this.totalUsers++;
		return { error: false, message: id };
	}
	resolveByExpert(
		taskID: string,
		expertID: string,
		userID: string
	): IResponse<null> {
		// Resolve Task
		const tasks = this.userTasks[userID];
		if (!tasks)
			return {
				error: true,
				message: `Unable to find the user with ID '${userID}'`,
				status: 422,
			};
		const index = tasks.findIndex((task) => task.currTaskID === taskID);
		if (index !== -1)
			return {
				error: true,
				message: `Unable to find the task with ID '${taskID}'`,
				status: 422,
			};
		this.userTasks[userID][index].status = 'Completed';
		// Update Expert time
		const expert = this.experts.find((expert) => expert.id === expertID);
		if (expert) expert.busyUntil = -1;
		return {
			error: false,
			status: 201,
		};
	}
	expireTasks(userID: string): IReqBE[] {
		const currTime = new Date().getTime();
		this.userTasks[userID] = this.userTasks[userID].map((task) => {
			if (currTime > task.maxTimeAllowed) return { ...task, status: 'Expired' };
			return { ...task };
		});
		return this.userTasks[userID];
	}
	getTasksByUserID(user: string): IReqBE[] {
		const tasks = this.userTasks[user];
		if (!tasks) return [];
		return this.expireTasks(user);
	}
}

let taskRecords: TaskRecords;

let globalItems = global as unknown as { taskRecords: TaskRecords };
if (!globalItems.taskRecords) {
	taskRecords = new TaskRecords();
	globalItems.taskRecords = taskRecords;
} else taskRecords = globalItems.taskRecords;
export default taskRecords;
