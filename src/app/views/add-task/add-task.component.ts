import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/core/services/task.service';
import { AlertService } from 'src/app/core/utils/alert.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.sass']
})
export class AddTaskComponent implements OnInit {

  idTask?: any;
  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private _service: TaskService,
    private alert: AlertService,
    private routeActivate: ActivatedRoute,
    private route: Router
  ) {
    this.validators();

    this.idTask = routeActivate.snapshot.params['id'];
  }

  ngOnInit(): void {

    if (this.idTask) {

      this._service.getTasks()
        .subscribe((tasks: any) => {
          const task = tasks.find((item:any) => item.id === Number(this.idTask));

          if (task) {
            this.form.patchValue(task);
          }
        });
    }
  }


  save() {

    if (this.idTask) {
      this.update();
    } else {
      this.add();
    }

    this.route.navigateByUrl('/tasks');
  }

  add() {
    this._service.save(this.form.value);
    this.alert.showNotification({message: "Se ha agregado con exito"});
  }

  update() {
    this._service.update(Number(this.idTask), this.form.value);
    this.alert.showNotification({message: "Se ha actualizado con exito"});
  }

  get input(): {[key: string]: AbstractControl} {
    return this.form.controls;
  }

  validators() {
    this.form = this.fb.group({
      title: ['', [
          Validators.required
        ]],
      body: ['', [
        Validators.required
      ]],
    });
  }
}
