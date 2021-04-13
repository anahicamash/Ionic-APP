import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CrudService } from 'src/app/services/crud.service';
import { Post } from 'src/app/shared/post.interface';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.page.html',
  styleUrls: ['./edit-post.page.scss'],
})
export class EditPostPage implements OnInit {
  post: Post ={
    id: this.actRoute.snapshot.paramMap.get('id'),
    title: this.actRoute.snapshot.paramMap.get('title'),
    details: this.actRoute.snapshot.paramMap.get('details')
  };

  private path= "post/";

  constructor(private crudSvc: CrudService,
              private router: Router,
              private toastCtrl: ToastController,
              private actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getPost();
  }

  getPost(){
    this.crudSvc.getDoc(this.path,this.post.id);
  }

  updatePost(){
    console.log(this.post+ "________"+this.path+ "________"+this.post.id);
    try {
      this.crudSvc.updateDoc(this.post,this.path,this.post.id);
      this.showToast("Post updated :)");
      this.router.navigate(['home']);
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
