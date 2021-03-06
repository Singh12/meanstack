import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signup/signup.component';

const routes: Routes = [
  {path: '', component: PostListComponent},
  {path: 'create', component: PostCreateComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'edit/:postId', component: PostCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
