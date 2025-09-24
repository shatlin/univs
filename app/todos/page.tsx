'use client'

import { useEffect, useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  Plus,
  Filter,
  Calendar,
  AlertTriangle,
  Clock,
  CheckCircle,
  GripVertical,
  Edit2,
  Trash2,
  User,
  BookOpen,
  Target,
  FileText,
  Home,
  DollarSign,
  Plane,
  X
} from 'lucide-react'

const todoCategories = ['GENERAL', 'DOCUMENT', 'DEADLINE', 'INTERVIEW', 'FINANCIAL', 'VISA', 'ACCOMMODATION']
const priorities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']

interface TodoItem {
  id: string
  title: string
  description?: string
  category: string
  priority: string
  dueDate?: string
  completed: boolean
  applicationId?: string
  application?: any
  columnId: string
}

interface KanbanColumn {
  id: string
  title: string
  items: TodoItem[]
  color: string
  icon: any
}

function TodoCard({ todo, isDragging }: { todo: TodoItem; isDragging?: boolean }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: todo.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return 'bg-red-100 text-red-700 border-red-200'
      case 'HIGH': return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'DOCUMENT': return <FileText className="w-4 h-4" />
      case 'DEADLINE': return <Calendar className="w-4 h-4" />
      case 'INTERVIEW': return <User className="w-4 h-4" />
      case 'FINANCIAL': return <DollarSign className="w-4 h-4" />
      case 'VISA': return <Plane className="w-4 h-4" />
      case 'ACCOMMODATION': return <Home className="w-4 h-4" />
      default: return <Target className="w-4 h-4" />
    }
  }

  const daysUntilDue = todo.dueDate
    ? Math.ceil((new Date(todo.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all border ${
        todo.priority === 'CRITICAL' ? 'border-red-300' : 'border-gray-200 dark:border-gray-700'
      }`}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-2 flex-1">
            <button
              {...attributes}
              {...listeners}
              className="mt-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
            >
              <GripVertical className="w-4 h-4" />
            </button>
            <div className="flex-1">
              <h4 className="font-medium text-sm mb-1 line-clamp-2">{todo.title}</h4>
              {todo.description && (
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                  {todo.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-1">
            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <Edit2 className="w-3 h-3 text-gray-500" />
            </button>
            <button className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded">
              <Trash2 className="w-3 h-3 text-gray-500 hover:text-red-600" />
            </button>
          </div>
        </div>

        {/* Todo metadata */}
        <div className="space-y-2">
          {todo.application && (
            <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
              <BookOpen className="w-3 h-3" />
              <span className="truncate">{todo.application.university?.name}</span>
            </div>
          )}

          <div className="flex items-center gap-2 flex-wrap">
            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(todo.priority)}`}>
              {todo.priority === 'CRITICAL' && <AlertTriangle className="w-3 h-3" />}
              {todo.priority}
            </div>

            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs">
              {getCategoryIcon(todo.category)}
              <span>{todo.category}</span>
            </div>

            {daysUntilDue !== null && (
              <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                daysUntilDue < 0 ? 'bg-gray-100 text-gray-500' :
                daysUntilDue <= 3 ? 'bg-red-100 text-red-700' :
                daysUntilDue <= 7 ? 'bg-orange-100 text-orange-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                <Clock className="w-3 h-3" />
                {daysUntilDue < 0 ? `${Math.abs(daysUntilDue)}d overdue` :
                 daysUntilDue === 0 ? 'Due today' :
                 `${daysUntilDue}d left`}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TodosPage() {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [applications, setApplications] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [universityFilter, setUniversityFilter] = useState('all')
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    applicationId: '',
    dueDate: '',
    priority: 'MEDIUM',
    category: 'GENERAL'
  })

  const [columns, setColumns] = useState<KanbanColumn[]>([
    {
      id: 'backlog',
      title: 'Backlog',
      items: [],
      color: 'bg-gray-100 dark:bg-gray-800',
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 'todo',
      title: 'To Do',
      items: [],
      color: 'bg-blue-50 dark:bg-blue-900/20',
      icon: <Target className="w-5 h-5 text-blue-600" />
    },
    {
      id: 'in_progress',
      title: 'In Progress',
      items: [],
      color: 'bg-yellow-50 dark:bg-yellow-900/20',
      icon: <Clock className="w-5 h-5 text-yellow-600" />
    },
    {
      id: 'review',
      title: 'Review',
      items: [],
      color: 'bg-purple-50 dark:bg-purple-900/20',
      icon: <AlertTriangle className="w-5 h-5 text-purple-600" />
    },
    {
      id: 'completed',
      title: 'Completed',
      items: [],
      color: 'bg-green-50 dark:bg-green-900/20',
      icon: <CheckCircle className="w-5 h-5 text-green-600" />
    }
  ])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  useEffect(() => {
    fetchTodos()
    fetchApplications()
  }, [])

  const fetchTodos = async () => {
    try {
      const res = await fetch('/api/todos')
      const data = await res.json()

      // Map todos to columns based on their status
      const mappedTodos = data.map((todo: any) => ({
        ...todo,
        columnId: todo.completed ? 'completed' :
                  todo.priority === 'CRITICAL' ? 'review' :
                  todo.priority === 'HIGH' ? 'in_progress' :
                  todo.priority === 'MEDIUM' ? 'todo' : 'backlog'
      }))

      setTodos(mappedTodos)
      organizeTodosByColumns(mappedTodos)
    } catch (error) {
      console.error('Failed to fetch todos:', error)
    }
  }

  const fetchApplications = async () => {
    try {
      const res = await fetch('/api/applications')
      const data = await res.json()
      setApplications(data)
    } catch (error) {
      console.error('Failed to fetch applications:', error)
    }
  }

  const organizeTodosByColumns = (todoList: TodoItem[]) => {
    const newColumns = columns.map(col => ({
      ...col,
      items: todoList.filter(todo => todo.columnId === col.id)
    }))
    setColumns(newColumns)
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    // Find the source and destination columns
    const activeColumn = columns.find(col =>
      col.items.some(item => item.id === activeId)
    )
    const overColumn = columns.find(col =>
      col.id === overId || col.items.some(item => item.id === overId)
    )

    if (!activeColumn || !overColumn) return

    if (activeColumn.id !== overColumn.id) {
      // Moving between columns
      const activeItems = activeColumn.items
      const overItems = overColumn.items
      const activeIndex = activeItems.findIndex(item => item.id === activeId)
      const activeItem = activeItems[activeIndex]

      // Update the todo's column
      const updatedTodo = { ...activeItem, columnId: overColumn.id }

      // Update API if moving to completed
      if (overColumn.id === 'completed' && !activeItem.completed) {
        await updateTodoStatus(activeId, true)
      } else if (overColumn.id !== 'completed' && activeItem.completed) {
        await updateTodoStatus(activeId, false)
      }

      // Update local state
      const newActiveItems = activeItems.filter(item => item.id !== activeId)
      const newOverItems = [...overItems, updatedTodo]

      const newColumns = columns.map(col => {
        if (col.id === activeColumn.id) {
          return { ...col, items: newActiveItems }
        }
        if (col.id === overColumn.id) {
          return { ...col, items: newOverItems }
        }
        return col
      })

      setColumns(newColumns)
    } else {
      // Reordering within the same column
      const items = activeColumn.items
      const oldIndex = items.findIndex(item => item.id === activeId)
      const newIndex = items.findIndex(item => item.id === overId)

      if (oldIndex !== newIndex) {
        const newItems = arrayMove(items, oldIndex, newIndex)
        const newColumns = columns.map(col =>
          col.id === activeColumn.id ? { ...col, items: newItems } : col
        )
        setColumns(newColumns)
      }
    }

    setActiveId(null)
  }

  const updateTodoStatus = async (todoId: string, completed: boolean) => {
    try {
      await fetch(`/api/todos/${todoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed })
      })
    } catch (error) {
      console.error('Failed to update todo:', error)
    }
  }

  const handleAddTodo = async () => {
    try {
      const todoData = {
        ...newTodo,
        dueDate: newTodo.dueDate ? new Date(newTodo.dueDate).toISOString() : null,
        applicationId: newTodo.applicationId === 'none' ? null : newTodo.applicationId || null
      }

      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoData)
      })

      if (res.ok) {
        await fetchTodos()
        setIsAddDialogOpen(false)
        setNewTodo({
          title: '',
          description: '',
          applicationId: '',
          dueDate: '',
          priority: 'MEDIUM',
          category: 'GENERAL'
        })
      }
    } catch (error) {
      console.error('Failed to add todo:', error)
    }
  }

  const deleteTodo = async (todoId: string) => {
    try {
      const res = await fetch(`/api/todos/${todoId}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        await fetchTodos()
      }
    } catch (error) {
      console.error('Failed to delete todo:', error)
    }
  }

  // Filter todos based on search and filters
  const getFilteredColumns = () => {
    return columns.map(col => {
      let filteredItems = col.items

      // Search filter
      if (searchTerm) {
        filteredItems = filteredItems.filter(item =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }

      // Category filter
      if (categoryFilter !== 'all') {
        filteredItems = filteredItems.filter(item => item.category === categoryFilter)
      }

      // Priority filter
      if (priorityFilter !== 'all') {
        filteredItems = filteredItems.filter(item => item.priority === priorityFilter)
      }

      // University filter
      if (universityFilter !== 'all') {
        filteredItems = filteredItems.filter(item => item.applicationId === universityFilter)
      }

      return { ...col, items: filteredItems }
    })
  }

  const filteredColumns = getFilteredColumns()
  const activeTodo = todos.find(t => t.id === activeId)

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold">Task Management</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Organize and track your application tasks
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogDescription>Create a new task to track</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={newTodo.title}
                    onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newTodo.description}
                    onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="application">Related Application</Label>
                  <Select
                    value={newTodo.applicationId}
                    onValueChange={(value) => setNewTodo({...newTodo, applicationId: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="None" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {applications.map(app => (
                        <SelectItem key={app.id} value={app.id}>
                          {app.university?.name} - {app.university?.courseName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newTodo.category}
                      onValueChange={(value) => setNewTodo({...newTodo, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {todoCategories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={newTodo.priority}
                      onValueChange={(value) => setNewTodo({...newTodo, priority: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {priorities.map(priority => (
                          <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newTodo.dueDate}
                    onChange={(e) => setNewTodo({...newTodo, dueDate: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddTodo}>Add Task</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {todoCategories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Priorities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              {priorities.map(priority => (
                <SelectItem key={priority} value={priority}>{priority}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={universityFilter} onValueChange={setUniversityFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Universities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Universities</SelectItem>
              {applications.map(app => (
                <SelectItem key={app.id} value={app.id}>
                  {app.university?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {(searchTerm || categoryFilter !== 'all' || priorityFilter !== 'all' || universityFilter !== 'all') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm('')
                setCategoryFilter('all')
                setPriorityFilter('all')
                setUniversityFilter('all')
              }}
            >
              <X className="w-4 h-4 mr-1" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredColumns.map(column => (
            <div key={column.id} className="flex flex-col">
              <div className={`rounded-t-lg px-4 py-3 ${column.color}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {column.icon}
                    <h3 className="font-semibold text-sm">{column.title}</h3>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {column.items.length}
                  </Badge>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-b-lg p-3 min-h-[400px] flex-1">
                <SortableContext
                  items={column.items.map(item => item.id)}
                  strategy={verticalListSortingStrategy}
                  id={column.id}
                >
                  <div className="space-y-3">
                    {column.items.map((todo) => (
                      <TodoCard
                        key={todo.id}
                        todo={todo}
                        isDragging={activeId === todo.id}
                      />
                    ))}
                  </div>
                </SortableContext>

                {column.items.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-32 text-gray-400">
                    <p className="text-sm">No tasks</p>
                    {column.id === 'backlog' && (
                      <p className="text-xs mt-1">Drag tasks here to backlog them</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <DragOverlay>
          {activeTodo && <TodoCard todo={activeTodo} isDragging />}
        </DragOverlay>
      </DndContext>
    </div>
  )
}