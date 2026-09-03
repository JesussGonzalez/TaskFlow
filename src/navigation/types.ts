export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
};

export type RootTabParamList = {
    Home: undefined;
    Profile: undefined;
};

export type TaskStackParamList = {
    TaskList: undefined;
    TaskDetail: {
        taskId: string;
    };
    TaskForm: undefined;
};
