import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  title: string;
  category: string;
  completed: boolean;
}

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent {
  categories = ['All', 'Groceries', 'College', 'Payments'];
  selectedCategory = 'All';
  newTaskTitle = '';

  tasks: Task[] = [
    { id: 1, title: 'Get a new helmet', category: 'Uncategorized', completed: false },
    { id: 2, title: 'Purchase Milk & Corn Flakes', category: 'Groceries', completed: false },
    { id: 3, title: 'Pay mortgage', category: 'Payments', completed: false },
    { id: 4, title: 'Complete Assignments', category: 'College', completed: false },
    { id: 5, title: 'Replace laptop’s screen', category: 'Uncategorized', completed: false }
  ];

  get filteredTasks() {
    return this.selectedCategory === 'All' 
      ? this.tasks 
      : this.tasks.filter(t => t.category === this.selectedCategory);
  }

  addTask() {
    if (!this.newTaskTitle.trim()) return;
    this.tasks.push({
      id: Date.now(),
      title: this.newTaskTitle.trim(),
      category: this.selectedCategory === 'All' ? 'Uncategorized' : this.selectedCategory,
      completed: false
    });
    this.newTaskTitle = '';
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }
}