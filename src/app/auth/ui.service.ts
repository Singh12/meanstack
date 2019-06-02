import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UiService {
    progressBarr = new Subject<boolean>();
    constructor(private snakbar: MatSnackBar) {}
    showSnackBar(message, action, duration) {
        this.snakbar.open(message, action, {
            duration: duration,
        });
    }
}
