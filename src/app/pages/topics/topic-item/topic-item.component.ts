import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { ClearSelectedTopic, GetTopicByID, AddPostToTopic, SubscribeToTopic, UnsubscribeFromTopic, DeletePost, DeleteTopic } from 'src/app/ngxs/actions/topics.actions';
import { ActivatedRoute } from '@angular/router';
import { TopicsState } from 'src/app/ngxs/states/topics.state';
import { Observable } from 'rxjs';
import { ITopic } from 'src/app/models/topic.model';
import { UserState } from 'src/app/ngxs/states/user.state';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IPost } from 'src/app/models/post.model';
import { IUser } from 'src/app/models/user.model';
import { AddSubsModalComponent } from 'src/app/components/add-subs-modal/add-subs-modal.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-topic-item',
  templateUrl: './topic-item.component.html',
  styleUrls: ['./topic-item.component.scss']
})
export class TopicItemComponent implements OnInit, OnDestroy {
  postForm: FormGroup
    = new FormGroup({
      message: new FormControl(null, [Validators.required])
    })

  @Select(UserState.getUser)
  user$: Observable<IUser>
  user: IUser

  @Select(TopicsState.getSelectedTopic)
  topic$: Observable<ITopic>
  topic: ITopic

  @Select(TopicsState.getSelectedLoading)
  isLoading$: Observable<boolean>

  constructor(private store: Store, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id']
    this.store.dispatch(new GetTopicByID(id))

    this.user$.subscribe(res => { this.user = res })
    this.topic$.subscribe(res => { this.topic = res })
  }

  ngOnDestroy() {
    this.store.dispatch(new ClearSelectedTopic())
  }

  tryPost() {
    let newPost: Partial<IPost> = {
      Text: this.postForm.value.message,
      creator: this.user
    }
    this.store.dispatch(new AddPostToTopic(this.topic.Id, newPost ))
  }

  isSubbed() {
    if(this.user.subscribedTopics)
    {
      if(this.user.subscribedTopics.indexOf(this.topic.Id) !== -1)
      { return true }
      else
      { return false }
    }
  }
  
  subToTopic() {
    this.store.dispatch(new SubscribeToTopic(this.topic.Id))
  }

  unsubFromTopic() {
    this.store.dispatch(new UnsubscribeFromTopic(this.topic.Id))
  }

  deletePost(id:number) {
    this.store.dispatch(new DeletePost(id))
  }
  
  getRole() {
    if(this.user != null) {
      if(this.topic.creator != null)
      {
        if(this.user.Id == this.topic.creator.Id) {
          return 'owner'
        } 
        else {
          return 'user'
        }
      }
      else
      {
        return 'user'
      }
    }
    else {
      return 'anon'
    }
  }

  openAddSubs() {
    this.dialog.open(AddSubsModalComponent, {
      data: this.topic$
    })
  }

  isUsersPost(p: IPost) {
    if(this.user != null && p.creator != null)
    {
      if(this.user.Id == p.creator.Id)
      {
        return true
      }
      else
      {
        return false
      }
    }
    else
    {
      return false
    }
  }

  deleteTopic() {
    this.store.dispatch(new DeleteTopic(this.topic.Id))
  }

  openFileUpload() {
    // const client = filestack.init(environment.filestack);
    // const options = {
    //   fromSources: ["local_file_system","url","imagesearch"],
    //   onFileSelected: file => {
    //     if (file.size > 1000 * 1000) {
    //       throw new Error('File too big, select something smaller than 1MB');
    //     }
    //   }
    // }
    // client.picker(options).open();
  }
}
