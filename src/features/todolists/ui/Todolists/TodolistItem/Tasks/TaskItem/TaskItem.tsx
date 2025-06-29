import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import { TaskStatus } from "@/common/enums"
import { DomainTask, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types"
import type { DomainTodolist } from "@/features/todolists/model/todolists-slice"
import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import type { ChangeEvent } from "react"
import { getListItemSx } from "./TaskItem.styles"
import { useDeleteTaskMutation, useUpdateTaskMutation } from "@/features/todolists/api/tasksApi.ts"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}

export const TaskItem = ({ task, todolist }: Props) => {
  // const dispatch = useAppDispatch()

  const [deleleTaskQM] = useDeleteTaskMutation() //for RTK query
  const [updateTask] = useUpdateTaskMutation() //for RTK query
  const model: UpdateTaskModel = {
    description: task.description,
    title: task.title,
    priority: task.priority,
    startDate: task.startDate,
    deadline: task.deadline,
    status: task.status,
  } //for RTK query

  const deleteTask = () => {
    // dispatch(deleteTaskTC({ todolistId: todolist.id, taskId: task.id }))
    deleleTaskQM({ todolistId: todolist.id, taskId: task.id })
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked
    // dispatch(
    //   updateTaskTC({
    //     todolistId: todolist.id,
    //     taskId: task.id,
    //     domainModel: { status: newStatusValue ? TaskStatus.Completed : TaskStatus.New },
    //   }),
    // )
    updateTask({
      todolistId: todolist.id,
      taskId: task.id,
      model: { ...model, status: newStatusValue ? TaskStatus.Completed : TaskStatus.New },
    })
  }

  const changeTaskTitle = (title: string) => {
    // dispatch(updateTaskTC({ todolistId: todolist.id, taskId: task.id, domainModel: { title } }))
    updateTask({ todolistId: todolist.id, taskId: task.id, model: { ...model, title } })
  }

  const isTaskCompleted = task.status === TaskStatus.Completed
  const disabled = todolist.entityStatus === "loading"

  return (
    <ListItem sx={getListItemSx(isTaskCompleted)}>
      <div>
        <Checkbox checked={isTaskCompleted} onChange={changeTaskStatus} disabled={disabled} />
        <EditableSpan value={task.title} onChange={changeTaskTitle} disabled={disabled} />
      </div>
      <IconButton onClick={deleteTask} disabled={disabled}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
