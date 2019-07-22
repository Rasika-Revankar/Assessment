import { Component, OnInit, OnDestroy } from '@angular/core';
import { DetailService } from '../service/detail.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {

  constructor(private service: DetailService) { }

  userList = [];
  selectedUser: any;
  postList = [];
  comments = [];
  showUserPost = false;
  showComments = false;
  public isCollapsed = {};
  show: number;
  loading = false;
  selectedPost: any;
  subscribeUsers: Subscription;
  subscribeUserPosts: Subscription;
  subscribeUserComment: Subscription;
  commentList = [];

  ngOnInit() {
    this.FetchUserList();
    this.show = 3;

  }

  FetchUserList() {
    this.loading = true;
    this.subscribeUsers = this.service.getusers().subscribe((data) => {
      this.userList = data;
      this.loading = false;
    }, (err) => {
      alert(err);
      this.loading = false;
    });
  }

  UsersPost(user) {

    this.loading = true;
    this.showUserPost = false;
    this.selectedUser = user;
    this.subscribeUserPosts = this.service.usersPostData(user.id).subscribe((data) => {
      this.postList = data;
      this.showUserPost = true;
      this.loading = false;
    }, (err) => {
      alert(err);
      this.loading = false;
    });

  }
  UserComments(userPost) {
    console.log(userPost);
    this.selectedPost = userPost;
    this.subscribeUserComment = this.service.getComments(userPost.id).subscribe((data) => {
      this.commentList = data;
    }, (err) => {
      alert(err);
    });
  }

  increaseShow() {
    this.show = this.postList.length;
  }

  ngOnDestroy() {
    this.subscribeUsers.unsubscribe();
    this.subscribeUserPosts.unsubscribe();
    this.subscribeUserComment.unsubscribe();
  }
}
