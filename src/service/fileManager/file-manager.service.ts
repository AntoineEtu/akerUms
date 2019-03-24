import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
//import { AndroidPermissions } from '@ionic-native/android-permissions';
@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  constructor(private file: File, private platform: Platform, /*private androidPermissions: AndroidPermissions*/) { }
  
  async save() {
    this.platform.ready().then(() => {
      alert("device ready !");
      //this.checkIfPermissionToWriteFile();
      //this.requestDocumentsFolderPermissions();
      return this.file.writeFile(this.file.documentsDirectory, 'hello.json', JSON.stringify({test:'value'}), {replace:true});
    });
  }
  /*
  checkIfPermissionToWriteFile(){
    this.androidPermissions.hasPermission(this.androidPermissions.PERMISSION.MANAGE_DOCUMENTS).then(
      (status) => { console.log(status);alert(status)}
    );
  }

  requestDocumentsFolderPermissions(){
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.MANAGE_DOCUMENTS);
  }*/
  /*
  private error() {
    console.warn('Camera permission is not turned on');
  }

  private success( status ) {
    if( !status.hasPermission ) this.error();
  }*/
}