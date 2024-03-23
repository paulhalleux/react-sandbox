import { Edge, Node } from "reactflow";

export type Workflow = {
  tasks: Array<WorkflowTask>;
};

export enum TaskType {
  Simple = "Simple",
  Fork = "Fork",
  Join = "Join",
}

export type WorkflowTaskBase = {
  id: string;
  name: string;
};

export type WorkflowTask =
  | SimpleWorkflowTask
  | ForkWorkflowTask
  | JoinWorkflowTask;

export type SimpleWorkflowTask = WorkflowTaskBase & {
  type: TaskType.Simple;
};

export type ForkWorkflowTask = WorkflowTaskBase & {
  type: TaskType.Fork;
  branches: Array<{
    name: string;
    tasks: Array<WorkflowTask>;
  }>;
};

export type JoinWorkflowTask = WorkflowTaskBase & {
  type: TaskType.Join;
};

export type GraphEdge = Edge<{
  source: WorkflowTask;
  target: WorkflowTask;
}>;

export type GraphNodeData = {
  task: WorkflowTask;
  previousTask?: WorkflowTask;
};

export type GraphNode = Node<GraphNodeData>;

export type Graph = {
  edges: Array<Edge>;
  nodes: Array<Node>;
};

function isForkTask(task: WorkflowTask): task is ForkWorkflowTask {
  return task.type === TaskType.Fork;
}

export const ComplexExampleWorkflow = (): Workflow => ({
  tasks: [
    {
      id: crypto.randomUUID(),
      name: "Start",
      type: TaskType.Simple,
    },
    {
      id: crypto.randomUUID(),
      name: "Fork",
      type: TaskType.Fork,
      branches: [
        {
          name: "Branch 1",
          tasks: [
            {
              id: crypto.randomUUID(),
              name: "Branch 1 Task 1",
              type: TaskType.Simple,
            },
            {
              id: crypto.randomUUID(),
              name: "Branch 1 Task 2",
              type: TaskType.Simple,
            },
            {
              id: crypto.randomUUID(),
              name: "Branch 1 Task 3",
              type: TaskType.Fork,
              branches: [
                {
                  name: "Branch 1.1",
                  tasks: [
                    {
                      id: crypto.randomUUID(),
                      name: "Branch 1 Task 1",
                      type: TaskType.Simple,
                    },
                    {
                      id: crypto.randomUUID(),
                      name: "Branch 1 Task 2",
                      type: TaskType.Simple,
                    },
                  ],
                },
                {
                  name: "Branch 1.2",
                  tasks: [
                    {
                      id: crypto.randomUUID(),
                      name: "Branch 1 Task 1",
                      type: TaskType.Simple,
                    },
                    {
                      id: crypto.randomUUID(),
                      name: "Branch 1 Task 2",
                      type: TaskType.Simple,
                    },
                  ],
                },
              ],
            },
            {
              id: crypto.randomUUID(),
              name: "Sub Join",
              type: TaskType.Join,
            },
            // --- //
            {
              id: crypto.randomUUID(),
              name: "Branch 1 Task 3",
              type: TaskType.Fork,
              branches: [
                {
                  name: "Branch 1.1",
                  tasks: [
                    {
                      id: crypto.randomUUID(),
                      name: "Branch 1 Task 1",
                      type: TaskType.Simple,
                    },
                    {
                      id: crypto.randomUUID(),
                      name: "Branch 1 Task 2",
                      type: TaskType.Simple,
                    },
                  ],
                },
                {
                  name: "Branch 1.2",
                  tasks: [
                    {
                      id: crypto.randomUUID(),
                      name: "Branch 1 Task 1",
                      type: TaskType.Simple,
                    },
                    {
                      id: crypto.randomUUID(),
                      name: "Branch 1 Task 2",
                      type: TaskType.Simple,
                    },
                  ],
                },
              ],
            },
            {
              id: crypto.randomUUID(),
              name: "Sub Join",
              type: TaskType.Join,
            },
          ],
        },
        {
          name: "Branch 1",
          tasks: [
            {
              id: crypto.randomUUID(),
              name: "Branch 1 Task 1",
              type: TaskType.Simple,
            },
            {
              id: crypto.randomUUID(),
              name: "Branch 1 Task 2",
              type: TaskType.Simple,
            },
            {
              id: crypto.randomUUID(),
              name: "Branch 1 Task 3",
              type: TaskType.Fork,
              branches: [
                {
                  name: "Branch 1.1",
                  tasks: [
                    {
                      id: crypto.randomUUID(),
                      name: "Branch 1 Task 1",
                      type: TaskType.Simple,
                    },
                    {
                      id: crypto.randomUUID(),
                      name: "Branch 1 Task 2",
                      type: TaskType.Simple,
                    },
                  ],
                },
                {
                  name: "Branch 1.2",
                  tasks: [
                    {
                      id: crypto.randomUUID(),
                      name: "Branch 1 Task 1",
                      type: TaskType.Simple,
                    },
                    {
                      id: crypto.randomUUID(),
                      name: "Branch 1 Task 2",
                      type: TaskType.Simple,
                    },
                  ],
                },
              ],
            },
            {
              id: crypto.randomUUID(),
              name: "Sub Join",
              type: TaskType.Join,
            },
            // --- //
            {
              id: crypto.randomUUID(),
              name: "Branch 1 Task 3",
              type: TaskType.Fork,
              branches: [
                {
                  name: "Branch 1.1",
                  tasks: [
                    {
                      id: crypto.randomUUID(),
                      name: "Branch 1 Task 1",
                      type: TaskType.Simple,
                    },
                    {
                      id: crypto.randomUUID(),
                      name: "Branch 1 Task 2",
                      type: TaskType.Simple,
                    },
                  ],
                },
                {
                  name: "Branch 1.2",
                  tasks: [
                    {
                      id: crypto.randomUUID(),
                      name: "Branch 1 Task 1",
                      type: TaskType.Simple,
                    },
                    {
                      id: crypto.randomUUID(),
                      name: "Branch 1 Task 2",
                      type: TaskType.Simple,
                    },
                  ],
                },
              ],
            },
            {
              id: crypto.randomUUID(),
              name: "Sub Join",
              type: TaskType.Join,
            },
          ],
        },
        {
          name: "Branch 2",
          tasks: [
            {
              id: crypto.randomUUID(),
              name: "Branch 2 Task 1",
              type: TaskType.Simple,
            },
            {
              id: crypto.randomUUID(),
              name: "Branch 2 Task 2",
              type: TaskType.Simple,
            },
            {
              id: crypto.randomUUID(),
              name: "Branch 2 Task 3",
              type: TaskType.Fork,
              branches: [
                {
                  name: "Branch 4.4",
                  tasks: [
                    {
                      id: crypto.randomUUID(),
                      name: "Branch 4 Task 4",
                      type: TaskType.Simple,
                    },
                    {
                      id: crypto.randomUUID(),
                      name: "Branch 4 Task 2",
                      type: TaskType.Simple,
                    },
                  ],
                },
                {
                  name: "Branch 4.2",
                  tasks: [
                    {
                      id: crypto.randomUUID(),
                      name: "Branch 4 Task 4",
                      type: TaskType.Simple,
                    },
                    {
                      id: crypto.randomUUID(),
                      name: "Branch 4 Task 2",
                      type: TaskType.Simple,
                    },
                    {
                      id: crypto.randomUUID(),
                      name: "Branch 4 Task 3",
                      type: TaskType.Fork,
                      branches: [
                        {
                          name: "Branch 4.3.1",
                          tasks: [
                            {
                              id: crypto.randomUUID(),
                              name: "Branch 4 Task 4",
                              type: TaskType.Simple,
                            },
                            {
                              id: crypto.randomUUID(),
                              name: "Branch 4 Task 2",
                              type: TaskType.Simple,
                            },
                          ],
                        },
                        {
                          name: "Branch 4.3.2",
                          tasks: [
                            {
                              id: crypto.randomUUID(),
                              name: "Branch 4 Task 4",
                              type: TaskType.Simple,
                            },
                            {
                              id: crypto.randomUUID(),
                              name: "Branch 4 Task 2",
                              type: TaskType.Simple,
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: crypto.randomUUID(),
                      name: "Sub Join",
                      type: TaskType.Join,
                    },
                  ],
                },
              ],
            },
            {
              id: crypto.randomUUID(),
              name: "Sub Join",
              type: TaskType.Join,
            },
          ],
        },
      ],
    },
    {
      id: crypto.randomUUID(),
      name: "Join",
      type: TaskType.Join,
    },
    {
      id: crypto.randomUUID(),
      name: "End",
      type: TaskType.Simple,
    },
  ],
});

/**
 * Build a graph from a list of tasks
 * @param tasks The tasks to build the graph from
 * @returns The graph
 */
export function buildGraph(tasks: Array<WorkflowTask>): Graph {
  const nodes: Array<GraphNode> = [];
  const edges: Array<GraphEdge> = [];

  // create nodes
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const previousTask = i > 0 ? tasks[i - 1] : undefined;
    nodes.push(...recursiveCreateTaskNodes(task, previousTask));
  }

  // create edges
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const nextTask = tasks[i + 1];
    edges.push(...recursiveCreateTaskEdges(task, nextTask));
  }

  return {
    nodes,
    edges,
  };
}

/**
 * Create edges for a task and its branches
 * @param task The task to create edges for
 * @param nextTask The next task
 * @returns The edges created
 */
function recursiveCreateTaskEdges(
  task: WorkflowTask,
  nextTask: WorkflowTask | undefined,
): Array<GraphEdge> {
  const edges: Array<GraphEdge> = [];

  // If the task has branches, create edges for each branch, and recursively create edges for each branch task
  if (isForkTask(task)) {
    for (const branch of task.branches) {
      const branchTasks = branch.tasks;

      // Link task to the first branch task
      edges.push(createTaskEdge(task, branchTasks[0]));

      // Link branch tasks to each other
      for (let i = 0; i < branchTasks.length - 1; i++) {
        edges.push(
          ...recursiveCreateTaskEdges(branchTasks[i], branchTasks[i + 1]),
        );
      }

      // Link last branch task to the next task
      if (nextTask)
        edges.push(
          createTaskEdge(branchTasks[branchTasks.length - 1], nextTask),
        );
    }
  }

  // If the task has not branches, create an edge to the next task
  else if (nextTask) {
    edges.push(createTaskEdge(task, nextTask));
  }

  return edges;
}

/**
 * Create nodes for a task and its branches
 * @param task The task to create nodes for
 * @param previousTask The previous task
 * @returns The nodes created
 */
function recursiveCreateTaskNodes(
  task: WorkflowTask,
  previousTask: WorkflowTask | undefined,
): Array<GraphNode> {
  // Create initial node
  const nodes: Array<GraphNode> = [createTaskNode(task, previousTask)];

  // Create nodes for branches
  if (isForkTask(task)) {
    for (const branch of task.branches) {
      for (let i = 0; i < branch.tasks.length; i++) {
        const branchTask = branch.tasks[i];
        const previousTask = i > 0 ? branch.tasks[i - 1] : undefined;
        // Create node and sub-nodes if necessary
        nodes.push(...recursiveCreateTaskNodes(branchTask, previousTask));
      }
    }
  }

  return nodes;
}

/**
 * Create a node for a task
 * @param task The task
 * @param previousTask The previous task
 * @returns The node created
 */
function createTaskNode(
  task: WorkflowTask,
  previousTask: WorkflowTask | undefined,
): GraphNode {
  return {
    id: task.id,
    data: {
      task,
      previousTask,
    },
    type: "node",
    position: { x: 0, y: 0 },
    height: 50,
    width: 200,
  };
}

/**
 * Create an edge between two tasks
 * @param source The source task
 * @param target The target task
 * @returns The edge created
 */
function createTaskEdge(source: WorkflowTask, target: WorkflowTask): GraphEdge {
  return {
    id: `${source.id}-${target.id}`,
    source: source.id,
    target: target.id,
    type: "edge",
    data: {
      source,
      target,
    },
  };
}
