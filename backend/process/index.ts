import { IErrorWithMessage, UserType } from '@/interfaces/Process';
import { IRequestItem } from '@/interfaces/Requests';

class TaskRecords {
	userTasks: Record<string, IRequestItem[]>;
	user: Record<string, UserType>;
	totalUsers: number;
	constructor() {
		this.userTasks = {};
		this.user = {};
		this.totalUsers = 0;
	}
	addTaskByUser(user: string, task: IRequestItem): IErrorWithMessage {
		const id = user;
		if (!this.user[id]) {
			console.log(this.user);
			return { error: true, message: `User '${id}' not found` };
		}
		if (!this.userTasks[id]) {
			this.userTasks[id] = [{ ...task }];
			return { error: false };
		} else {
			if (this.userTasks[id].length > 999)
				return {
					error: true,
					message: 'This user can add upto maximum 1000 tasks.',
				};
			else {
				this.userTasks[id].push({ ...task });
			}
			return { error: false };
		}
	}
	addUser(userType: UserType): IErrorWithMessage {
		if (this.totalUsers > 50)
			return { error: true, message: 'Maximum 50 users supported' };
		const id = `${process.env.RANDOM_INIT_STRING}${this.totalUsers + 1}`;
		this.user[id] = userType;
		this.totalUsers++;
		return { error: false, message: id };
	}
}

let taskRecords: TaskRecords;

let globalItems = global as unknown as { taskRecords: TaskRecords };
if (!globalItems.taskRecords) {
	taskRecords = new TaskRecords();
	globalItems.taskRecords = taskRecords;
} else taskRecords = globalItems.taskRecords;
export default taskRecords;
