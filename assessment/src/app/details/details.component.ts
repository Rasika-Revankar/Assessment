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
  counter: number;
  selectedPost: any;
  subscribeUsers: Subscription;
  subscribeUserPosts: Subscription;
  subscribeUserComment: Subscription;
  userPostList = [];

  commentList = [];

  ngOnInit() {
    this.FetchUserList();
    this.counter = 0;
    this.show = 3;

  }

  FetchUserList() {
    this.loading = true;
    this.subscribeUsers = this.service.getusers().subscribe((data) => {
      this.userList = data;
      this.loading = false;
    }, (err) => {
      alert(err);
    });
  }


  UsersPost(user) {

    this.loading = true;
    this.showUserPost = false;
    this.userPostList = [];
    this.selectedUser = user;
    this.subscribeUserPosts = this.service.usersPostData().subscribe((data) => {
      this.postList = data;
      this.showUserPost = true;
      this.loading = false;
      this.postList.forEach(element => {
        if (element.userId === this.selectedUser.id) {
          this.userPostList.push(element);
        }
      });
    }, (err) => {
      alert(err);
    });

  }
  UserComments(post) {
    this.selectedPost = post;
    this.counter = 0;
    this.subscribeUserComment = this.service.getComments().subscribe((data) => {
      this.comments = data;
      this.commentList = this.comments.filter(comment =>
        comment.postId === this.selectedPost.id
      );
    }, (err) => {
      alert(err);
    });
  }

  increaseShow() {
    this.show = this.userPostList.length;
  }

  OnDestroy() {
    this.subscribeUsers.unsubscribe();
    this.subscribeUserPosts.unsubscribe();
    this.subscribeUserComment.unsubscribe();
  }
}
