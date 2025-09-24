'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

const todoCategories = ['GENERAL', 'DOCUMENT', 'DEADLINE', 'INTERVIEW', 'FINANCIAL', 'VISA', 'ACCOMMODATION']
const priorities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']

export default function TodosPage() {
  const [todos, setTodos] = useState<any[]>([])
  const [applications, setApplications] = useState<any[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [completedFilter, setCompletedFilter] = useState('pending')
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    applicationId: '',
    dueDate: '',
    priority: 'MEDIUM',
    category: 'GENERAL'
  })

  useEffect(() => {
    fetchTodos()
    fetchApplications()
  }, [])

  const fetchTodos = async () => {
    try {
      const res = await fetch('/api/todos')
      const data = await res.json()
      setTodos(data)
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

  const handleAddTodo = async () => {
    try {
      const todoData = {
        ...newTodo,
        dueDate: newTodo.dueDate ? new Date(newTodo.dueDate).toISOString() : null,
        applicationId: newTodo.applicationId === 'none' ? null : newTodo.applicationId || null
      }

      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
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

  const toggleTodo = async (todoId: string, completed: boolean) => {
    try {
      const res = await fetch(`/api/todos/${todoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed })
      })

      if (res.ok) {
        await fetchTodos()
      }
    } catch (error) {
      console.error('Failed to update todo:', error)
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

  const getPriorityColor = (priority: string) => {
    const colors: any = {
      'CRITICAL': 'destructive',
      'HIGH': 'destructive',
      'MEDIUM': 'secondary',
      'LOW': 'default'
    }
    return colors[priority] || 'default'
  }

  const getCategoryColor = (category: string) => {
    const colors: any = {
      'GENERAL': 'default',
      'DOCUMENT': 'secondary',
      'DEADLINE': 'destructive',
      'INTERVIEW': 'outline',
      'FINANCIAL': 'secondary',
      'VISA': 'outline',
      'ACCOMMODATION': 'default'
    }
    return colors[category] || 'default'
  }

  const filteredTodos = todos.filter(todo => {
    if (categoryFilter !== 'all' && todo.category !== categoryFilter) return false
    if (completedFilter === 'pending' && todo.completed) return false
    if (completedFilter === 'completed' && !todo.completed) return false
    return true
  })

  const groupedTodos = filteredTodos.reduce((groups: any, todo) => {
    const priority = todo.priority
    if (!groups[priority]) groups[priority] = []
    groups[priority].push(todo)
    return groups
  }, {})

  const priorityOrder = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Todo Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track your application tasks and deadlines</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add Todo</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Todo</DialogTitle>
                <DialogDescription>
                  Create a new task to track
                </DialogDescription>
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
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddTodo}>Add Todo</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {todoCategories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={completedFilter} onValueChange={setCompletedFilter}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Todos</SelectItem>
            <SelectItem value="pending">Pending Only</SelectItem>
            <SelectItem value="completed">Completed Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-6">
        {priorityOrder.map(priority => {
          const todosInPriority = groupedTodos[priority] || []
          if (todosInPriority.length === 0) return null

          return (
            <div key={priority}>
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Badge variant={getPriorityColor(priority)}>
                  {priority} PRIORITY
                </Badge>
                <span className="text-sm text-gray-500">
                  ({todosInPriority.length} task{todosInPriority.length !== 1 ? 's' : ''})
                </span>
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {todosInPriority.map((todo: any) => (
                  <Card key={todo.id} className={todo.completed ? 'opacity-60' : ''}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={todo.completed}
                            onCheckedChange={(checked) => toggleTodo(todo.id, checked as boolean)}
                            className="mt-1"
                          />
                          <div>
                            <CardTitle className={`text-base ${todo.completed ? 'line-through' : ''}`}>
                              {todo.title}
                            </CardTitle>
                            {todo.application && (
                              <CardDescription className="mt-1">
                                {todo.application.university?.name}
                              </CardDescription>
                            )}
                          </div>
                        </div>
                        <Badge variant={getCategoryColor(todo.category)}>
                          {todo.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {todo.description && (
                        <p className="text-sm text-gray-600 mb-3">{todo.description}</p>
                      )}
                      {todo.dueDate && (
                        <p className="text-sm">
                          <strong>Due:</strong> {new Date(todo.dueDate).toLocaleDateString()}
                        </p>
                      )}
                      <div className="flex justify-end mt-3">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => deleteTodo(todo.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {filteredTodos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No todos found. Create your first todo to get started!</p>
        </div>
      )}
    </div>
  )
}