import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({ providedIn: 'root' })
export class PostService {
  private getPost = new Subject<{post: Post[], maxPost: number}>();
  postlength = new Subject<number>();
  private posts: Post[] = [];
constructor(private httpClient: HttpClient, private route: Router) {}
  getPosts(postPerpage, currentPage) {

    const queryParam = `?pageSize=${postPerpage}&page=${currentPage}`;
    this.httpClient.get<{message: string, posts: any, length: number}>('http://localhost:3000/api/posts' + queryParam)
    .pipe(map((response) => {
    return { posts: response.posts.map(post => {
              return {
                title: post.title,
                content: post.content,
                image: post.image,
                id: post._id,
                creator: post.creator
              };
            }), maxPost: response.length};
    }))
    .subscribe(
      (data) => {
        console.log(data);
        this.posts = data.posts;
        this.getPost.next({post: [...this.posts], maxPost: data.maxPost});
      }
    );
    // return [...this.posts.slice()];
  }
  getPostUpdateListener() {
     return this.getPost.asObservable();
  }
  createPost(title, content, image) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    this.httpClient.post<{message: string, post: Post}>('http://localhost:3000/api/posts', postData).subscribe(
      (responseData) => {
        this.route.navigate(['/']);
      }
    );
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
   let postData: Post | FormData;
   if (typeof image !== 'object') {
     console.log(typeof image);
    postData = {id: id, title: title, content: content, image: image, creator: null};
  } else {
    postData = new FormData();
    postData.append('id', id);
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
  }
    this.httpClient
      .put('http://localhost:3000/api/posts/' + id, postData)
      .subscribe(respose => {
        console.log(respose);
        this.route.navigate(['/']);
      });
  }

  deletePost(id) {
    const url = `http://localhost:3000/api/posts/${id}`;
    return this.httpClient.delete(url);
  }
  getPostData(id: string) {
   // console.log({...this.posts}, id);

   return this.httpClient.get<{message: string, post: Post}>('http://localhost:3000/api/posts/' + id);

  }

}
