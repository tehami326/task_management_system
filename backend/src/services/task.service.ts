import prisma from "../utils/prisma";

export const createTask = async (
    userId: string,
    title: string,
    description?: string
) => {
    if (!title) {
        throw new Error("TITLE_REQUIRED");
    }

    const task = await prisma.task.create({
        data: {
            title,
            description,
            userId,
        },
    });


    return task;
};

export const getTasks = async (
    userId: string,
    page = 1,
    limit = 10,
    status?: string,
    search?: string
) => {
    const skip = (page - 1) * limit;

    const where: any = {
        userId,
    };

    if (status === "completed") {
        where.completed = true;
    }

    if (status === "pending") {
        where.completed = false;
    }

    if (search) {
        where.title = {
            contains: search,
            mode: "insensitive",
        };
    }

    const [tasks, total] = await Promise.all([
        prisma.task.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                createdAt: "desc",
            },
        }),
        prisma.task.count({ where }),
    ]);

    return {
        tasks,
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
};

export const getTaskById = async (
    userId: string,
    taskId: string
) => {
    const task = await prisma.task.findFirst({
        where: {
            id: taskId,
            userId,
        },
    });

    if (!task) {
        throw new Error("TASK_NOT_FOUND");
    }

    return task;
};

export const updateTask = async (
    userId: string,
    taskId: string,
    title?: string,
    description?: string
) => {
    const task = await prisma.task.findFirst({
        where: {
            id: taskId,
            userId,
        },
    });

    if (!task) {
        throw new Error("TASK_NOT_FOUND");
    }

    return prisma.task.update({
        where: { id: taskId },
        data: {
            title,
            description,
        },
    });
};

export const deleteTask = async (
    userId: string,
    taskId: string
) => {
    const task = await prisma.task.findFirst({
        where: {
            id: taskId,
            userId,
        },
    });

    if (!task) {
        throw new Error("TASK_NOT_FOUND");
    }

    await prisma.task.delete({
        where: { id: taskId },
    });
};

export const toggleTaskStatus = async (
    userId: string,
    taskId: string
) => {
    const task = await prisma.task.findFirst({
        where: {
            id: taskId,
            userId,
        },
    });

    if (!task) {
        throw new Error("TASK_NOT_FOUND");
    }

    return prisma.task.update({
        where: { id: taskId },
        data: {
            completed: !task.completed,
        },
    });
};


