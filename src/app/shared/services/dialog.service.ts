import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../components/dialog-box/dialog-box.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog){}
  openConfirmationDialog(message: string, classname?: string) {
  const dialogRef = this.dialog.open(DialogBoxComponent, {
    data:{
    header: 'confirmation',
    content: message,
    actionType: 'confirmation',
    },
    autoFocus:false
    });
    return dialogRef;
  }
}
