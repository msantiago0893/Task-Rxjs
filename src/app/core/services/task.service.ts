import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, map, take } from 'rxjs/operators'

import { Task } from 'src/app/shared/model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  private contadorID = 1;

  constructor() { }

  public getTasks() {
     // Aplicar retraso de 1 segundos a la operación get
    return this.tasksSubject.asObservable().pipe(delay(1000));
  }

  public save(task: Task) {
    task.id = this.contadorID++;
    this.tasks.push(task);

    this.tasksSubject.next([...this.tasks]);
  }

  public update(id: number, task: Task) {
    const index = this.tasks.findIndex(item => item.id === id);

    if (index !== -1) {
      task.id = id;
      this.tasks[index] = task;

      this.tasksSubject.next(this.tasks);
    }
  }

  public delete(id: number) {
    this.tasks = this.tasks.filter(nota => nota.id !== id);

    this.tasksSubject.next([...this.tasks]);
  }
}
