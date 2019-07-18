import { Component, OnInit } from '@angular/core';
import { DetailService } from '../service/detail.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private service: DetailService) { }
  userList = [];
  selectedUser: any;
  postList = [];
  commentList = []
  showUserPost: boolean = false;
  showComments: boolean = false;
  public isCollapsed = {};
  show: number;
  loading: boolean = false
  ngOnInit() {
    this.loading = true;
    this.service.getusers().subscribe((data) => {
      // console.log(data)
      this.userList = data;
      this.loading = false;
    })
    this.counter = 0;
    this.show = 3

  }
  userPostList = []
  getUserPost(user) {
    this.loading = true;
    this.showUserPost = false;
    this.userPostList = []
    this.selectedUser = user;
    this.service.getPost().subscribe((data) => {
      this.postList = data
      this.showUserPost = true;
      this.loading = false;
      this.postList.forEach(element => {
        if (element.userId == this.selectedUser.id) {
          this.userPostList.push(element)
        }
      });

    });

  }
  content = [];
  counter: number;


  selectedPost: any
  getuserComments(post) {
    this.selectedPost = post;
    this.counter = 0;
    this.service.getComments().subscribe((data) => {
      this.showUserPost = true;
      this.commentList = data
      this.commentList.forEach(element => {
        if (element.postId == this.selectedPost.id) {
          this.counter += 1;
        }
      });

    })


  }
  increaseShow() {
    // this.show += 10;
    this.show = this.userPostList.length;
  }
}
