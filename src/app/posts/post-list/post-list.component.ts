import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  userIsAunthinticated = false;
  subscriber: Subscription;
  isLoading = false;
  totalPost = 0;
  currentPage = 1;
  postPerPage = 1;
  pageSizeOptions: number[] = [1, 2, 5, 10];
  constructor(private postSevice: PostService, private authService: AuthService) {}
  ngOnInit() {
    this.postSevice.getPosts(this.postPerPage, this.currentPage);
    // this.userIsAunthinticated = this.authService.getauthTokenData();
    this.authService.getAuthToken().subscribe(
      authData => {
        this.userIsAunthinticated = authData;
        console.log(this.userIsAunthinticated);
      });
    this.subscriber = this.postSevice
      .getPostUpdateListener()
      .subscribe((postsDtata: { post: Post[], maxPost: number }) => {
        this.posts = postsDtata.post;
        this.totalPost = postsDtata.maxPost;
        this.isLoading = true;
      });
  }
  onDelete(id) {
    this.postSevice.deletePost(id).subscribe(
      () => {
        this.postSevice.getPosts(this.postPerPage, this.currentPage);
      }
    );
  }
  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
  onChangePage(pageData: PageEvent) {
    this.isLoading = false;
    this.currentPage = pageData.pageIndex + 1;
    this.postPerPage = pageData.pageSize;
    this.postSevice.getPosts(this.postPerPage, this.currentPage);
      console.log(pageData);
  }
  // posts = [
  //   {title: 'First Post', content: 'This is the first post\'s content'},
  //   {title: 'Second Post', content: 'This is the Second post\'s content'},
  //   {title: 'Third Post', content: 'This is the Third post\'s content'},
  // ];
}


