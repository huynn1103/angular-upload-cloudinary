import { Component } from '@angular/core';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private upload: UploadService) {}

  files: File[] = [];
  title = 'drag_and_drop';

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemoved(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  uploadFiles() {
    if (!this.files[0]) {
      alert('No files selected');
    }

    for (let i = 0; i < this.files.length; i++) {
      const file_data = this.files[i];
      const data = new FormData();
      data.append('file', file_data);
      data.append('upload_preset', process.env.UPLOAD_PRESET);
      data.append('cloud_name', process.env.CLOUD_NAME);

      console.log(data);

      this.upload.uploadImage(data).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
