import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  constructor(private postService: PostService, private route: ActivatedRoute) {}
  isLoading = false;
  mode = 'create';
  private postId: string;
  form: FormGroup;
  updatePostData: Post;
  previewImage: string;
  post: Post;
  ngOnInit() {
     this.form = new FormGroup({
       title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
       content: new FormControl(null, {validators: [Validators.required]}),
       image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
     });
    console.log(this.form.value.image);
      this.route.paramMap.subscribe(
        (paramMap: ParamMap) => {
          if (paramMap.has('postId')) {
            this.mode = 'edit';
            this.postId = paramMap.get('postId');
            this.postService.getPostData(this.postId).subscribe(
              (postData) => {
                this.isLoading = true;
                this.post = postData.post;
                this.form.setValue({
                  title: this.post.title,
                  image: this.post.image,
                  content: this.post.content
                });
                console.log(this.post.image);
                this.previewImage = this.post.image;
                console.log(this.previewImage);
              }
            );
          } else {
            this.mode = 'create';
            this.isLoading = true;
            this.postId = null;
          }
        }
      );
     // console.log(this.form);
  }

  onSave() {
    this.isLoading = true;
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postService.createPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    } else {
      this.postService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    }
      this.form.reset();
  }

  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log('rajnish');
    console.log(this.form.value.image, '<====>');
    this.form.patchValue({image: file});
    console.log(this.form.value.image, '<====>');
    this.form.get('image').updateValueAndValidity();
    const render = new FileReader();
    render.onload = () => {
      this.previewImage = render.result as string;
    };
    render.readAsDataURL(file);
    console.log(this.form);
  }
}
