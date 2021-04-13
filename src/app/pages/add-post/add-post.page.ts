import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CrudService } from 'src/app/services/crud.service';
import { Post } from 'src/app/shared/post.interface'
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.page.html',
  styleUrls: ['./add-post.page.scss'],
})
export class AddPostPage implements OnInit {

  post: Post ={
    id: this.crudSvc.getId(),
    title: '',
    details: ''
  };

  private path= "post/";

  constructor(private crudSvc: CrudService,
              private router: Router,
              private toastCtrl: ToastController) { }

  ngOnInit() {
  }
  createPost(){
    try {
      if(this.post.title && this.post.details !== ""){
        this.crudSvc.createDoc(this.post,this.path, this.post.id);
        this.showToast("Post added :) ");
        this.router.navigate(['home']);
      }else{
        this.showToast("Complete the fields ");
      }
      
    } catch (error) {
      console.log(error);
      
    }
  }

  showToast(message: string){
    this.toastCtrl
    .create({
      message: message,
      duration: 3000
    })
    .then(toastData => toastData.present());
  }

}
