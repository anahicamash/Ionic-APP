import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';
import { Post } from 'src/app/shared/post.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  post : Post ={
    id: this.crudSvc.getId(),
    title: '',
    details:''
  };
  posts: Post[] = [];
  private path = 'post/';
  
  constructor(private authSvc: AuthService, 
              private router:Router,
              private crudSvc: CrudService,
              private toastCtrl: ToastController) { }

  ngOnInit() {
    this.getPosts();
  }

  logout(){
    this.authSvc.logout();
    this.router.navigate(['login']);
  }

  getPosts(){
    try {
      this.crudSvc.getCollection<Post>(this.path).subscribe( res => {
        this.posts = res;
      });
    } catch (error) {
      console.log(error);
      
    }
  }

  deletePost(post: Post){
    try {
      this.crudSvc.deleteDoc(this.path,post.id);
      this.showToast("Post deleted :( ");
    } catch (error) {
      
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
