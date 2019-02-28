import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {
  /*
  const fileTransfer: FileTransferObject = this.transfer.create();
  
  constructor(private transfer: FileTransfer, private file: File) { }

  public download() {
    const url = 'http://www.example.com/file.pdf';
    this.fileTransfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      console.log(error);
    });
  }*/
}

// Upload a file:
//fileTransfer.upload(..).then(..).catch(..);

// Download a file:
//fileTransfer.download(..).then(..).catch(..);

// Abort active transfer:
//fileTransfer.abort();