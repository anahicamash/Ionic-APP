import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private firebase: AngularFirestore) { }

  createDoc(data:any, path:string, id:string){
    const collection = this.firebase.collection(path);
    return collection.doc(id).set(data);
  }

  getDoc(path: string, id: string){
    const collection = this.firebase.collection(path);
    return collection.doc(id).valueChanges();
  }

  deleteDoc(path: string, id: string){
    const collection = this.firebase.collection(path);
    return collection.doc(id).delete();
  }
  updateDoc(data: any, path: string, id: string){
    const collection = this.firebase.collection(path);
    return collection.doc(id).update(data);
  }

  getId(){
    return this.firebase.createId();
  }

  getCollection<tipo>(path: string){
    const collection = this.firebase.collection<tipo>(path);
    return collection.valueChanges();
  }

}
