import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/core/services/task.service';
import { AlertService } from 'src/app/core/utils/alert.service';
import { fadeAnimation } from 'src/app/shared/animations/animations';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass'],
  animations: [
    fadeAnimation,
  ],
})
export class TasksComponent implements OnInit {

  tasks:any = [];

  constructor(
    private _service: TaskService,
    private route: Router,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this._service.getTasks()
      .subscribe((response => {
        this.tasks = response;
      }));
  }

  update(task: any) {
    this.route.navigateByUrl(`/task/${task.id}`);
  }

  delete(task: any) {
    this._service.delete(task.id);
    this.alert.showNotification({message: "Se ha actualizado con exito"});
  }
}
